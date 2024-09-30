const mongoose = require('mongoose');

const VolunteerSchema = new mongoose.Schema({
  name: String,
  email: String,
  skills: [String],
  location: String,
});

module.exports = mongoose.model('Volunteer', VolunteerSchema);
