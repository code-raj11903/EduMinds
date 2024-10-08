import express from "express";
import {config} from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";

config({
    path:"./config/config.env"
})
const app = express();
app.use(express.json())
app.use(express.urlencoded({
  extended: true,
}))

app.use(cookieParser())
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//Importing and using routes
  import course from "./routes/courseRoutes.js"
  import user from "./routes/userRoutes.js"
  import payment from "./routes/paymentRoutes.js"
  import other from "./routes/otherRoutes.js"
import { ErrorMiddleware } from "./middlewares/Error.js";
 app.use("/api/v1/" , course)
 app.use("/api/v1/" , user)
 app.use("/api/v1/" , payment)
 app.use("/api/v1" , other)

 // http://localhost:4000 => backend,frontend

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/Frontend/build")));

  // react app
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "Frontend", "build", "index.html"));
  });
}
export default app ;

app.use(ErrorMiddleware)