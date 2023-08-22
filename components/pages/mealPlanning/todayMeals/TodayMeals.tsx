import React from "react";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { RecipeOverview as Recipe } from "@/utils/types";

import RecipeOverview from "../../helpers/RecipeOverview";

const TodayMeals = async () => {
  // Variables
  const todayDate = new Date();
  const session = await getServerSession(authOptions);
  const res = await fetch("http://localhost:3000/api/get-meal-planning-data", {
    next: { tags: ["mealPlanningData"] },
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      session,
    }),
  });

  const { message, code, data } = await res.json();
  const todayMeals: Recipe[] = JSON.parse(data).filter(
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
