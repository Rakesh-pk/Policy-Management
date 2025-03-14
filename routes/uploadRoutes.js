import express from "express";
import multer from "multer";
import { uploadFile } from "../controllers/uploadController.js";



const storage  =  multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null , './uploads')
    },
    filename: function(req,file,cb){
        return cb(null , `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage:storage})
const router = express.Router();

router.post("/upload", upload.single("csv"), uploadFile);


export default router;
