import express from "express"
import { DeleteAccount } from "../controllers/settingController.js";
import AuthChecker from "../middleware/authMiddleware.js";

const router = express.Router();


router.delete("/setting/deleteaccount" , AuthChecker , DeleteAccount)


export default router;
