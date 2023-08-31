import React from "react";

type Props = {
  data: [
    {
      name: string;
      amount: number;
      unit: string;
      percentOfDailyNeeds: number;
    }
  ];
};

const LIMITNUTRIENT = [
  "Calories",
  "Fat",
  "Saturated Fat",
  "Carbohydrates",
  "Sugar",
  "Cholesterol",
  "Sodium",
];

const NutrientBreakdown = ({ data }: Props) => {
  // Variables
  const badNutrients = data.filter((nutrient) =>
    LIMITNUTRIENT.includes(nutrient.name)
  );
  const goodnutrients = data.filter(
    (nutrient) =>
      !LIMITNUTRIENT.includes(nutrient.name) &&
      nutrient.name !== "Net Carbohydrates"
  );

  return (
    <div className="flex flex-col gap-5 ml-2">
      <ul className="flex flex-col gap-2">
        <h4 className="text-error">Limit These Daily</h4>
        {badNutrients.map((nutrient, index) => (
          <li key={index} className="flex flex-col">
            <div className="flex items-center">
              <p className="flex-[0_0_120px]">{nutrient.name}</p>
              <small className="flex-[0_0_120px] flex-shrink">{`${nutrient.amount} ${nutrient.unit}`}</small>
              <small className="flex-[0_0_120px]">
                {nutrient.percentOfDailyNeeds}%
              </small>
            </div>
            <div className="w-full h-5">
              <div
                className="bg-error h-full"
                style={{
                  width: nutrient.percentOfDailyNeeds.toString() + "px",
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-2">
        <h4 className="text-success">Get Enough of These Daily</h4>
        {goodnutrients.map((nutrient, index) => (
          <li key={index} className="flex flex-col">
            <div className="flex items-center">
              <p className="flex-[0_0_120px]">{nutrient.name}</p>
              <small className="flex-[0_0_120px] flex-shrink">{`${nutrient.amount} ${nutrient.unit}`}</small>
              <small className="flex-[0_0_120px]">
                {nutrient.percentOfDailyNeeds}%
              </small>
            </div>
            <div className="w-full h-5">
              <div
                className="bg-success h-full"
                style={{
                  width: nutrient.percentOfDailyNeeds.toString() + "px",
                }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NutrientBreakdown;
