import React from "react";

import { CustomRecipe, RecipeOverview as Recipe } from "@/utils/types";

import RecipeOverview from "../../helpers/RecipeOverview";

type Props = {
  selectedDate: Date;
  meals: string;
};

const DateMealsList = ({ selectedDate, meals }: Props) => {
  // Variables
  const selectedDateMeals: Recipe[] = JSON.parse(meals).filter(
    (recipe: CustomRecipe) =>
      new Date(recipe.date!).toLocaleDateString("en-CA") ===
      selectedDate.toLocaleDateString("en-CA")
  );

  return (
    <div>
      <h2 className="bg-dark w-fit px-5 py-2 shadow-s">
        {selectedDate.toDateString()}
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {selectedDateMeals.map((meal) => (
          <RecipeOverview key={meal.recipeId} recipe={meal} />
        ))}
      </div>
    </div>
  );
};

export default DateMealsList;
