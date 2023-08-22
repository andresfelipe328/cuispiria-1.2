import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { getAllRecipes } from "@/utils/mongoHelper";
import { authOptions } from "../api/auth/[...nextauth]/route";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import MainCalendar from "@/components/pages/mealPlanning/mealCalendar/MainCalendar";
import TodayMeals from "@/components/pages/mealPlanning/todayMeals/TodayMeals";

export const metadata: Metadata = {
  title: "Cuispiria - Meal Planning",
  description: "Plan your meals for the day",
};

const page = async () => {
  // Variables
  const session = await getServerSession(authOptions);

  if (!session) redirect("/search-recipe");

  const allRecipes = await getAllRecipes(session);

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-4 p-4">
        <h2 className="bg-dark w-fit px-5 py-2 shadow-s">Meal Planning</h2>

        <MainCalendar allRecipes={JSON.stringify(allRecipes)} />
        <TodayMeals />
      </div>
    </BasicAnimLayout>
  );
};

export default page;
