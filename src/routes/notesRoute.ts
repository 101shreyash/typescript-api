import express from "express"
import { DeleteNotes, PostNotes, UpdateNotes, ViewNotes } from "../controllers/notesController.js";
import AuthChecker from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/notes"  , AuthChecker , PostNotes)
router.get("/notes" , AuthChecker , ViewNotes)
router.patch("/notes/:noteid" , AuthChecker , UpdateNotes)
router.delete("/notes/:noteid" , AuthChecker , DeleteNotes)

export default router;
