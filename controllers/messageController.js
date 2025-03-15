import Message from "../models/Message.js";

// API to schedule a message
export const scheduleMessage = async (req, res) => {
  try {
    const { message, scheduledDay, scheduledTime } = req.body;

    if (!message || !scheduledDay || !scheduledTime) {
      return res.status(400).json({ error: "Message, day, and time are required" });
    }

    const newMessage = await Message.create({ message, scheduledDay,scheduledTime });

    res.status(201).json({ message: "Message scheduled successfully", data: newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
