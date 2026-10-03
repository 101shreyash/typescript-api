import express from "express";
import "dotenv/config"
import cookieParser from "cookie-parser";


// Routers
import Authentication from "./routes/authRoute.js"
import AskFullName from "./routes/infoRoute.js"
import Notes from "./routes/notesRoute.js"


const app = express();
const port = Number(process.env.PORT)

app.use(cookieParser());

app.use(express.urlencoded({extended : true}))
app.use(express.json());

app.use("/auth" , Authentication)
app.use("/api" , AskFullName)
app.use("/api" , Notes)


app.listen(port , (() => {console.log(`Server Is running on port ${8001}`)}))
