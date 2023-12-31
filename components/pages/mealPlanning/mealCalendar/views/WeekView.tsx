"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSession } from "next-auth/react";

import { nanoid } from "nanoid";
import { CustomRecipe } from "@/utils/types";
import { handleWeekView } from "@/utils/calendarHelper";
import { refreshPage } from "@/app/actions";

import { FaTrash, FaCopy, FaPaste } from "react-icons/fa";
import { AiFillEye } from "react-icons/ai";

type Props = {
  meals: CustomRecipe[];
  setMeals: Function;
  selectedDate: Date;
  setSelectedSlot: Function;
  setShowModal: Function;
};

const WeekView = ({
  meals,
  setMeals,
  selectedDate,
  setSelectedSlot,
  setShowModal,
}: Props) => {
  // Variables
  const router = useRouter();
  const todayDate = new Date();
  const daysInWeek = handleWeekView(selectedDate);
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

  const handleViewRecipe = (e: React.SyntheticEvent, meal: CustomRecipe) => {
    e.stopPropagation();
    router.push(`/custom-recipe/${meal.recipeId}`);
  };

  const handleCellClick = (dayIndex: number, timeSlotIndex: number) => {
    setSelectedSlot({
      day: daysInWeek[dayIndex].toDateString(),
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/delete-custom-recipe`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId: session.data.user.id,
          recipeId: selectedMeal.recipeId,
        }),
      }
    );

    const { message, code } = await res.json();
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/create-custom-recipe`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          action: "paste",
          prevRecipeId: recipeId,
          recipeId: newRecipeId,
          date: new Date(day.toDateString()),
          timeSlot: newTimeSlot,
          ...rest,
        }),
      }
    );

    const { message, code } = await res.json();

    setMeals([
      ...meals,
      {
        recipeId: newRecipeId,
        date: new Date(day.toDateString()),
        timeSlot: newTimeSlot,
        ...rest,
      },
    ]);
    refreshPage();
    setCopyMeal(undefined);
  };

  const renderMealSummary = (day: Date, timeSlot: number) => {
    const meal = isThereMeal(day, timeSlot);

    if (meal)
      return (
        <div className="absolute text-center top-0 left-0 w-full h-full flex flex-col gap-2 items-center justify-center">
          <small className="uppercase font-bold text-dark p-1 opacity-0 md:opacity-100 translate-y-3 group-hover:translate-y-0 transition-ease">
            {meal.title}
          </small>
          <span className="point md:opacity-0 group-hover:-translate-y-4 transition-ease"></span>
          <div className="flex justify-around w-full">
            <button
              type="button"
              onClick={(e) => handleDelete(e, meal)}
              className=" top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
            >
              <FaTrash className="text-red-500" />
            </button>

            <button
              onClick={(e) => handleViewRecipe(e, meal)}
              // href={`/custom-recipe/${meal.recipeId}`}
              className=" top-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
            >
              <AiFillEye className="text-dark" />
            </button>

            <button
              type="button"
              onClick={(e) => handleCopy(e, meal)}
              className=" bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
            >
              <FaCopy className="text-dark" />
            </button>
          </div>
        </div>
      );
    else if (copyMeal)
      return (
        <div className="text-center">
          <button
            data-tooltip-id="paste-recipe-button"
            type="button"
            onClick={(e) => handlePaste(e, day, timeSlot)}
            className="opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out"
          >
            <FaPaste className="text-dark" />
          </button>
        </div>
      );
    else return null;
  };

  return (
    <table
      id="meal-calendar-week-view-container"
      className="custom-table w-full"
    >
      <thead id="meal-calendar-week-view-week-days-header">
        <tr>
          <th></th>
          {daysInWeek.map((day, index) => (
            <th
              key={index}
              className={`w-16 h-8 ${
                day.toDateString() === todayDate.toDateString()
                  ? "bg-extra [&>*:nth-child(1)]:text-medium"
                  : "bg-light"
              } border-2 border-dark/70 sticky top-[140px] z-10`}
            >
              <p>{day.getDate()}</p>
            </th>
          ))}
        </tr>
      </thead>
      <tbody id="meal-calendar-week-view-body">
        {hours.map((timeSlot, timeSlotIndex) => (
          <tr id="meal-calendar-week-view-rows" key={timeSlot}>
            <th
              id="meal-calendar-week-view-timeslots-header"
              className="border-2 border-dark/70 w-16 h-32 bg-light"
            >
              <p>
                {timeSlot === 0
                  ? "12 AM"
                  : timeSlot < 12
                  ? `${timeSlot} AM`
                  : timeSlot === 12
                  ? "12 PM"
                  : `${timeSlot - 12} PM`}
              </p>
            </th>
            {daysInWeek.map((day, dayIndex) => (
              <td
                id="meal-calendar-week-view-cell"
                key={`${timeSlot}-${dayIndex}`}
                className={`group relative table-cell cursor-pointer ${
                  isThereMeal(day, timeSlot) ? "bg-light" : "bg-light/50"
                } border-2 border-dark/70 hover:bg-light transition-ease`}
                onClick={() => handleCellClick(dayIndex, timeSlotIndex)}
              >
                {renderMealSummary(day, timeSlot)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WeekView;
