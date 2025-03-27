import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import recipesRouter from "./routes/recipes_router.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/recipe", recipesRouter);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
