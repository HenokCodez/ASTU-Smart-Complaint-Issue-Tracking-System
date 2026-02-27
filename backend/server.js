const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
const hpp = require('hpp');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const complaintRoutes = require('./routes/complaintRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');

connectDB();

const app = express();

// Security Middlewares
app.use(helmet());
app.use(hpp());
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? [process.env.FRONTEND_URL, 'http://localhost:5173'] // Add local vite for easy testing
        : '*',
    credentials: true
}));
app.use(express.json());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

app.use('/api/auth', authRoutes);
app.use('/api/complaints', complaintRoutes);
app.use('/api/users', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
