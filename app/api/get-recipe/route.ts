import { NextResponse, NextRequest } from "next/server";

const getRecipe = async (recipeId: string) => {
  const res = await fetch(
    `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
    {
      cache: "force-cache",
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    }
  );

  const data = await res.json();
  return data;
};

export async function POST(request: NextRequest) {
  // Variables
  const { recipeId } = await request.json();
  try {
    const recipe = await getRecipe(recipeId);

    return NextResponse.json({
      code: 200,
      message: "success",
      data: JSON.stringify(recipe),
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
