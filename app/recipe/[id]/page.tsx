import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import { AiFillLike } from "react-icons/ai";
import { BsFillHeartPulseFill } from "react-icons/bs";
import { BiTimeFive, BiLinkAlt } from "react-icons/bi";
import { FaInfoCircle } from "react-icons/fa";
import { TbPointFilled } from "react-icons/tb";
import SaveButton from "@/components/pages/recipe/SaveButton";

export const metadata: Metadata = {
  title: "Cuispiria - Recipe Title",
  description: "Recipe Title",
};

type Params = {
  params: {
    id: string;
  };
};

const getRecipe = async (id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/get-recipe`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      recipeId: id,
    }),
  });

  const { message, code, data } = await res.json();
  return JSON.parse(data);
};

const page = async ({ params: { id } }: Params) => {
  const recipe = await getRecipe(id);
  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-5 p-4">
        <h2 className="bg-dark w-fit px-5 py-2 shadow-s">{recipe.title}</h2>

        <div
          id="recipe-header-container"
          className="relative bg-recipe-bg flex flex-col shadow-inner rounded-md p-2"
        >
          <div className="relative h-[375px]">
            <Image
              src={recipe.image}
              alt={`${recipe.title} image recipe`}
              fill={true}
              sizes="100%"
              className="object-contain"
              priority
            />
          </div>
          <div
            className="text-dark font-semibold bg-light/30 backdrop-blur-[2px] shadow-s rounded-md mt-2 p-2 max-h-[200px] overflow-auto"
            dangerouslySetInnerHTML={{ __html: recipe.summary }}
          />
          <Link
            href={recipe.sourceUrl}
            target="_blank"
            className="absolute right-2 button "
          >
            <BiLinkAlt className="icon" />
          </Link>
          <SaveButton />
        </div>

        <div id="recipe-info-container" className="flex flex-col gap-2">
          <div id="recipe-ratings-time" className="flex gap-5 w-full">
            <div className="flex items-center gap-2">
              <AiFillLike className="icon" />
              <small>{recipe.aggregateLikes}</small>
            </div>
            <div className="flex items-center gap-2">
              <BsFillHeartPulseFill className="icon" />
              <small>{recipe.healthScore}%</small>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <BiTimeFive className="icon text-extra" />
              <small>{recipe.readyInMinutes} min</small>
            </div>
          </div>

          {recipe.dishTypes.length > 0 && (
            <div id="recipe-types" className="flex items-center gap-2">
              <small className="font-bold uppercase">Dish Type(s):</small>
              <small>{recipe.dishTypes.join(", ")}</small>
            </div>
          )}

          {recipe.winePairing.pairedWines.length > 0 && (
            <div
              id="recipe-wine-pairing"
              className="flex flex-col gap-2 bg-info rounded-t-md shadow-s mx-auto"
            >
              <div
                id="tooltip-header"
                className="flex items-center gap-2 bg-dark px-4 py-1 rounded-t-md"
              >
                <FaInfoCircle className="icon text-light" />
                <h3>Wines</h3>
              </div>
              <small className="px-2">
                <span className="font-bold">WINES:</span>{" "}
                {recipe.winePairing.pairedWines.join(", ")}
              </small>
              <small className="p-2">{recipe.winePairing.pairingText}</small>
            </div>
          )}
        </div>

        <div id="recipe-ingredients-container" className="flex flex-col gap-2">
          <h3>Ingredients</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recipe.extendedIngredients.map(
              (ingredient: any, index: number) => (
                <li key={index} className="flex items-center gap-1">
                  <TbPointFilled className="icon" />
                  <p>{ingredient.original}</p>
                </li>
              )
            )}
          </ul>
        </div>

        <div id="recipe-instructions-container" className="flex flex-col gap-2">
          <h3>Instructions</h3>
          <ul className="flex flex-col gap-4">
            {recipe.analyzedInstructions.map((instr: any) =>
              instr.steps.map((step: any, index: number) => (
                <li key={index} className="flex items-center gap-2">
                  {/* <TbPointFilled className="icon" /> */}
                  <small className="flex items-center justify-center font-bold bg-extra text-medium w-10 h-10 rounded-sm shadow-s">
                    {index + 1}
                  </small>
                  <p className="flex-1">{step.step}</p>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </BasicAnimLayout>
  );
};

export default page;
