const dayjs = require("dayjs");

const MEAL_WINDOWS = [
  { mealType: "breakfast", label: "Breakfast", startHour: 7, endHour: 10 },
  { mealType: "lunch", label: "Lunch", startHour: 12, endHour: 15 },
  { mealType: "dinner", label: "Dinner", startHour: 19, endHour: 22 },
];

function getCurrentMealType(now = new Date()) {
  const d = dayjs(now);
  const hour = d.hour();
  const window = MEAL_WINDOWS.find((w) => hour >= w.startHour && hour < w.endHour);
  return window ? window.mealType : null;
}

function getMealWindows() {
  return MEAL_WINDOWS;
}

module.exports = { getCurrentMealType, getMealWindows, MEAL_WINDOWS };
