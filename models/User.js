import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName : {type:String},
  DOB: {type:String},
  address: {type:String},
  phone: {type:String},
  state: {type:String},
  zip: {type:String},
  email: {type:String},
  gender: {type:String},
  userType: {type:String},
});

export default mongoose.model("User", UserSchema);
