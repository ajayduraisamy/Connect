const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: String,
  description: String,
  skillsRequired: [String],
  location: String,
});

module.exports = mongoose.model('Project', ProjectSchema);
