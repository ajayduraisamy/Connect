const express = require('express');
const router = express.Router();
const Volunteer = require('../models/Volunteer');

// Create a new volunteer
router.post('/', async (req, res) => {
  try {
    const volunteer = new Volunteer(req.body);
    await volunteer.save();
    res.status(201).json(volunteer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all volunteers
router.get('/', async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.status(200).json(volunteers);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
