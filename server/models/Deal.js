require("dotenv").config();
const mongoose = require("mongoose");

const DealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      index: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    storeDomain: {
      type: String,
      index: true,
    },
    endsAt: {
      type: Date,
      index: true,
    },
    redeemDays: {
      type: Number,
    },
    poolSize: {
      type: Number,
    },
    percentageDiscount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", DealSchema);
