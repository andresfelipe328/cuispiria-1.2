import dbConnect from "@/config/connectMongoDB";
import { CustomRecipe, SavedRecipe } from "@/models/models";
import {
  CustomRecipe as CRecipe,
  RecipeOverview as Recipe,
  SavedRecipe as SRecipe,
} from "./types";
import { Document } from "mongodb";

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
  let recipes: SRecipe[] = [];

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

const getRecipe = async (id: string, session: any) => {
  await dbConnect();
  let recipe: Document | null = null;

  try {
    if (session) {
      recipe = await CustomRecipe.findOne({
        userId: session.user.id,
        recipeId: id,
      });
    }
    return recipe!._doc;
  } catch (err) {
    return recipe;
  }
};

export { getAllRecipes, getAllSavedRecipes, getRecipe };
