const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { appointmentService } = require('../services');
const { ratingService } = require('../services')

const createAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.createAppointment(req.body);
  res.status(httpStatus.CREATED).send(appointment);
});

const getAppointments = catchAsync(async (req, res) => {
  const filter = {
    customer: req.query.customer,
    status: req.query.status,
    washer: req.query.washer
  }
  const result = await appointmentService.queryAppointments(filter);
  res.send(result);
});

const acceptAppointment = catchAsync(async (req, res) => {
  const filter = {
    washer: req.query.washer,
    status: "Accepted"
  }
  const _id = req.query.id;
  const result = await appointmentService.updateAppointmentById(_id, filter);
  res.send(result);
});

const rateAppointment = catchAsync(async (req, res) => {
  const rating = await ratingService.createRating({
    rate : parseInt(req.query.rate),
    appointment: req.query.id
  })
  const filter = {
    rating : rating._id
  }
  const _id = req.query.id;
  const result = await appointmentService.updateAppointmentById(_id, filter);
  res.send(result);
});

const getAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.getAppointmentById(req.params.appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  res.send(appointment);
});

const updateAppointment = catchAsync(async (req, res) => {
  const appointment = await appointmentService.updateAppointmentById(req.params.appointmentId, req.body);
  res.send(appointment);
});

const deleteAppointment = catchAsync(async (req, res) => {
  await appointmentService.deleteAppointmentById(req.params.appointmentId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  acceptAppointment,
  rateAppointment
};
