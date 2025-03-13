import { Worker } from "worker_threads";
import path from "path";

const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  console.log('file uploaded')
  res.status(200).json({ message : 'file uploaded' });

//   const worker = new Worker(path.resolve("workers/fileProcessor.js"), {
//     workerData: { filePath: req.file.path },
//   });

//   worker.on("message", (message) => {
//     res.status(200).json({ message });
//   });

//   worker.on("error", (error) => {
//     res.status(500).json({ error });
//   });
};

export {uploadFile};
