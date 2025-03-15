import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
  scheduledDay: { type: String , required: true},
  scheduledTime: { type: String , required: true },
});

export default mongoose.model("Message", MessageSchema);
