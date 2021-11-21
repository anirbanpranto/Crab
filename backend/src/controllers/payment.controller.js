const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { paymentService } = require('../services');
const { ratingService } = require('../services')
const {appointmentService} = require('../services');
const { Pricing } = require('../models');

const stripe = require('stripe')('sk_test_51Jy1u2G8YdbT9VoswywOMI8BsvC3xuDUYtlRrTKny1sRyBRVO84tNAsw7r9XNcOpSmhs3qWfIugltTLOvWIUD2hf00JHBe5P3M');

const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.body);
  res.status(httpStatus.CREATED).send(payment);
});

const calculateOrderAmount = async (id) => {
  const payment = await paymentService.getPaymentById(id);
  return payment.amount;
};

const createSession = catchAsync(async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(req.query.id),
    currency: "myr",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.status(httpStatus.CREATED).send({client_secret : paymentIntent.client_secret});
});

const getPayments = catchAsync(async (req, res) => {
  const filter = {
    customer: req.query.customer,
    status: req.query.status,
    washer: req.query.washer
  }
  const result = await paymentService.queryPayments(filter);
  res.send(result);
});

const acceptPayment = catchAsync(async (req, res) => {
  const filter = {
    washer: req.query.washer,
    status: "Accepted"
  }
  const _id = req.query.id;
  const result = await paymentService.updatePaymentById(_id, filter);
  res.send(result);
});

const ratePayment = catchAsync(async (req, res) => {
  const rating = await ratingService.createRating({
    rate : parseInt(req.query.rate),
    payment: req.query.id
  })
  const filter = {
    rating : rating._id
  }
  const _id = req.query.id;
  const result = await paymentService.updatePaymentById(_id, filter);
  res.send(result);
});

const getPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.getPaymentById(req.params.paymentId);
  if (!payment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Payment not found');
  }
  res.send(payment);
});

const updatePayment = catchAsync(async (req, res) => {
  const payment = await paymentService.updatePaymentById(req.params.paymentId, req.body);
  res.send(payment);
});

const deletePayment = catchAsync(async (req, res) => {
  await paymentService.deletePaymentById(req.params.paymentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createPayment,
  getPayments,
  getPayment,
  updatePayment,
  deletePayment,
  acceptPayment,
  ratePayment,
  createSession
};
