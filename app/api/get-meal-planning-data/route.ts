import { CustomRecipe } from "@/models/models";
import { RecipeOverview } from "@/utils/types";
import { revalidatePath } from "next/cache";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const { session } = await request.json();

  let recipes: RecipeOverview[] = [];
  try {
    if (session)
      recipes = await CustomRecipe.find({
        userId: session.user.id,
      });

    revalidatePath(request.nextUrl.searchParams.get("path") || "/");

    return NextResponse.json({
      code: 200,
      message: "success",
      data: JSON.stringify(recipes),
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ code: 400, message: "failure" });
  }
}
