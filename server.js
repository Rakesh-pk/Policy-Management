import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnection.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import policyRoutes from "./routes/policyRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import "./cronJobs/messageCron.js";
import { fork } from "child_process";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.get('/' , (req,res)=>{
    //test route to check worker thread is not blocking Main thread
    res.send('home route is running')
})
app.use("/api", uploadRoutes);
app.use("/api/policies", policyRoutes);
app.use("/api/messages", messageRoutes);

fork("./cpuMonitor.js");

//APIs
// 1.http://localhost:5000/api/upload
// 2.http://localhost:5000/api/policies/user-policy
// 3.http://localhost:5000/api/policies/search-by-username/:username
// 4.http://localhost:5000/api/messages/schedule

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
