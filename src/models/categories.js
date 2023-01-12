const Pool = require('../config/db');

const insertCategories = (data) => {
  const { id, name, users_id } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO categories (id, name, users_id, status, created_at, updated_at) 
      VALUES('${id}', '${name}', '${users_id}', 1, NOW(), NOW())`,
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

const allCategories = ({ search, sortBy, sortOrder, limit, offset }) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT categories.id, categories.name, categories.status, 
            categories.users_id, users.name AS author,
            to_char( categories.created_at, 'DD Month YYYY' ) AS created_at,
            to_char( categories.updated_at, 'DD Month YYYY' ) AS updated_at
        FROM categories AS categories
        INNER JOIN users AS users ON categories.users_id = users.id
        WHERE categories.name
        ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} 
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

const countAllCategories = () => {
  return Pool.query(`SELECT COUNT(*) AS total FROM categories`);
};

const allCategoriesUsersId = ({
  users_id,
  search,
  sortBy,
  sortOrder,
  limit,
  offset,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT categories.id, categories.name, categories.status, 
              categories.users_id, users.name AS author,
              to_char( categories.created_at, 'DD Month YYYY' ) AS created_at,
              to_char( categories.updated_at, 'DD Month YYYY' ) AS updated_at
          FROM categories AS categories
          INNER JOIN users AS users ON categories.users_id = users.id
          WHERE categories.users_id = '${users_id}' AND categories.name
          ILIKE '%${search}%' ORDER BY ${sortBy} ${sortOrder} 
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

const countAllCategoriesUsersId = (users_id) => {
  return Pool.query(
    `SELECT COUNT(*) AS total FROM categories 
    WHERE users_id='${users_id}'`
  );
};

const findCategoriesById = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM categories 
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

const editCategories = (data) => {
  const { id, name } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE categories 
        SET
          name='${name}', updated_at=NOW()
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

const deleteCategories = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `DELETE FROM categories 
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
  insertCategories,
  allCategories,
  countAllCategories,
  allCategoriesUsersId,
  countAllCategoriesUsersId,
  findCategoriesById,
  editCategories,
  deleteCategories,
};
