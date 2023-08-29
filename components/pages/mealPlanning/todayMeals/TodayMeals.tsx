import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RecipeOverview as Recipe } from "@/utils/types";

import RecipeOverview from "../../helpers/RecipeOverview";

type Props = {
  allRecipes: string;
};

const TodayMeals = async ({ allRecipes }: Props) => {
  // Variables
  const todayDate = new Date();

  const todayMeals: Recipe[] = JSON.parse(allRecipes).filter(
    (recipe: Recipe) =>
      new Date(recipe.date!).toDateString() === todayDate.toDateString()
  );

  return (
    <div>
      <h3 className="bg-dark w-fit px-5 py-2 shadow-s">
        Today Meals - {todayDate.toDateString()}
      </h3>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {todayMeals.length > 0 ? (
          todayMeals.map((meal) => (
            <RecipeOverview key={meal.recipeId} recipe={meal} saved={false} />
          ))
        ) : (
          <small>no meals today</small>
        )}
      </div>
    </div>
  );
};

export default TodayMeals;
