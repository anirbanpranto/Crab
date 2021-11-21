const express = require('express');
const auth = require('../../middlewares/auth');
const appointmentController = require('../../controllers/appointment.controller');

const router = express.Router();

router
  .route('/')
  .post(appointmentController.createAppointment)
  .get(appointmentController.getAppointments)

router
  .route('/accept')
  .post(appointmentController.acceptAppointment)

router
  .route('/rating')
  .post(appointmentController.rateAppointment)

router
  .route('/:appointmentId')
  .get(appointmentController.getAppointment)
  .patch(appointmentController.updateAppointment)
  .patch(appointmentController.updateAppointment)
  .delete(appointmentController.deleteAppointment);

module.exports = router;