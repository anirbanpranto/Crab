const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const pricingSchema = mongoose.Schema(
  {
    rate: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);
// add plugin that converts mongoose to json
pricingSchema.plugin(toJSON);
pricingSchema.plugin(paginate);

/**
 * @typedef Pricing
 */
const Pricing = mongoose.model('Pricing', pricingSchema);

module.exports = Pricing;
