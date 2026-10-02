import express from "express"
import { Login, SignUp} from "../controllers/authController.js";


const Router = express.Router();


Router.post("/signup" , SignUp)
Router.post("/login" , Login)


export default Router;
