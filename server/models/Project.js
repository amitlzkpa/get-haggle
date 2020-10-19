require('dotenv').config();
const mongoose = require('mongoose');


const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    index: true,
    default: ""
  },
  description: {
    type: String,
    default: ""
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  },
  public: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});



module.exports = mongoose.model('Project', ProjectSchema);