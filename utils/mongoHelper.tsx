import dbConnect from "@/config/connectMongoDB";
import { CustomRecipe } from "@/models/models";
import { CustomRecipe as Recipe } from "./types";

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

export { getAllRecipes };
