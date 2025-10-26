const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');

const reviewRoutes = require('./routes/reviews');
const authRoutes = require('./routes/auth');
const errorHandler = require('./middlewares/error');
const rateLimit = require('./middlewares/rateLimit');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(rateLimit);

// Routes
app.use('/api/reviews', reviewRoutes);
app.use('/api/auth', authRoutes);

// Error Handler
app.use(errorHandler);

// Database Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Start Server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});