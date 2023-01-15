const { response } = require(`../middleware/common`);
const {
  insertOrders,
  allOrdersUsersId,
  allOrdersId,
  updateDelivOrdersId,
  updateDoneOrdersId,
} = require(`../models/orders`);
const { v4: uuidv4 } = require('uuid');

const ordersControllers = {
  insert: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const carts_id = req.params.carts_id;
      const { payment } = req.body;

      let data = {
        id: uuidv4(),
        carts_id,
        payment,
        users_id,
      };

      await insertOrders(data);
      response(res, 200, true, data, 'insert orders success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert orders failed');
    }
  },
  getByUsersId: async (req, res, next) => {
    try {
      const users_id = req.payload.id;

      const result = await allOrdersUsersId({
        users_id,
      });

      response(res, 200, true, result.rows, 'get orders success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get orders failed');
    }
  },
  getById: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const id = req.params.id;

      const result = await allOrdersId({
        id,
      });

      response(res, 200, true, result.rows, 'get orders success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get orders failed');
    }
  },
  updateDeliveryById: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const id = req.params.id;

      const result = await updateDelivOrdersId({
        id,
      });

      response(
        res,
        200,
        true,
        result.rows,
        'update orders to delivery success'
      );
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'update orders to delivery failed');
    }
  },
  updateDoneById: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const id = req.params.id;

      const result = await updateDoneOrdersId({
        id,
      });

      response(res, 200, true, result.rows, 'update to done orders success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'update to done orders failed');
    }
  },
};

exports.ordersControllers = ordersControllers;
