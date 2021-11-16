require("dotenv").config();
const mongoose = require("mongoose");

const PoolMemberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      default: "",
    },
    deal: {
      type: mongoose.Schema.ObjectId,
      ref: "Deal",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PoolMember", PoolMemberSchema);
