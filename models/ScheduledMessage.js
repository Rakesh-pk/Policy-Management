import mongoose from "mongoose";

const scheduledMessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
});

export default mongoose.model("ScheduledMessage", scheduledMessageSchema);
