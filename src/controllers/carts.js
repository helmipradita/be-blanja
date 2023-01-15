const { response } = require(`../middleware/common`);
const {
  insertCarts,
  allCartsUsersId,
  findCartsById,
  deleteCarts,
} = require(`../models/carts`);
const { v4: uuidv4 } = require('uuid');

const cartsControllers = {
  insert: async (req, res, next) => {
    try {
      const users_id = req.payload.id;
      const products_id = req.params.products_id;
      const { items, price } = req.body;

      let data = {
        id: uuidv4(),
        products_id,
        items,
        price,
        users_id,
      };

      await insertCarts(data);
      response(res, 200, true, data, 'insert carts success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'insert carts failed');
    }
  },
  getByUsersId: async (req, res, next) => {
    try {
      const users_id = req.payload.id;

      const result = await allCartsUsersId({
        users_id,
      });

      response(res, 200, true, result.rows, 'get carts success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'get carts failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      const id = req.params.id;
      const users_id = req.payload.id;

      const {
        rows: [carts],
      } = await findCartsById(id);

      if (!carts) {
        return response(res, 404, false, null, `carts not found, check again`);
      }

      if (users_id === carts.users_id) {
        await deleteCarts(id);
        response(res, 200, true, carts, 'delete carts success');
      } else {
        response(
          res,
          404,
          false,
          [],
          'delete carts failed, your user is not the owner of this carts id'
        );
      }
    } catch (error) {
      console.log(error);
      response(res, 404, false, error, 'delete carts fail');
    }
  },
};

exports.cartsControllers = cartsControllers;
