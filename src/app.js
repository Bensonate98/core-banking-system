import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/init.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// routes
app.get("/", (req, res)=>{
  res.send("Hello World");
});
app.use("/api/v1", routes);
app.use(errorHandler);

export default app;