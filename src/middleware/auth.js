import jwt from 'jsonwebtoken';
import { verifyToken } from '../utils/jwt.js';

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Extract token from header
  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = verifyToken(token);  // Verify token
    req.user = decoded;  // Attach decoded payload (e.g., { id: 123 }) to req
    next();  // Proceed to route handler
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;