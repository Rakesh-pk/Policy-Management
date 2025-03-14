import mongoose from "mongoose";

const PolicySchema = new mongoose.Schema({
  policyNumber: {type:String},
  startDate: {type:String},
  endDate: {type:String},
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "LOB" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Policy", PolicySchema);
