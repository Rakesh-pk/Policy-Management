import mongoose from "mongoose";

const scheduledMessageSchema = new mongoose.Schema({
  message: { type: String, required: true },
},
{ timestamps: true }
);

export default mongoose.model("ScheduledMessage", scheduledMessageSchema);
