const { response } = require(`../middleware/common`);
const {
  insertCategories,
  allCategories,
  countAllCategories,
  allCategoriesUsersId,
  countAllCategoriesUsersId,
  findCategoriesById,
  editCategories,
  deleteCategories,
} = require(`../models/categories`);
const { v4: uuidv4 } = require('uuid');

const categoriesControllers = {
  insert: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const { name } = req.body;

      let data = {
        id: uuidv4(),
        name,
        users_id,
      };

      await insertCategories(data);
      response(res, 200, true, data, 'insert categories success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert categories failed');
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

      const result = await allCategories({
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllCategories();

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
        'get categories success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get categories failed');
    }
  },
  getByUsersId: async (req, res, next) => {
    try {
      const users_id = req.payload.id;

      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const sortBy = req.query.sortBy || 'name';
      const sortOrder = req.query.sortOrder || 'DESC';
      const search = req.query.search || '';
      const offset = (page - 1) * limit;

      const result = await allCategoriesUsersId({
        users_id,
        search,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAllCategoriesUsersId(users_id);

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
        'get categories success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get categories failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const id = req.params.id;
      const { name } = req.body;

      const {
        rows: [categories],
      } = await findCategoriesById(id);

      if (!categories) {
        return response(
          res,
          404,
          false,
          null,
          `categories not found, check again`
        );
      }

      let data = {
        id,
        name,
      };

      if (users_id === categories.users_id) {
        await editCategories(data);
        response(res, 200, true, data, 'edit categories success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'edit categories failed, your user is not the owner of this categories id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'edit categories failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const users_id = req.payload.id;

      const {
        rows: [categories],
      } = await findCategoriesById(id);

      if (!categories) {
        return response(
          res,
          404,
          false,
          null,
          `categories not found, check again`
        );
      }

      if (users_id === categories.users_id) {
        await deleteCategories(id);
        response(res, 200, true, categories, 'delete categories success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'delete categories failed, your user is not the owner of this categories id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete categories fail');
    }
  },
};

exports.categoriesControllers = categoriesControllers;
