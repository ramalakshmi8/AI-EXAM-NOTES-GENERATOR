import express from "express";
import isAuth from "../middleware/isAuth.js";
import { getMyNotes, getSingleNotes } from "../controllers/notes.controller.js";
import { generateNotes } from "../controllers/generate.controller.js";
const notesRouter = express.Router();
notesRouter.post("/generate-notes", isAuth, generateNotes);
notesRouter.get("/getNotes", isAuth, getMyNotes);
notesRouter.get("/:id", isAuth, getSingleNotes);
export default notesRouter;
