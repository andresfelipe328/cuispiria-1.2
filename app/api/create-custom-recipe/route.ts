import dbConnect from "@/config/connectMongoDB";
import { CustomRecipe } from "@/models/models";
import { CustomRecipe as Recipe } from "@/utils/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data: Recipe = await request.json();

  try {
    await dbConnect();

    const isRecipePresent = await CustomRecipe.findOne({
      userId: data.userId,
      recipeId: data.recipeId,
    });

    if (isRecipePresent) {
      await CustomRecipe.updateOne(
        {
          userId: data.userId,
          recipeId: data.recipeId,
        },
        {
          ...data,
        }
      );
    } else {
      await CustomRecipe.create({
        ...data,
      });
    }

    return NextResponse.json({ code: 200, message: "success" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ code: 400, message: "failure" });
  }
}
