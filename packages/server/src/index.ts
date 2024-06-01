import express from "express";
import rootRouter from "./routes/root.js";
import { errorHandler } from "./middlewares.js";
import cors from "cors";
import multer from "multer";

const app = express();
const upload = multer();
const [host, port] = process.env["TM_HOST"]
  ? process.env["TM_HOST"].split(":")
  : ["127.0.0.1", "3001"];

// Middlewares
app.use((req, _, next) => {
  req.startTime = Date.now();
  next();
});
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route handlers
app.use("/", upload.single("torrent_file"), rootRouter);

// Error handler
app.use(errorHandler);

// Main
app.listen(Number(port), host, () => {
  console.log(`Started in ${process.env.NODE_ENV} enviroment.`);
  console.log(`Listening on ${host} port ${port}`);
});
