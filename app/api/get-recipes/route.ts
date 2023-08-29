import { CustomRecipe } from "@/models/models";
import { Filter, RecipeOverview } from "@/utils/types";
import { NextResponse, NextRequest } from "next/server";

const getRecipes = async (query: string, filters: Filter[], offset: number) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${process.env.DEFAULT_NUMBER}&offset=${offset}&addRecipeInformation=true&apiKey=${process.env.SPOONACULAR_API_KEY}`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const data = await res.json();

  return data.results;
};

export async function POST(request: NextRequest) {
  // Variables
  const { searchRecipeInput, filters, offset } = await request.json();
  let recipes: RecipeOverview[] = [];

  try {
    const recipes = await getRecipes(searchRecipeInput, filters, offset);

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
