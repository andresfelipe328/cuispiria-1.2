import mongoose from "mongoose";

const customRecipeSchema = new mongoose.Schema({
  userId: String,
  recipeId: String,
  title: String,
  readyInMinutes: Number,
  recipeTypes: [String],
  image: String,
  date: String,
  timeSlot: Number,
  pricePerServing: Number,
  recipeIngredient: [
    {
      ingredientId: String,
      ingredient: String,
    },
  ],
  recipeInstruction: [
    {
      instructionId: String,
      instruction: String,
    },
  ],
  customed: Boolean,
});

const savedRecipeSchema = new mongoose.Schema({
  userId: String,
  recipeId: String,
  title: String,
  readyInMinutes: Number,
  recipeTypes: [String],
  image: String,
  pricePerServing: Number,
  customed: Boolean,
  metaScore: Number,
  healthScore: Number,
});

const preferencesSchema = new mongoose.Schema({
  userId: String,
  preferences: [String],
});

const CustomRecipe =
  mongoose.models.customRecipe ||
  mongoose.model("customRecipe", customRecipeSchema);

const Preferences =
  mongoose.models.preferences ||
  mongoose.model("preferences", preferencesSchema);

const SavedRecipe =
  mongoose.models.savedRecipe ||
  mongoose.model("savedRecipe", savedRecipeSchema);

export { CustomRecipe, SavedRecipe, Preferences };
