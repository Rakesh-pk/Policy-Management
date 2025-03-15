import { parentPort, workerData } from "worker_threads";
import csv from "csv-parser";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Agent from "../models/Agent.js";
import User from "../models/User.js";
import Policy from "../models/Policy.js";
import Carrier from "../models/PolicyCarrier.js";
import LOB from "../models/LOB.js";

dotenv.config();

// mongoose.connect(process.env.MONGO_URI).then(()=> console.log('mongodb connected')).catch((e)=>{console.log(e)});
let t0 = performance.now()
const readCSV = async (filePath) => {
    return new Promise((resolve, reject) => {
        const records = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => records.push(row))
            .on('end', () => resolve(records))
            .on('error', (error) => reject(error));
    });
};

const processFile = async (filePath) => {

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB2');

    const records = await readCSV(filePath);


    for (const row of records) {
        // let agent_collection_data = {name:row.agent }
        // let LOB_collection_data = {categoryName:row.category_name }
        // let policy_carrier_collection_data = { companyName: row.company_name}
        if (Object.values(row).every(value => value == "")) {
            continue; // Skip this iteration
        }
        let user_collection_data = { firstName : row.firstname,
                                    DOB: row.DOB,
                                    address: row.address,
                                    phone: row.phone,
                                    state: row.state,
                                    zip: row.zip,
                                    email: row.email,
                                    gender: row.gender,
                                    userType: row.userType,}
        // let users_account_collection_data = {accountName:row.account_name}

        // let agent  = await Agent.create(agent_collection_data)
        const agent = await Agent.findOneAndUpdate(
            {name:row.agent },
            {name:row.agent },
            { upsert: true, new: true } 
          );

        // let lob  = await LOB.create(LOB_collection_data)
        const lob = await LOB.findOneAndUpdate(
            {categoryName:row.category_name }, 
            {categoryName:row.category_name }, 
            { upsert: true, new: true }
          );
        // let policyCarrier  = await Carrier.create(policy_carrier_collection_data)
        let policyCarrier  = await Carrier.findOneAndUpdate(
            { companyName: row.company_name}, 
            { companyName: row.company_name}, 
            { upsert: true, new: true } 
        )
        let user  = await User.create(user_collection_data)
        

        let policy_collection_data = { policyNumber: row.policy_number , 
                                        startDate:row.policy_start_date , 
                                        endDate: row.policy_end_date , 
                                        categoryId:lob._id , 
                                        companyId: policyCarrier._id,
                                        userId: user._id,
        }

        let policy = await Policy.create(policy_collection_data)

        // console.log('done')
    };

    console.log('file reading completed')
    let t1 = performance.now()
    console.log(`worker thread took ${t1 - t0} milliseconds.`);
    parentPort.postMessage(records)
};

processFile(workerData.filePath);
