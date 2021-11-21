const httpStatus = require('http-status');
const { Rating } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a rating
 * @param {Object} ratingBody
 * @returns {Promise<Rating>}
 */
const createRating = async (ratingBody) => {
  return Rating.create(ratingBody);
};

/**
 * Query for ratings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRatings = async (filter) => {
  Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key])
  const ratings = Rating.find(filter).populate(
    [
      // here array is for our memory. 
      // because may need to populate multiple things
      {
          path: 'customer',
          model:'User',
          options: {
              sort:{ },
              skip: 0,
              limit : 1000
          },
          match:{
              // filter result in case of multiple result in populate
              // may not useful in this case
          }
      }
  ]
  ).exec()
  return ratings;
};

const queryUserRatings = async (filter, options) => {
  const ratings = await Rating.paginate(filter, options);
  return ratings;
};

/**
 * Get rating by id
 * @param {ObjectId} id
 * @returns {Promise<Rating>}
 */
const getRatingById = async (id) => {
  return Rating.findById(id);
};

/**
 * Get rating by email
 * @param {string} email
 * @returns {Promise<Rating>}
 */
const getRatingByEmail = async (email) => {
  return Rating.findOne({ email });
};

/**
 * Update rating by id
 * @param {ObjectId} ratingId
 * @param {Object} updateBody
 * @returns {Promise<Rating>}
 */
const updateRatingById = async (ratingId, updateBody) => {
  const rating = await getRatingById(ratingId);
  if (!rating) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rating not found');
  }
  Object.assign(rating, updateBody);
  await rating.save();
  return rating;
};

/**
 * Delete rating by id
 * @param {ObjectId} ratingId
 * @returns {Promise<Rating>}
 */
const deleteRatingById = async (ratingId) => {
  const rating = await getRatingById(ratingId);
  if (!rating) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rating not found');
  }
  await rating.remove();
  return rating;
};

module.exports = {
  createRating,
  queryRatings,
  getRatingById,
  getRatingByEmail,
  updateRatingById,
  deleteRatingById,
};