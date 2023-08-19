"use client";

import RecipeSearchForm from "@/components/forms/RecipeSearchForm";
import React, { useState } from "react";
import RecipeOverview from "../helpers/RecipeOverview";

const Recipes = () => {
  // Variables
  const [recipesList, setRecipesList] = useState([]);

  return (
    <>
      <RecipeSearchForm />

      <div
        id="recipes-list-container"
        className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
        <RecipeOverview saved={false} />
      </div>
    </>
  );
};

export default Recipes;
