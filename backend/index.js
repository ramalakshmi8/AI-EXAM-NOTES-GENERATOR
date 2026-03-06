import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";

import cookieParser from "cookie-parser";

import connectDb from "./utils/connectDb.js";
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import notesRouter from "./routes/generate.route.js";
import pdfRouter from "./routes/pdf.route.js";
import creditRouter from "./routes/credits.route.js";
import { stripeWebhook } from "./controllers/credits.controller.js";
import cors from "cors";
const port = process.env.PORT || 5000;
const app = express();

app.post(
  "/api/credits/webhook",
  express.raw({
    type: "application/json",
  }),
  stripeWebhook,
);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("exam notes vackend running");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/notes", notesRouter);
app.use("/api/pdf", pdfRouter);
app.use("/api/credit", creditRouter);

app.listen(port, async () => {
  console.log(`the server is running at the port ${port}`);
  await connectDb();
});
