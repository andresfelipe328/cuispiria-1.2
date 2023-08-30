import React from "react";

import { AiFillCalendar } from "react-icons/ai";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

type Props = {
  selectedDate: Date;
  setSelectedDate: Function;
  viewType: string;
  setViewType: Function;
};

const VIEWS = [
  {
    text: "month",
  },
  {
    text: "week",
  },
  {
    text: "day",
  },
];

const CalendarHeader = ({
  selectedDate,
  setSelectedDate,
  viewType,
  setViewType,
}: Props) => {
  const handlePrev = () => {
    setSelectedDate((prevDate: Date) => {
      const newDate = new Date(prevDate);
      if (viewType === "month") newDate.setMonth(newDate.getMonth() - 1);
      else if (viewType === "week") newDate.setDate(newDate.getDate() - 7);
      else if (viewType === "day") newDate.setDate(newDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNext = () => {
    setSelectedDate((prevDate: Date) => {
      const newDate = new Date(prevDate);
      if (viewType === "month") newDate.setMonth(newDate.getMonth() + 1);
      else if (viewType === "week") newDate.setDate(newDate.getDate() + 7);
      else if (viewType === "day") newDate.setDate(newDate.getDate() + 1);
      return newDate;
    });
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDateValue = event.target.value;
    const selectedDateList = selectedDateValue.split("-");
    const year = parseInt(selectedDateList[0]);
    const month = parseInt(selectedDateList[1]) - 1;
    const day = parseInt(selectedDateList[2]);

    setSelectedDate(new Date(year, month, day));
  };

  const handleViewChange = (view: string) => {
    setViewType(view);
  };

  const renderHeaderView = () => {
    if (viewType === "month") {
      return (
        <h2>
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
      );
    } else if (viewType === "week") {
      const startOfWeek = new Date(selectedDate);
      startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
      const endOfWeek = new Date(selectedDate);
      endOfWeek.setDate(endOfWeek.getDate() + (6 - endOfWeek.getDay()));
      return (
        <h2>{`${startOfWeek.toDateString()} - ${endOfWeek.toDateString()}`}</h2>
      );
    } else if (viewType === "day") {
      return <h2>{selectedDate.toDateString()}</h2>;
    }
  };

  return (
    <div
      id="meal-calendar-header"
      className="sticky top-0 flex flex-col gap-4 bg-dark shadow-s rounded-t-md p-2 z-20"
    >
      <div
        id="meal-calendar-shortcut-nav"
        className="flex items-center justify-between "
      >
        <button onClick={() => handlePrev()} className="group">
          <FaCaretLeft className="icon text-light text-2xl group-hover:-translate-x-1 transition-ease" />
        </button>
        <button onClick={() => handleToday()} className="group">
          <h2 className="text-light group-hover:text-extra group-hover:translate-y-1 transition-ease">
            Today
          </h2>
        </button>
        <button onClick={() => handleNext()} className="group">
          <FaCaretRight className="icon text-light text-2xl group-hover:translate-x-1 transition-ease" />
        </button>
      </div>

      <div
        id="meal-calendar-date-view-nav"
        className="flex items-center justify-between"
      >
        <div className="relative group">
          <input
            type="date"
            value={selectedDate.toLocaleDateString("en-CA")}
            onChange={handleDateChange}
            className="font-title group-hover:bg-extra group-hover:text-medium transition-ease"
          />
          <span className="absolute top-[.55rem] right-2 bg-main group-hover:bg-extra transition-all duration-300 ease-in-out pointer-events-none">
            <AiFillCalendar className="text-xl text-dark group-hover:text-medium transition-ease" />
          </span>
        </div>

        <div className="flex items-center gap-2">
          {VIEWS.map((view, index) => (
            <button
              key={index}
              onClick={() => handleViewChange(view.text)}
              className="group"
            >
              <h4
                className={`${
                  view.text === viewType ? "text-extra" : "text-light"
                } group-hover:text-extra transition-ease`}
              >
                {view.text}
              </h4>
            </button>
          ))}
        </div>
      </div>

      <div id="meal-calendar-date-text" className="text-center">
        {renderHeaderView()}
      </div>
    </div>
  );
};

export default CalendarHeader;
