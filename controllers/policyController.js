import Policy from '../models/Policy.js'
import User from "../models/User.js";
import lob from "../models/LOB.js"
import PolicyCarrier from '../models/PolicyCarrier.js'; 

//2) Search API to find policy info with the help of the username.
const searchPolicyByUser = async (req, res) => {
    const { username } = req.params;
    try {
    
      const user = await User.findOne({ firstName: username });
      if (!user) return res.status(404).json({ message: "User not found - Please enter correct username" });
  
    //const policies = await Policy.find({ userId: user._id }).populate("companyId");
    //   const policies = await Policy.find({ userId: user._id })
    //   if (!policies) return res.status(404).json({ message: `No Policies found for user name :${username}` });
    //   console.log(policies)


    const policies = await Policy.aggregate([
        {
          $match: { userId: user._id }, 
        },
        {
          $lookup: {
            from: "carriers", 
            localField: "companyId",
            foreignField: "_id",
            as: "companyDetails",
          },
        },
       
        {
          $lookup: {
            from: "lobs", 
            localField: "categoryId",
            foreignField: "_id",
            as: "categoryDetails",
          },
        },
        {
            $project: {
              _id: 1,
              policyNumber: 1,
              startDate: 1,
              endDate: 1,
              userId: 1,
            //   "companyDetails.companyName": 1, 
            //   "categoryDetails.categoryName": 1,
            companyDetails: { $ifNull: ["$companyDetails.companyName", null] }, 
            categoryDetails: { $ifNull: ["$categoryDetails.categoryName", null] },
            },
          },
        
      ]);
      if (!policies) return res.status(404).json({ message: `No Policies found for user name :${username}` });
    //console.log(policies)
      res.status(200).json(policies);
    } catch (error) {
      res.status(500).json({ error:error.message });
    }
  };


//3) API to provide aggregated policy by each user.
const policyByEachUser = async (req,res)=>{
    try {
        const policies = await Policy.aggregate([
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            { $unwind: "$user" },
            {
              $group: {
                _id: "$user.firstName",
                firstName: { $first: "$user.firstName" },
                email: { $first: "$user.email" },
                totalPolicies: { $sum: 1 },
                policies: {
                  $push: {
                    policyNumber: "$policyNumber",
                    startDate: "$startDate",
                    endDate: "$endDate",
                  }
                }
              }
            }
          ]);
    
    if (!policies) return res.status(404).json({ message: `No Policies found` });
     
    res.status(200).json(policies);
          
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


  export {searchPolicyByUser , policyByEachUser}