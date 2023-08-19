const handleMonthView = (selectedDate: Date) => {
  const firstDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    1
  );
  const lastDayOfMonth = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth() + 1,
    0
  );

  const daysInMonthView = [];
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startDate.getDay()); // Move back to the beginning of the week

  // Add the days from the previous month to the array
  while (startDate < firstDayOfMonth) {
    daysInMonthView.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  // Add the days from the current month to the array
  while (startDate <= lastDayOfMonth) {
    daysInMonthView.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  // Add the days from the next month to the array to fill up the remaining rows
  while (daysInMonthView.length < 35) {
    daysInMonthView.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }
  return daysInMonthView;
};

const handleWeekView = (selectedDate: Date) => {
  const firstDayOfWeek = new Date(selectedDate);
  firstDayOfWeek.setDate(firstDayOfWeek.getDate() - selectedDate.getDay());

  const daysInWeek = [];
  const startDate = new Date(firstDayOfWeek);

  for (let i = 0; i < 7; i++) {
    daysInWeek.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return daysInWeek;
};

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export { handleMonthView, handleWeekView, MONTHS, DAYS };
