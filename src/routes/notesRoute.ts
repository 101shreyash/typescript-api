import express from "express"
import { PostNotes, ViewNotes } from "../controllers/notesController.js";
import AuthChecker from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/notes"  , AuthChecker , PostNotes)
router.get("/notes" , AuthChecker , ViewNotes)

export default router;
