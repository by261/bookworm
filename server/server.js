import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import chat from "./chat.js";
import chatMCP from "./chat-mcp.js";

dotenv.config();
const app = express();

// cors is a middleware
app.use(cors());

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

const PORT = 5001;

let filePath;

app.post("/upload", upload.single("file"), (req, res) => {
  // Use multer to handle file upload
  filePath = req.file.path; // The path where the file is temporarily saved
  res.send(filePath + " upload successfully.");
});

app.get("/chat", async (req, res) => {
  // const resp = await chat(filePath, req.query.question);
  const mcpRest = await chatMCP(req.query.question);
  res.send({
    // ragAnswer: resp.text,
    mcpAnswer: mcpRest.text,
  });
});

app.listen(PORT, () => console.log("server is running"));
