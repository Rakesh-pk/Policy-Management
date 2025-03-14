import mongoose from "mongoose";

const LOBSchema = new mongoose.Schema({
  categoryName: {type:String},
});

export default mongoose.model("LOB", LOBSchema);


