import mongoose from "mongoose";

const CarrierSchema = new mongoose.Schema({
  companyName: {type:String},
});

export default mongoose.model("Carrier", CarrierSchema);


