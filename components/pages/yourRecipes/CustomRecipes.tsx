import React from "react";

import RecipeOverview from "../helpers/RecipeOverview";

const CustomRecipes = () => {
  return (
    <div className="flex flex-col gap-2 p-4 bg-medium rounded-md shadow-inner">
      <h3>Custom Recipes</h3>
      <div
        id="recipes-list-container"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
        <RecipeOverview saved={true} />
      </div>
    </div>
  );
};

export default CustomRecipes;
