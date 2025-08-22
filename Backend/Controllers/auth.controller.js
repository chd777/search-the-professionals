// auth.controller.js
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register a new user
export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Register error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Login user
export async function login(req, res) {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Logout user (server-side)
export async function logout(_req, res) {
  try {
    // On server-side, just inform client to remove token
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}

// Get all users with selected fields
export async function getUserList(req, res) {
  try {
    const users = await User.find(
      {},
      "username email bio skills quickStats contact profilePicture"
    );

    const formattedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      skills: user.skills,
      location: user.contact ? user.contact.location : null,
      quickStats: user.quickStats,
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("GetUserList error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

// Get all users (excluding password)
export async function getAllUsers(req, res) {
  try {
    const users = await User.find({}, { password: 0 });

    const formattedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      skills: user.skills,
      location: user.contact ? user.contact.location : null,
      quickStats: user.quickStats,
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("GetAllUsers error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}

// Search users by username
export async function searchUsers(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const users = await User.find(
      { username: { $regex: query, $options: "i" } },
      { password: 0 }
    );

    const formattedUsers = users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      profilePicture: user.profilePicture,
      skills: user.skills,
      location: user.contact ? user.contact.location : null,
      quickStats: user.quickStats,
    }));

    return res.status(200).json(formattedUsers);
  } catch (error) {
    console.error("SearchUsers error:", error);
    return res.status(500).json({ message: "Server error. Please try again later." });
  }
}
