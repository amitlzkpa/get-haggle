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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    storeName: {
      type: String,
      index: true,
    },
    endsAt: {
      type: Date,
      index: true,
    },
    redeemDays: {
      type: Date,
    },
    poolSize: {
      type: Number,
    },
    poolCount: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Deal", DealSchema);
