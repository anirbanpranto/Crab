const express = require('express');
const auth = require('../../middlewares/auth');
const appointmentController = require('../../controllers/appointment.controller');
const paymentController = require('../../controllers/payment.controller')

const router = express.Router();

router
  .route('/session')
  .get(paymentController.createSession)

module.exports = router;