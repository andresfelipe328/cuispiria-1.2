"use client";

import React, { useState } from "react";

import { AnimatePresence } from "framer-motion";
import { CustomRecipe, Slot } from "@/utils/types";

import CreateMealModal from "./CreateMealModal";
import CalendarHeader from "./CalendarHeader";
import MonthView from "./views/MonthView";
import WeekView from "./views/WeekView";
import DayView from "./views/DayView";

type Props = {
  allRecipes: string;
};

const MainCalendar = ({ allRecipes }: Props) => {
  // Variables
  const [meals, setMeals] = useState<CustomRecipe[]>(JSON.parse(allRecipes));
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewType, setViewType] = useState("month");
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Slot>();

  const renderCalendarView = () => {
    return (
      <div
        id="meal-calendar-view-container"
        className="calendar-view mt-1 flex-1"
      >
        {viewType === "month" && (
          <MonthView selectedDate={selectedDate} meals={meals} />
        )}
        {viewType === "week" && (
          <WeekView
            selectedDate={selectedDate}
            setSelectedSlot={setSelectedSlot}
            setShowModal={setShowModal}
            meals={meals}
            setMeals={setMeals}
          />
        )}
        {viewType === "day" && (
          <DayView
            selectedDate={selectedDate}
            setSelectedSlot={setSelectedSlot}
            setShowModal={setShowModal}
            meals={meals}
            setMeals={setMeals}
          />
        )}
      </div>
    );
  };

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {showModal && (
          <CreateMealModal
            meals={meals}
            setMeals={setMeals}
            show={showModal}
            setShow={setShowModal}
            selectedSlot={selectedSlot!}
          />
        )}
      </AnimatePresence>

      <div
        id="meal-calendar-container"
        className="flex flex-col w-full max-w-full h-[570px] px-1 overflow-auto"
      >
        <CalendarHeader
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          viewType={viewType}
          setViewType={setViewType}
        />
        {renderCalendarView()}
      </div>
    </>
  );
};

export default MainCalendar;
