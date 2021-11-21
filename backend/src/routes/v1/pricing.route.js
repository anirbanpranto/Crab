const express = require('express');
const auth = require('../../middlewares/auth');
const appointmentController = require('../../controllers/appointment.controller');
const pricingController = require('../../controllers/pricing.controller')

const router = express.Router();

router
  .route('/')
  .post(pricingController.createPricing)
  .get(pricingController.getPricing)

module.exports = router;