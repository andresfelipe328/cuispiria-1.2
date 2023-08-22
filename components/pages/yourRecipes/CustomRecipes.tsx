import React from "react";

import RecipeOverview from "../helpers/RecipeOverview";
import { RecipeOverview as Recipe } from "@/utils/types";

type Props = {
  allRecipes: string;
};

const CustomRecipes = ({ allRecipes }: Props) => {
  const savedRecipes: Recipe[] = JSON.parse(allRecipes);

  return (
    <div className="flex flex-col gap-2 p-4 bg-medium rounded-md shadow-inner">
      <h3>Custom Recipes</h3>
      <div
        id="recipes-list-container"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {savedRecipes.length > 0 ? (
          savedRecipes.map((meal) => (
            <RecipeOverview key={meal.recipeId} recipe={meal} saved={true} />
          ))
        ) : (
          <small>no saved custom meals</small>
        )}
      </div>
    </div>
  );
};

export default CustomRecipes;
