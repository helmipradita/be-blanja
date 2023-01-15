const Pool = require('../config/db');

const insertCarts = (data) => {
  const { id, products_id, items, price, users_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO carts (id, products_id, items, price, users_id, created_at, updated_at) 
      VALUES('${id}', '${products_id}', '${items}', '${price}', '${users_id}', NOW(), NOW())`,
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

const allCartsUsersId = ({ users_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT carts.id, 
              carts.products_id, 
              carts.items, carts.price, carts.price * (carts.items) as total,
              carts.users_id, users.name AS user_name,
              to_char( carts.created_at, 'DD Month YYYY' ) AS created_at,
              to_char( carts.updated_at, 'DD Month YYYY' ) AS updated_at
          FROM carts AS carts
          INNER JOIN users AS users ON carts.users_id = users.id
          WHERE carts.users_id = '${users_id}'`,
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

const findCartsById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM carts 
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

const deleteCarts = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM carts 
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
  insertCarts,
  allCartsUsersId,
  findCartsById,
  deleteCarts,
};
