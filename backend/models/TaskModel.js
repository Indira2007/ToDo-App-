const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'Medium', 'High'],  
    default: 'Medium'
  },
  deleted: {
    type: Boolean,
    default: false
  }

}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
