import 'dotenv/config';  // Updated for ES modules
import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import { connectDB } from './config/database.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: ['https://yourfrontend.com', 'http://localhost:3001'],  // Array of allowed origins
  methods: ['GET', 'POST'],  // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Allowed headers
})); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.static('public'));  // Serve static files from public/ folder

// Rate limiting (basic: 100 requests per 15 minutes per IP)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// Routes
app.use('/auth', authRoutes);
app.use('/api', protectedRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});