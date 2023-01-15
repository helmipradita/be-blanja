const Pool = require('../config/db');

const insertOrders = (data) => {
  const { id, carts_id, payment, users_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO orders (id, carts_id, payment, status, users_id, created_at, updated_at) 
      VALUES('${id}', '${carts_id}', '${payment}', 1, '${users_id}', NOW(), NOW())`,
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

const allOrdersUsersId = ({ users_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT orders.id, 
              orders.carts_id, 
              orders.payment, orders.status,
              orders.users_id, users.name AS user_name,
              to_char( orders.created_at, 'DD Month YYYY' ) AS created_at,
              to_char( orders.updated_at, 'DD Month YYYY' ) AS updated_at
          FROM orders AS orders
          INNER JOIN users AS users ON orders.users_id = users.id
          WHERE orders.users_id = '${users_id}'`,
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

const allOrdersId = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT orders.id, 
            orders.carts_id, 
            orders.payment, orders.status,
            orders.users_id, users.name AS user_name,
            to_char( orders.created_at, 'DD Month YYYY' ) AS created_at,
            to_char( orders.updated_at, 'DD Month YYYY' ) AS updated_at
        FROM orders AS orders
        INNER JOIN users AS users ON orders.users_id = users.id
        WHERE orders.id = '${id}'`,
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

const updateDelivOrdersId = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE orders 
      SET
        status=2, updated_at=NOW()
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

const updateDoneOrdersId = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE orders 
        SET
          status='3', updated_at=NOW()
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
  insertOrders,
  allOrdersUsersId,
  allOrdersId,
  updateDelivOrdersId,
  updateDoneOrdersId,
};
