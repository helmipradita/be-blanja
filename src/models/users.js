const Pool = require('../config/db');

const register = (data) => {
  const { id, name, email, phone, password, role, otp } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO users (id, name, email, phone, password, role, otp, verif) 
      VALUES('${id}', '${name}', '${email}', '${phone}', '${password}', '${role}', '${otp}', 1)`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where email='${email}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const findIdUsers = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM users where id='${id}'`, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    })
  );
};

const verif = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users SET verif=1 WHERE email='${email}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateUsers = (data) => {
  const { id, name, email, phone, address, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE users 
      SET id='${id}', name='${name}', email='${email}', 
        phone ='${phone}', address='${address}', photo='${photo}'  
      WHERE id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

module.exports = {
  register,
  findEmail,
  findIdUsers,
  verif,
  updateUsers,
};
