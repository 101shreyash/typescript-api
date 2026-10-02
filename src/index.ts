import express from "express";
import "dotenv/config"
import Authentication from "./routes/authRoute.js"
import AskFullName from "./routes/infoRoute.js"
import cookieParser from "cookie-parser";



const app = express();
const port = Number(process.env.PORT)

app.use(cookieParser());

app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.use("/auth" , Authentication)
app.use("/api" , AskFullName)


app.listen(port , (() => {console.log(`Server Is running on port ${8001}`)}))
