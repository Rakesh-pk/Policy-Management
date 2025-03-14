import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  accountName: String
});

const Account = mongoose.model("Account", AccountSchema);

export default Account;
