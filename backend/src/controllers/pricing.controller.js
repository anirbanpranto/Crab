const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { Pricing } = require('../models');
const {pricingService} = require('../services')

const createPricing = catchAsync(async (req, res) => {
  const pricing = await pricingService.createPricing(req.body)
  res.status(httpStatus.CREATED).send(pricing);
});

const getPricing = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const result = await pricingService.queryPricings(filter);
  res.send(result);
});

module.exports = {
  createPricing,
  getPricing
};
