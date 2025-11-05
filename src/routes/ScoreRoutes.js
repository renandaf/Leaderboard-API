const express = require('express');
const Scores = require('../models/ScoreModel');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  const scores = await Scores.find();
  res.json(scores);
});

// GET top 10 highest-priced products
router.get('/top', async (req, res) => {
  const scores = await Scores.find().sort({ score: -1 }).limit(10);
  res.json(scores);
});

// POST create product
router.post('/', async (req, res) => {
  const scores = new Scores(req.body);
  const saved = await scores.save();
  res.status(201).json(saved);
});


// DELETE product
router.delete('/:id', async (req, res) => {
  const deleted = await Scores.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Score not found' });
  res.json({ message: 'Score deleted' });
});

module.exports = router;