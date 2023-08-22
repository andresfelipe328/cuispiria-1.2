import dbConnect from "@/config/connectMongoDB";
import { CustomRecipe } from "@/models/models";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, recipeId } = await request.json();

  try {
    await dbConnect();

    await CustomRecipe.deleteOne({ userId, recipeId });

    revalidatePath("/meal-planning");

    return NextResponse.json({ message: "success", code: 200 });
  } catch (err) {
    return NextResponse.json({ message: err, code: 400 });
  }
}
