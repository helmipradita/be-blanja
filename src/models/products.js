const Pool = require('../config/db');

const findProductsAll = () => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM products 
         `,
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

const insertProducts = (data) => {
  const {
    id,
    name,
    price,
    stock,
    categories_id,
    description,
    photo,
    users_id,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO products (id, name, price, stock, categories_id,
        description, photo, status,
        users_id, created_at, updated_at) 
      VALUES('${id}', '${name}', '${price}', '${stock}', '${categories_id}',
        '${description}', '${photo}', 1, '${users_id}', NOW(), NOW())`,
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

const allProductsUsersId = ({
  users_id,
  search,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.name, products.price, products.stock, 
              products.categories_id, categories.name AS categories_name,
              products.description, products.photo, products.status, 
              products.users_id, users.name AS author,
              to_char( products.created_at, 'DD Month YYYY' ) AS created_at,
              to_char( products.updated_at, 'DD Month YYYY' ) AS updated_at
          FROM products AS products
          INNER JOIN users AS users ON products.users_id = users.id
          INNER JOIN categories AS categories ON products.categories_id = categories.id
          WHERE products.users_id = '${users_id}' AND products.name
          ILIKE '%${search}%' ORDER BY products.${sortBy} ${sortOrder} 
          LIMIT ${limit} OFFSET ${offset}`,
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

const countAllProductsUsersId = (users_id) => {
  return Pool.query(
    `SELECT COUNT(*) AS total FROM products 
      WHERE users_id='${users_id}'`
  );
};

const allProductsUsersIdSold = ({ users_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.name, products.price, products.stock, 
                products.categories_id, categories.name AS categories_name,
                products.description, products.photo, products.status, 
                products.users_id, users.name AS author,
                to_char( products.created_at, 'DD Month YYYY' ) AS created_at,
                to_char( products.updated_at, 'DD Month YYYY' ) AS updated_at
            FROM products AS products
            INNER JOIN users AS users ON products.users_id = users.id
            INNER JOIN categories AS categories ON products.categories_id = categories.id
            WHERE products.stock='0' AND products.users_id='${users_id}'`,
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

const allProductsUsersIdArchived = ({ users_id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.name, products.price, products.stock, 
                  products.categories_id, categories.name AS categories_name,
                  products.description, products.photo, products.status, 
                  products.users_id, users.name AS author,
                  to_char( products.created_at, 'DD Month YYYY' ) AS created_at,
                  to_char( products.updated_at, 'DD Month YYYY' ) AS updated_at
              FROM products AS products
              INNER JOIN users AS users ON products.users_id = users.id
              INNER JOIN categories AS categories ON products.categories_id = categories.id
              WHERE products.status='0' AND products.users_id='${users_id}'`,
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

const findProductsById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM products WHERE id = '${id}'
           `,
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

const editProducts = (data) => {
  const { id, name, price, stock, categories_id, description, photo } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE products 
          SET
            name='${name}', price='${price}', stock='${stock}', categories_id='${categories_id}', description='${description}', 
            photo='${photo}', updated_at=NOW()
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

const editProductsArchived = (data) => {
  const { id, status } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE products 
            SET
              status='${status}', updated_at=NOW()
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

const allProductsAll = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT products.id, products.name, products.price, products.stock, 
                products.categories_id, categories.name AS categories_name,
                products.description, products.photo, products.status, 
                products.users_id, users.name AS author,
                to_char( products.created_at, 'DD Month YYYY' ) AS created_at,
                to_char( products.updated_at, 'DD Month YYYY' ) AS updated_at
            FROM products AS products
            INNER JOIN users AS users ON products.users_id = users.id
            INNER JOIN categories AS categories ON products.categories_id = categories.id
            WHERE products.name
            ILIKE '%${search}%' ORDER BY products.${sortBy} ${sortOrder} 
            LIMIT ${limit} OFFSET ${offset}`,
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

const countAllProductsAll = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM products `);
};

const allProductsAllId = ({ id }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM products as products
              WHERE products.id = '${id}'`,
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

const countAllProductsAllId = (id) => {
  return Pool.query(`SELECT COUNT(*) AS total FROM products WHERE id='${id}'`);
};

module.exports = {
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
};
