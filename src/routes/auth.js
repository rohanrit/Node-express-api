import bcrypt from 'bcryptjs';
import { connectDB } from '../config/database.js';

class User {
  static async create(userData) {
    const { username, email, password } = userData;
    // const hashedPassword = await bcrypt.hash(password, 12);
    // Hash password with MD5 (WARNING: Insecure for production!)
    const hashedPassword = crypto.createHash('md5').update(password).digest('hex');
    const connection = await connectDB();
    const [result] = await connection.execute(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [username, email, hashedPassword]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const connection = await connectDB();
    const [rows] = await connection.execute('SELECT id, username, email, created_at FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async validatePassword(plainPassword, hashedPassword) {
    // return await bcrypt.compare(plainPassword, hashedPassword);
    // Hash the plain password and compare (WARNING: Insecure for production!)
    const hashedInput = crypto.createHash('md5').update(plainPassword).digest('hex');
    return hashedInput === hashedPassword;
  }
}

export default User;