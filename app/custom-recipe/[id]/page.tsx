import Image from "next/image";
import { Metadata } from "next";

import { getServerSession } from "next-auth";
import { getRecipe } from "@/utils/mongoHelper";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { CustomRecipe } from "@/utils/types";

import { BiTimeFive } from "react-icons/bi";
import { TbPointFilled } from "react-icons/tb";
import { FaImage } from "react-icons/fa";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import SaveButton from "@/components/pages/recipe/SaveButton";
import CaloricBreakdown from "@/components/pages/recipe/CaloricBreakdown";
import NutrientBreakdown from "@/components/pages/recipe/NutrientBreakdown";

export const metadata: Metadata = {
  title: "Cuispiria - Recipe Title",
  description: "Recipe Title",
};

type Params = {
  params: {
    id: string;
  };
};

const getNutrition = async (recipe: CustomRecipe) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-custom-recipe-nutrition`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        recipe: recipe,
      }),
    }
  );

  const { message, code, data } = await res.json();
  return JSON.parse(data);
};

const page = async ({ params: { id } }: Params) => {
  // Variables
  const session = await getServerSession(authOptions);
  const recipe: CustomRecipe = await getRecipe(id, session);
  const nutritionData = await getNutrition(recipe);

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-5 p-4">
        <h2 className="bg-dark w-fit px-5 py-2 shadow-s">{recipe.title}</h2>

        <div
          id="recipe-header-container"
          className="relative bg-recipe-bg flex flex-col shadow-inner rounded-md p-2"
        >
          <div className="relative h-[375px] flex items-center justify-center">
            {recipe.image && recipe.image.length > 0 ? (
              <Image
                src={recipe.image}
                alt={`${recipe.title} image recipe`}
                fill={true}
                sizes="100%"
                className="object-contain"
                priority
              />
            ) : (
              <div className="w-[400px] h-[200px] flex items-center justify-center bg-medium shadow-s rounded-md">
                <FaImage className="text-6xl text-dark group-hover/container:scale-110 transition-ease " />
              </div>
            )}
          </div>
          <div className="absolute right-2 top-2">
            <SaveButton recipe={JSON.stringify(recipe)} />
          </div>
        </div>

        <div id="recipe-info-container" className="flex flex-col gap-2">
          <div id="recipe-ratings-time" className="flex gap-5 w-full">
            <div className="flex items-center gap-2 ml-auto">
              <BiTimeFive className="icon text-extra" />
              <small>{recipe.readyInMinutes} min</small>
            </div>
          </div>

          {recipe.recipeTypes && recipe.recipeTypes.length > 0 && (
            <div id="recipe-types" className="flex items-center gap-2">
              <small className="font-bold uppercase">Dish Type(s):</small>
              <small>{recipe.recipeTypes.join(", ")}</small>
            </div>
          )}
        </div>

        <div id="recipe-ingredients-container" className="flex flex-col gap-2">
          <h3>Ingredients</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.recipeIngredient.map((ingredient: any, index: number) => (
              <li key={index} className="flex items-center gap-1">
                <TbPointFilled className="icon" />
                <p>{ingredient.ingredient}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="recipe-instructions-container" className="flex flex-col gap-2">
          <h3>Instructions</h3>
          <ul className="flex flex-col gap-4">
            {recipe.recipeInstruction.map((instr: any, index) => (
              <li key={instr.instructionId} className="flex items-center gap-2">
                <small className="flex items-center justify-center font-bold bg-extra text-medium w-10 h-10 rounded-sm shadow-s">
                  {index + 1}
                </small>
                <p className="flex-1">{instr.instruction}</p>
              </li>
            ))}
          </ul>
        </div>

        <div id="recipe-nutrition-container" className="flex flex-col gap-4">
          <h3>Nutrition</h3>

          <CaloricBreakdown data={nutritionData.nutrition.caloricBreakdown} />
          <NutrientBreakdown data={nutritionData.nutrition.nutrients} />
        </div>
      </div>
    </BasicAnimLayout>
  );
};

export default page;
