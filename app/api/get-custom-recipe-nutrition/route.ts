import { NextResponse, NextRequest } from "next/server";
import { CustomRecipe } from "@/utils/types";

const getRecipe = async (recipe: CustomRecipe) => {
  const ingredients = recipe.recipeIngredient.map(
    (ingredient) => ingredient.ingredient
  );
  const res = await fetch(
    `https://api.spoonacular.com/recipes/analyze?includeNutrition=true&apiKey=${process.env.SPOONACULAR_API_KEY}`,
    {
      cache: "force-cache",
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: recipe.title,
        ingredients,
      }),
    }
  );
  const data = await res.json();
  return data;
};

export async function POST(request: NextRequest) {
  // Variables
  const { recipe } = await request.json();

  try {
    const nutrition = await getRecipe(recipe);

    return NextResponse.json({
      code: 200,
      message: "success",
      data: JSON.stringify(nutrition),
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({
      code: 400,
      message: "failure",
      data: {},
    });
  }
}
