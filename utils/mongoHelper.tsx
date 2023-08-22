import dbConnect from "@/config/connectMongoDB";
import { CustomRecipe, SavedRecipe } from "@/models/models";
import { RecipeOverview as Recipe } from "./types";

const getAllRecipes = async (session: any) => {
  await dbConnect();
  let recipes: Recipe[] = [];

  try {
    if (session)
      recipes = await CustomRecipe.find({
        userId: session.user.id,
      });
    return recipes;
  } catch (err) {
    return [];
  }
};

const getAllSavedRecipes = async (session: any) => {
  await dbConnect();
  let recipes: Recipe[] = [];

  try {
    if (session)
      recipes = await SavedRecipe.find({
        userId: session.user.id,
      });
    return recipes;
  } catch (err) {
    return [];
  }
};

export { getAllRecipes, getAllSavedRecipes };
