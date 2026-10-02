import express from "express"
import FullName from "../controllers/infoController.js";
import AuthChecker from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/fullname" , AuthChecker , FullName)



export default router;
