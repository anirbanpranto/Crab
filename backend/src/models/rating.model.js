const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const ratingSchema = mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
      trim: true,
    },
    appointment: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' }
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
ratingSchema.plugin(toJSON);
ratingSchema.plugin(paginate);

/**
 * @typedef Rating
 */
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
