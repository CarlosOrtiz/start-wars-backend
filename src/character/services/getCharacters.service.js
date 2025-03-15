const pool = require('../../../@common/config/db');
const pagination = require('../../../@common/utils/pagination.util');

const getCharacters = async (page, quantity, name, order) => {
  page = +page || 1;
  quantity = +quantity || 10;
  order = order && order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  let params = [];
  let query = `SELECT * FROM character`

  if (name) {
    query += ` WHERE name ILIKE $1`;
    params.push(`%${name}%`);
  }

  query += ` ORDER BY name ${order};`;

  const result = await pool.query(query, params);
  return pagination(result.rows, page, quantity);
};

module.exports = { getCharacters }