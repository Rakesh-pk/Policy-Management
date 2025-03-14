import express from "express";
import { searchPolicyByUser , policyByEachUser } from "../controllers/policyController.js";

const router = express.Router();

router.get("/search-by-username/:username" , searchPolicyByUser)
router.get("/user-policy" , policyByEachUser)


export default router;