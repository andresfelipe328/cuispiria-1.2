"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { CustomRecipe } from "@/utils/types";

import { FaTrash, FaCopy, FaPaste } from "react-icons/fa";
import { nanoid } from "nanoid";

type Props = {
  meals: CustomRecipe[];
  setMeals: Function;
  selectedDate: Date;
  setSelectedSlot: Function;
  setShowModal: Function;
};

const DayView = ({
  meals,
  setMeals,
  selectedDate,
  setSelectedSlot,
  setShowModal,
}: Props) => {
  // Variables
  const hours = Array.from({ length: 25 }, (_, i) => i);
  const [copyMeal, setCopyMeal] = useState<CustomRecipe | undefined>(undefined);
  const session: any = useSession();

  const isThereMeal = (day: Date, timeSlot: number) => {
    const meal = meals.find(
      (meal) =>
        new Date(meal.date).getDate() === day.getDate() &&
        meal.timeSlot === timeSlot
    );

    return meal;
  };

  const handleCellClick = (timeSlotIndex: number) => {
    setSelectedSlot({
      day: selectedDate.toDateString(),
      timeSlot: hours[timeSlotIndex],
    });
    setShowModal(true);
  };

  const handleDelete = async (
    e: React.SyntheticEvent,
    selectedMeal: CustomRecipe
  ) => {
    e.stopPropagation();
    setMeals(meals.filter((meal) => meal.recipeId !== selectedMeal.recipeId));

    const res = await fetch("http://localhost:3000/api/delete-custom-recipe", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        userId: session.data.user.id,
        recipeId: selectedMeal.recipeId,
      }),
    });

    const { message, code } = await res.json();
    console.log(message);
  };

  const handleCopy = (e: React.SyntheticEvent, selectedMeal: CustomRecipe) => {
    e.stopPropagation();
    setCopyMeal(selectedMeal);
  };

  const handlePaste = async (
    e: React.SyntheticEvent,
    day: Date,
    newTimeSlot: number
  ) => {
    e.stopPropagation();
    const newRecipeId = nanoid();
    const { _id, recipeId, date, timeSlot, ...rest } = copyMeal!;

    const res = await fetch(`http://localhost:3000/api/create-custom-recipe`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        recipeId: newRecipeId,
        date: new Date(day.toDateString()),
        timeSlot: newTimeSlot,
        ...rest,
      }),
    });

    const { message, code } = await res.json();
    console.log(message);
    setMeals([
      ...meals,
      {
        recipeId: newRecipeId,
        date: new Date(day.toDateString()),
        timeSlot: newTimeSlot,
        ...rest,
      },
    ]);
    setCopyMeal(undefined);
  };

  const renderMealSummary = (day: Date, timeSlot: number) => {
    const meal = isThereMeal(day, timeSlot);

    if (meal)
      return (
        <>
          <button
            onClick={(e) => handleDelete(e, meal)}
            className=" top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
          >
            <FaTrash className="text-red-500" />
          </button>
          <small className="uppercase font-bold text-dark">{meal.title}</small>
          <button
            onClick={(e) => handleCopy(e, meal)}
            className=" bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
          >
            <FaCopy className="text-dark" />
          </button>
        </>
      );
    else if (copyMeal)
      return (
        <>
          <button
            onClick={(e) => handlePaste(e, day, timeSlot)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
          >
            <FaPaste className="text-dark" />
          </button>
        </>
      );
    else return null;
  };

  return (
    <div className="day-view flex flex-col gap-1">
      {hours.map((timeSlot, index) => (
        <div
          onClick={() => handleCellClick(timeSlot)}
          className={`relative group flex cursor-pointer ${
            isThereMeal(selectedDate, timeSlot) ? "bg-light" : "bg-light/50"
          } border-2 border-dark/70 hover:bg-light transition-ease`}
          key={index}
        >
          <p className="w-16 py-2 h-14 bg-light grid place-content-center">
            {timeSlot === 0
              ? "12 AM"
              : timeSlot < 12
              ? `${timeSlot} AM`
              : timeSlot === 12
              ? "12 PM"
              : `${timeSlot - 12} PM`}
          </p>
          <div className="flex-1 flex gap-4 items-center justify-center">
            {renderMealSummary(selectedDate, timeSlot)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DayView;
