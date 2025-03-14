import { Worker } from "worker_threads";
import path from "path";

const uploadFile = (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  console.log('file uploaded')
  // res.status(200).json({ message : 'file uploaded' });

  let t0 = performance.now()
  let workerPath = path.resolve('worker/fileProcessor.js')
  const worker = new Worker(workerPath, {workerData: { filePath: req.file.path }});

  worker.on("message", (message) => {
    let t1 = performance.now()
    console.log(`worker thread took ${t1 - t0} milliseconds.`); 
    res.status(200).json({ message });
  });

  worker.on("error", (error) => {
    res.status(500).json({ error });
  });
};

export {uploadFile};
