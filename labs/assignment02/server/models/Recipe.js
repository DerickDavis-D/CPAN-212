import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  difficulty: { type: String, enum: ["Easy", "Medium", "Hard"], required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;
