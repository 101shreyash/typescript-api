import express from "express"
import BrowseNotes from "../controllers/browseController.js";
import AuthChecker from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/browsenotes/:username" , AuthChecker , BrowseNotes)


export default router;
