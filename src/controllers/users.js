const { response } = require(`../middleware/common`);
const {
  register,
  findEmail,
  findIdUsers,
  verif,
  updateUsers,
} = require(`../models/users`);
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { generateToken, refreshToken } = require(`../helpers/auth`);
const refreshTokens = [];
const jwt = require('jsonwebtoken');
const email = require(`../middleware/email`);
const cloudinary = require('../config/photo');

const Port = process.env.PORT;
const Host = process.env.HOST;

const usersControllers = {
  register: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (users) {
      return response(res, 404, false, 'email already use register fail');
    }

    let digits = '0123456789';
    let otp = '';
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }

    let salt = bcrypt.genSaltSync(10);
    let password = bcrypt.hashSync(req.body.password);
    let data = {
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password,
      role: req.params.role,
      otp,
    };
    try {
      const result = await register(data);
      if (result) {
        let verifUrl = `http://${Host}:${Port}/users/${req.body.email}/${otp}`;
        let sendEmail = email(data.email, otp, verifUrl, data.name);
        if (sendEmail == 'email not sent!') {
          return response(res, 404, false, null, 'register fail');
        }
        response(
          res,
          200,
          true,
          { email: data.email },
          'register success please check your email'
        );
      }
    } catch (err) {
      console.log(err);
      response(res, 404, false, err, ' register fail');
    }
  },
  verif: async (req, res) => {
    const { email, otp } = req.body;
    const {
      rows: [user],
    } = await findEmail(email);
    if (!user) {
      return response(res, 404, false, null, 'email not found');
    }

    if (user.otp == otp) {
      await verif(email);
      return response(
        res,
        200,
        true,
        req.body.email,
        'verification account success'
      );
    }
    return response(res, 404, false, null, 'wrong otp please check your email');
  },
  login: async (req, res, next) => {
    let {
      rows: [users],
    } = await findEmail(req.body.email);

    if (!users) {
      return response(res, 404, false, null, 'email not found');
    }

    if (users.verif == 0) {
      return response(res, 404, false, null, 'account not verified');
    }

    const password = req.body.password;
    const validation = bcrypt.compareSync(password, users.password);
    if (!validation) {
      return response(res, 404, false, null, 'wrong password');
    }

    delete users.password;
    delete users.verif;
    delete users.otp;
    let payload = {
      id: users.id,
      email: users.email,
      role: users.role,
    };
    let accessToken = generateToken(payload);
    let refToken = refreshToken(payload);

    users.token = accessToken;
    users.refreshToken = refToken;
    refreshTokens.push(refreshToken);

    response(res, 200, true, users, 'login success');
  },
  profile: async (req, res, next) => {
    try {
      const id = req.payload.id;
      const {
        rows: [users],
      } = await findIdUsers(id);

      delete users.password;
      delete users.verif;
      delete users.otp;
      response(res, 200, true, users, 'get data users success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'get data users fail');
    }
  },
  update: async (req, res, next) => {
    try {
      const { name, email, phone, address } = req.body;
      const { id } = req.payload;

      const {
        rows: [users],
      } = await findIdUsers(id);

      const dataUsers = {
        id,
        name,
        email,
        phone,
        address,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blanja',
        });

        dataUsers.photo = image.url;
      } else {
        dataUsers.photo = users.photo;
      }

      await updateUsers(dataUsers);
      response(res, 200, true, dataUsers, 'update data users success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'update data users failed');
    }
  },
};

exports.usersControllers = usersControllers;
