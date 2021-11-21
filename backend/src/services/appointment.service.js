const httpStatus = require('http-status');
const { Appointment } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a appointment
 * @param {Object} appointmentBody
 * @returns {Promise<Appointment>}
 */
const createAppointment = async (appointmentBody) => {
  return Appointment.create(appointmentBody);
};

/**
 * Query for appointments
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryAppointments = async (filter) => {
  Object.keys(filter).forEach(key => filter[key] === undefined && delete filter[key])
  const appointments = Appointment.find(filter).populate(
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
  ).populate(
    [
      // here array is for our memory. 
      // because may need to populate multiple things
      {
          path: 'rating',
          model:'Rating',
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
  )
  .populate(
    [
      // here array is for our memory. 
      // because may need to populate multiple things
      {
          path: 'washer',
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
  )
  .exec()
  return appointments;
};

const queryUserAppointments = async (filter, options) => {
  const appointments = await Appointment.paginate(filter, options);
  return appointments;
};

/**
 * Get appointment by id
 * @param {ObjectId} id
 * @returns {Promise<Appointment>}
 */
const getAppointmentById = async (id) => {
  return Appointment.findById(id);
};

/**
 * Get appointment by email
 * @param {string} email
 * @returns {Promise<Appointment>}
 */
const getAppointmentByEmail = async (email) => {
  return Appointment.findOne({ email });
};

/**
 * Update appointment by id
 * @param {ObjectId} appointmentId
 * @param {Object} updateBody
 * @returns {Promise<Appointment>}
 */
const updateAppointmentById = async (appointmentId, updateBody) => {
  const appointment = await getAppointmentById(appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  Object.assign(appointment, updateBody);
  await appointment.save();
  return appointment;
};

/**
 * Delete appointment by id
 * @param {ObjectId} appointmentId
 * @returns {Promise<Appointment>}
 */
const deleteAppointmentById = async (appointmentId) => {
  const appointment = await getAppointmentById(appointmentId);
  if (!appointment) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Appointment not found');
  }
  await appointment.remove();
  return appointment;
};

module.exports = {
  createAppointment,
  queryAppointments,
  getAppointmentById,
  getAppointmentByEmail,
  updateAppointmentById,
  deleteAppointmentById,
};
