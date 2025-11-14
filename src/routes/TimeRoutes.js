const express = require('express');
const Times = require('../models/TimeModel');
const router = express.Router();

// GET all times
router.get('/', async (req, res) => {
  try {
    const times = await Times.find();
    res.json(times);
  } catch (err) {
   res.status(500).send(`Server error while fetching top Time',${err.message}`);
  }
});

// GET top 10 highest times
router.get('/top', async (req, res) => {
  try {
    const times = await Times.find().sort({ time: -1 }).limit(10);
    res.json(times);
  } catch (err) {
    res.status(500).send(`Server error while fetching top Time',${err.message}`);
  }
});

// POST create time
router.post('/', async (req, res) => {
  try {
    const { name, time } = req.body;

    // Check if name is unique
    const existing = await Times.findOne({ name });
    if (existing) {
      return res.status(400).send(`Username with name ${name} already exists.`);
    }

    const scoreEntry = new Times({ name, time });
    const saved = await scoreEntry.save();

    res.status(201).send(`Added Time ${saved.time} by ${saved.name}`);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).send(`Validation failed', ${err.message}`);
    }
    res.status(500).send(`Server error while adding Time', ${err.message}`);
  }
});

// DELETE times
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Times.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).send('Time not found');
    }
    res.json( 'Time deleted');
  } catch (err) {
    res.status(500).send(`Server error while deleting Time', ${err.message}`);
  }
});
module.exports = router;