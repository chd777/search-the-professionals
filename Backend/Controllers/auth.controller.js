//let user = {}; //In memory user storage (temporary)
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { json } from "express";

export async function register(req, res) {
  try {
    const { username, password } = req.body;

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).send({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });

    await user.save();

    return res.status(201).json({ message: "User registered successfully" });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error", error: e.message });
  }
}


export async function login(req, res){
    try{
        console.log('ping');

        const {username, password } = req.body;
        const user = await User.findOne({ username});
        if (!user) return res.status(401).send("User not found");

        console.log('ping 2');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).send("Invalid credentials");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({message: 'Logged In', user, token})

    } 
    catch (e) {
        console.log(e);

        return res.status(500).json(e);
    }
}