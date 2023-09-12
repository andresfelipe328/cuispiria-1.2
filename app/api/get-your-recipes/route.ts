import { CustomRecipe } from "@/models/models";
import { getAllSavedRecipes } from "@/utils/mongoHelper";
import { Filter, RecipeOverview, SavedRecipe } from "@/utils/types";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Variables
  const { session } = await request.json();
  let recipes: SavedRecipe[] = [];

  try {
    recipes = await getAllSavedRecipes(session);

    return NextResponse.json({
      code: 200,
      message: "success",
      data: JSON.stringify(recipes),
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      code: 400,
      message: "failure",
      data: JSON.stringify(recipes),
    });
  }
}
