'use strict';

/**
  * Paginates data array.
  *
  * @param {Array} data - The data array to paginate.
  * @param {number} [page=1] - The current page number (defaults to 1).
  * @param {number} [quantity=10] - The number of items per page (defaults to 10).
  * @returns {Object} - An object containing the paginated items and metadata.
  */
function pagination(data, page, quantity) {
  page = Number.isInteger(page) && page > 0 ? page : 1;
  quantity = Number.isInteger(quantity) && quantity > 0 ? quantity : 5;

  const offset = quantity * (page - 1);
  const totalPages = Math.ceil(data.length / quantity);

  const items = data.slice(offset, offset + quantity);

  return {
    items,
    meta: {
      totalItems: data.length,
      itemsPerPage: quantity,
      totalPages,
      currentPage: page
    }
  };
}

module.exports = pagination;