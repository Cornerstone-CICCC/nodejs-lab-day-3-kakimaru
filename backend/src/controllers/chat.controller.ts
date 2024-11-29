import { Request, Response } from "express";
import { Chat } from "../models/chat.model";

// Get all chats
const getAllChats = async (req: Request, res: Response) => {
  try {
    const chats = await Chat.find().sort({ createdAt: -1 }); // Sort by createdAt field
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chats" });
  }
};

// get chats by room
const getChatsByRoom = async (
  req: Request<{}, {}, {}, { room: string }>,
  res: Response
) => {
  try {
    const { room } = req.query;
    if(!room) {
      res.status(404).json({error: `Room not found`})
      return
    }
    const chats = await Chat.find({ room });
    res.status(200).json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: `Error fetching chats by room` });
  }
};

export default {
  getAllChats,
  getChatsByRoom,
};
