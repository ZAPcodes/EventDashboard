import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.models.js';
import { JWT_SECRET } from '../utils/constants.js';

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Create a token
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    // Set the token in a secure HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });

    return res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const sign = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    // Validate input
    if (!username || !password || !role) {
      return res.status(400).json({ message: 'Please provide username, password, and role' });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'Username already exists' });
    }

    // Create and save the new user
    const user = new User({ username, password, role });
    await user.save();

    return res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in sign:', err);

    // Handle specific errors (e.g., validation or database errors)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Invalid input', details: err.errors });
    }

    res.status(500).json({ message: 'Internal server error' });
  }
};


export { login, sign };
