import React from "react";

import { handleMonthView } from "@/utils/calendarHelper";
import { CustomRecipe } from "@/utils/types";

import { AiFillEye } from "react-icons/ai";

type Props = {
  selectedDate: Date;
  setSelectedDate: Function;
  meals: CustomRecipe[];
};

const MonthView = ({ selectedDate, setSelectedDate, meals }: Props) => {
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

  const renderViewIndicator = () => {
    return <AiFillEye className="text-dark absolute top-1 right-1" />;
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
            onClick={() => setSelectedDate(date)}
            className={`relative day ${
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

            {date.toLocaleDateString("en-CA") ===
              selectedDate.toLocaleDateString("en-CA") && renderViewIndicator()}
          </div>
        ) : (
          <div
            id="meal-calendar-neighbor-month-view-cell"
            key={date.toISOString()}
            onClick={() => setSelectedDate(date)}
            className="day bg-light border-2 border-dark/70 opacity-70 hover:bg-extra/80 transition-ease"
          >
            <p className="text-main text-lg text-center">{date.getDate()}</p>

            <div className="flex justify-center flex-wrap gap-1">
              {isThereMeal(date)}
            </div>

            {date.toLocaleDateString("en-CA") ===
              selectedDate.toLocaleDateString("en-CA") && renderViewIndicator()}
          </div>
        )
      )}
    </div>
  );
};

export default MonthView;
