import express from "express";
import {
  register,
  login,
  logout,
  getUserList,
  searchUsers,
} from '../Controllers/auth.controller.js'; // <-- make sure this path is correct

const router = express.Router();

// Auth routes
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// User routes
router.get("/users", getUserList);       // get all users
router.get("/search", searchUsers);      // search users

export default router;
