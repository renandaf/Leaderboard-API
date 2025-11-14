const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true},
  time: { type: Number, default: 0, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Times', timeSchema);