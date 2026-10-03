import express from "express"
import { Login, Logout, SignUp} from "../controllers/authController.js";


const Router = express.Router();


Router.post("/signup" , SignUp)
Router.post("/login" , Login)
Router.delete("/logout" , Logout)


export default Router;
