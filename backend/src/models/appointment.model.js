const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const appointmentSchema = mongoose.Schema(
  {
    serviceType: {
      type: String,
      required: true,
      trim: true,
      enum: ["Normal", "Deep Clean", "Interior Vacuum"]
    },
    cartype: {
      type: String,
      required: true,
      trim: true,
      enum: ["Sedan", "SUV", "Truck", "Hatchback"]
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["Waiting", "Accepted", "Archived"]
    },
    address: {
      type: String,
      required: true,
      trim: true
    },
    schedule: {
      type: Date,
      required: true,
      trim: true,
    },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    washer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: mongoose.Schema.Types.ObjectId, ref: 'Rating' },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment' }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
appointmentSchema.plugin(toJSON);
appointmentSchema.plugin(paginate);

/**
 * @typedef Appointment
 */
const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
