const httpStatus = require('http-status');
const { Pricing } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a pricing
 * @param {Object} pricingBody
 * @returns {Promise<Pricing>}
 */
const createPricing = async (pricingBody) => {
  const d = await Pricing.deleteMany({})
  return Pricing.create(pricingBody);
};

/**
 * Query for pricings
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPricings = async (filter) => {
  Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key])
  const pricings = Pricing.find().exec()
  return pricings;
};

const queryUserPricings = async (filter, options) => {
  const pricings = await Pricing.paginate(filter, options);
  return pricings;
};

/**
 * Get pricing by id
 * @param {ObjectId} id
 * @returns {Promise<Pricing>}
 */
const getPricingById = async (id) => {
  return Pricing.findById(id);
};

/**
 * Get pricing by email
 * @param {string} email
 * @returns {Promise<Pricing>}
 */
const getPricingByEmail = async (email) => {
  return Pricing.findOne({ email });
};

/**
 * Update pricing by id
 * @param {ObjectId} pricingId
 * @param {Object} updateBody
 * @returns {Promise<Pricing>}
 */
const updatePricingById = async (pricingId, updateBody) => {
  const pricing = await getPricingById(pricingId);
  if (!pricing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pricing not found');
  }
  Object.assign(pricing, updateBody);
  await pricing.save();
  return pricing;
};

/**
 * Delete pricing by id
 * @param {ObjectId} pricingId
 * @returns {Promise<Pricing>}
 */
const deletePricingById = async (pricingId) => {
  const pricing = await getPricingById(pricingId);
  if (!pricing) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Pricing not found');
  }
  await pricing.remove();
  return pricing;
};

module.exports = {
  createPricing,
  queryPricings,
  getPricingById,
  getPricingByEmail,
  updatePricingById,
  deletePricingById,
};