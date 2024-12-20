const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const dashboardRoutes = require('./routes/dashboardRoutes');
const rewardsRoutes = require('./routes/rewardsRoutes')
const authRoutes = require('./routes/authRoutes');

const app = express();

const corsOptions = {
  origin: 'http://localhost:8545', // Replace with your frontend URL
  methods: 'GET,POST',
};
app.use(cors(corsOptions));


// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());  // To parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api/rewards',rewardsRoutes);
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
