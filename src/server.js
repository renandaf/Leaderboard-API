require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const timeRoutes = require('./routes/TimeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'API is running...' }));
app.use('/api/time', timeRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch(err => {
    console.error('MongoDB connection failed:', err.message);
  });
