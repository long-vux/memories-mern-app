import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import redisClient from '../config/redisClient.js';
import session from 'express-session';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ message: "Email and password are required." });

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

    // // Create session after successful login
    // req.session.user = {
    //   email: existingUser.email,
    //   name: existingUser.name,
    //   id: existingUser._id,
    // };
    // storeUserData(req.session.user);  // Store user data in Redis

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'your_jwt_secret', { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
}


export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match." });

    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });

    const token = jwt.sign({ email: result.email, id: result._id }, 'test', { expiresIn: "1h" });

    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong. Please try again.' });
  }
}

const storeUserData = (user) => {
  const userId = user.id.toString(); // Ensure the userId is a string
  const userData = {
    email: user.email,
    name: user.name,
    id: user.id.toString()
  };

  // // Store the user data in Redis with an expiration time (e.g., 1 hour)
  // redisClient.setex(`session:${userId}`, 3600, JSON.stringify(userData), (err, reply) => {
  //   if (err) {
  //     console.error('Error saving data to Redis:', err);
  //   } else {
  //     console.log('User data saved to Redis:', reply);
  //   }
  // });
};

export const logout = (req, res) => {
  const userId = req.session.user.id; // Retrieve the userId from the session

  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid'); // Replace with your session cookie name if different
    redisClient.del(`session:${userId}`, (redisErr, reply) => {
      if (redisErr) {
        console.error('Error deleting session from Redis:', redisErr);
        // Optionally handle Redis deletion error
      } else {
        console.log('Session deleted from Redis:', reply);
      }
      return res.status(200).json({ message: 'Logged out successfully' });
    });
  });
};