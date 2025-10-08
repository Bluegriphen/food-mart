import express from "express";
import { Message } from "../controllers/chatbot.message.js";

const router = express.Router();

// POST route for sending a message to the chatbot
router.post("/Message", Message);

export default router;
