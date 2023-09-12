import dbConnect from "@/config/connectMongoDB";
import { SavedRecipe } from "@/models/models";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  // Variables
  const { session, recipe } = await request.json();
  const userId = session.data.user.id;
  const currRecipe = JSON.parse(recipe);

  try {
    await dbConnect();

    const isRecipePresent = await SavedRecipe.findOne({
      userId: userId,
      recipeId: currRecipe.recipeId,
    });

    if (!isRecipePresent) {
      await SavedRecipe.create({
        userId: userId,
        recipeId: currRecipe.recipeId || currRecipe.id,
        title: currRecipe.title,
        readyInMinutes: currRecipe.readyInMinutes,
        image: currRecipe.image,
        customed: currRecipe?.customed,
        aggregateLikes: currRecipe?.aggregateLikes,
        healthScore: currRecipe?.healthScore,
      });
    }

    return NextResponse.json({ code: 200, message: "success" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ code: 400, message: "failure" });
  }
}
