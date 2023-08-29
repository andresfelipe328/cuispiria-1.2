"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { RecipeOverview as Recipe } from "@/utils/types";

import RecipeSearchForm from "@/components/forms/RecipeSearchForm";
import RecipeOverview from "../helpers/RecipeOverview";

const Recipes = () => {
  // Variables
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [recipesList, setRecipesList] = useState<Recipe[]>([]);

  const handleAddMore = async () => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-recipes`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          searchRecipeInput: searchParams.get("query"),
          filters: [],
          offset: recipesList.length,
        }),
      }
    );

    // const { message, code, data } = await res.json();
    res.json().then(({ message, code, data }) => {
      setLoading(false);
      setRecipesList((prev) => [...prev, ...JSON.parse(data)]);
    });
  };

  return (
    <>
      <RecipeSearchForm
        recipesList={recipesList}
        setRecipesList={setRecipesList}
        setLoading={setLoading}
      />
      <div id="recipes-list-container" className="h-full mt-2">
        {recipesList.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recipesList.map((recipe, index) => (
                <RecipeOverview key={index} recipe={recipe} saved={false} />
              ))}
            </div>

            <button
              onClick={handleAddMore}
              className="button mx-auto w-fit mt-4"
            >
              <small className="text-button">more</small>
            </button>
          </>
        ) : (
          <div className="flex flex-col gap-2 items-center justify-center">
            <Image
              src="/cuispiria_idea.svg"
              width={70}
              height={70}
              alt="idea bulb"
              priority
            />
            {loading ? (
              <small>fetching your previous ideas...</small>
            ) : (
              <small>waiting for your ideas...</small>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Recipes;
