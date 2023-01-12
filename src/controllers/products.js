const { response } = require(`../middleware/common`);
const {
  findProductsAll,
  insertProducts,
  allProductsUsersId,
  countAllProductsUsersId,
  allProductsUsersIdSold,
  allProductsUsersIdArchived,
  findProductsById,
  editProducts,
  editProductsArchived,
  allProductsAll,
  countAllProductsAll,
  allProductsAllId,
  countAllProductsAllId,
} = require(`../models/products`);
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/photo');

const productsControllers = {
  insert: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const { name, price, stock, categories_id, description } = req.body;

      const {
        rows: [products],
      } = await findProductsAll();

      if (req.payload.role === 'customer') {
        return response(
          res,
          404,
          false,
          null,
          `role customer do not have access here`
        );
      }

      let data = {
        id: uuidv4(),
        name,
        price,
        stock,
        categories_id,
        description,
        users_id,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blanja',
        });

        data.photo = image.url;
      } else {
        data.photo = products.photo;
      }

      await insertProducts(data);
      response(res, 200, true, data, 'insert products success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert products failed');
    }
  },
  getBySeller: async (req, res) => {
    try {
      const users_id = req.payload.id;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'name';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allProductsUsersId({
        users_id,
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllProductsUsersId(users_id);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(
        res,
        200,
        true,
        { result: result.rows, pagination: pagination },
        'get products success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get products failed');
    }
  },
  getSold: async (req, res) => {
    try {
      const users_id = req.payload.id;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const stock = 0;

      const result = await allProductsUsersIdSold({
        users_id,
        limit,
        offset,
        stock,
      });

      const {
        rows: [count],
      } = await countAllProductsUsersId(users_id);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(
        res,
        200,
        true,
        { result: result.rows, pagination: pagination },
        'get products success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get products failed');
    }
  },
  getArchived: async (req, res) => {
    try {
      const users_id = req.payload.id;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const offset = (page - 1) * limit;
      const stock = 0;

      const result = await allProductsUsersIdArchived({
        users_id,
        limit,
        offset,
        stock,
      });

      const {
        rows: [count],
      } = await countAllProductsUsersId(users_id);

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(
        res,
        200,
        true,
        { result: result.rows, pagination: pagination },
        'get products success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get products failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const id = req.params.id;
      const { name, price, stock, categories_id, description } = req.body;

      const {
        rows: [products],
      } = await findProductsById(id);

      if (!products) {
        return response(
          res,
          404,
          false,
          null,
          `products not found, check again`
        );
      }

      let data = {
        id,
        name,
        price,
        stock,
        categories_id,
        description,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'blanja',
        });

        data.photo = image.url;
      } else {
        data.photo = products.photo;
      }

      if (users_id === products.users_id) {
        await editProducts(data);
        response(res, 200, true, data, 'edit products success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'edit products failed, your user is not the owner of this products id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit categories failed');
    }
  },
  putArchived: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const id = req.params.id;

      const status = 0;

      const {
        rows: [products],
      } = await findProductsById(id);

      if (!products) {
        return response(
          res,
          404,
          false,
          null,
          `products not found, check again`
        );
      }

      let data = {
        id,
        status,
      };

      if (users_id === products.users_id) {
        await editProductsArchived(data);
        response(res, 200, true, data, 'edit products success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'edit products failed, your user is not the owner of this products id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit categories failed');
    }
  },
  getAll: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'name';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allProductsAll({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllProductsAll();

      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(
        res,
        200,
        true,
        { result: result.rows, pagination: pagination },
        'get products success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get products failed');
    }
  },
  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const result = await allProductsAllId({
        id,
      });

      response(res, 200, true, result.rows, 'get products success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get products failed');
    }
  },
};

exports.productsControllers = productsControllers;
