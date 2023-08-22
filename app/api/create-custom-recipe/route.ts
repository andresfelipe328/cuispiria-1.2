import dbConnect from "@/config/connectMongoDB";
import { CustomRecipe, SavedRecipe } from "@/models/models";
import { CustomRecipe as Recipe } from "@/utils/types";
import { NextResponse, NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

// const saveRecipe = async (prevRecipeId: string, data: Recipe) => {
//   const {
//     recipeId,
//     date,
//     timeSlot,
//     recipeIngredient,
//     recipeInstruction,
//     ...rest
//   } = data;
//   try {
//     const isRecipePresent = await SavedRecipe.findOne({
//       userId: data.userId,
//       recipeId: prevRecipeId,
//     });

//     if (isRecipePresent) {
//       await SavedRecipe.updateOne(
//         {
//           userId: data.userId,
//           recipeId: prevRecipeId,
//         },
//         {
//           recipeId: prevRecipeId,
//           ...rest,
//         }
//       );
//     } else {
//       await SavedRecipe.create({
//         recipeId,
//         ...rest,
//       });
//     }
//   } catch (err) {
//     console.log(err);
//   }
// };

export async function POST(request: NextRequest) {
  const { action, prevRecipeId, ...data } = await request.json();

  try {
    await dbConnect();

    // await saveRecipe(prevRecipeId, data);
    const isRecipePresent = await CustomRecipe.findOne({
      userId: data.userId,
      recipeId: prevRecipeId,
    });

    if (isRecipePresent && action !== "paste") {
      await CustomRecipe.updateOne(
        {
          userId: data.userId,
          recipeId: prevRecipeId,
        },
        {
          recipId: prevRecipeId,
          ...data,
        }
      );
    } else {
      await CustomRecipe.create({
        ...data,
      });
    }

    revalidatePath("/meal-planning");

    return NextResponse.json({ code: 200, message: "success" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ code: 400, message: "failure" });
  }
}
