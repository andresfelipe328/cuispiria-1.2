import React from "react";

import RecipeOverview from "../helpers/RecipeOverview";
import { RecipeOverview as Recipe } from "@/utils/types";

type Props = {
  allRecipes: string;
};

const Recipes = ({ allRecipes }: Props) => {
  const savedRecipes: Recipe[] = JSON.parse(allRecipes);

  return (
    <div className="flex flex-col gap-2 p-4 bg-medium rounded-md shadow-inner">
      <h3>App Recipes</h3>
      <div
        id="recipes-list-container"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {savedRecipes.length > 0 ? (
          savedRecipes.map((meal) => (
            <RecipeOverview key={meal.recipeId} recipe={meal} />
          ))
        ) : (
          <small>no saved app meals</small>
        )}
      </div>
    </div>
  );
};

export default Recipes;
