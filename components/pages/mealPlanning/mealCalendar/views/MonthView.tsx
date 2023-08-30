import React from "react";

import { handleMonthView } from "@/utils/calendarHelper";
import { CustomRecipe } from "@/utils/types";

type Props = {
  selectedDate: Date;
  meals: CustomRecipe[];
};

const MonthView = ({ selectedDate, meals }: Props) => {
  // Variables
  const todayDate = new Date(new Date().toLocaleDateString());
  const daysInMonthView = handleMonthView(selectedDate);

  const isThereMeal = (date: Date) => {
    const dayMeals = meals.filter(
      (meal) => new Date(meal.date).toDateString() === date.toDateString()
    );
    if (dayMeals.length > 0)
      return dayMeals.map((meal, index) => (
        <div
          key={meal.recipeId}
          className="w-3 h-3 sm:w-4 sm:h-4 rounded-3xl bg-dark border-2 border-slate-200"
        ></div>
      ));
    else return null;
  };
  return (
    <div
      id="meal-calendar-month-view-container"
      className="month-view grid grid-cols-7 gap-1 h-full"
    >
      {daysInMonthView.map((date) =>
        date.getMonth() === selectedDate.getMonth() ? (
          <div
            id="meal-calendar-month-view-cell"
            key={date.toISOString()}
            className={`day ${
              date.toLocaleDateString("en-CA") ===
              todayDate.toLocaleDateString("en-CA")
                ? "bg-extra [&>*:nth-child(1)]:text-medium"
                : "bg-light"
            } border-2 border-dark/70 hover:bg-extra/80 transition-ease`}
          >
            <p className="text-main text-lg text-center">{date.getDate()}</p>

            <div className="flex justify-center flex-wrap gap-1">
              {isThereMeal(date)}
            </div>
          </div>
        ) : (
          <div
            id="meal-calendar-neighbor-month-view-cell"
            key={date.toISOString()}
            className="day bg-light border-2 border-dark/70 opacity-70 hover:bg-extra/80 transition-ease"
          >
            <p className="text-main text-lg text-center">{date.getDate()}</p>

            <div className="flex justify-center flex-wrap gap-1">
              {isThereMeal(date)}
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default MonthView;
