import express from "express";
const authRouter = express.Router();
import { googleAuth, logOut } from "../controllers/auth.controller.js";
authRouter.post("/google", googleAuth);
authRouter.get("/logOut", logOut);

export default authRouter;
