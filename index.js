import express from "express";
import dotenv from "dotenv";
import connectToDB from "./config.js";
import blogPostRoutes from "./routes/BlogPost.js"; 
import userRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser"; 


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser())


connectToDB(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api", blogPostRoutes); 
app.use("/api/auth",userRoutes)

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});

