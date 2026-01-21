require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

// Connect to Database
connectDB();

const app = express();

// Route Files
const auth = require('./routes/authRoutes');
const applications = require('./routes/applicationRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Mount routers
app.use('/api/auth', auth);
app.use('/api/applications', applications);

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('JobTrack API is running...');
});

const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // Listen on all network interfaces

app.listen(PORT, HOST, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on ${HOST}:${PORT}`);
    console.log(`Access from network devices at http://<your-ip>:${PORT}`);
});
