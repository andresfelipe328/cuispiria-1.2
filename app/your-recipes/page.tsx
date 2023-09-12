import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import { getAllSavedRecipes } from "@/utils/mongoHelper";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import CustomRecipes from "@/components/pages/yourRecipes/CustomRecipes";
import Recipes from "@/components/pages/yourRecipes/Recipes";
import { SavedRecipe } from "@/utils/types";

export const metadata: Metadata = {
  title: "Cuispiria - Your Recipes",
  description: "List of all your saved and custom recipes",
};

const getYourRecipes = async (session: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/get-your-recipes`,
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        session: session,
      }),
    }
  );

  const { message, code, data } = await res.json();
  return JSON.parse(data);
};

const page = async () => {
  // Variables
  const session = await getServerSession(authOptions);
  if (!session) redirect("/search-recipe");

  const allRecipes: SavedRecipe[] = await getYourRecipes(session);
  const customRecipes = allRecipes.filter((recipe) => recipe.customed);
  const appRecipes = allRecipes.filter((recipe) => !recipe.customed);

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-5 p-4">
        <h2 className="bg-dark w-fit px-5 py-2 shadow-s">Your Recipes</h2>

        <CustomRecipes allRecipes={JSON.stringify(customRecipes)} />
        <Recipes allRecipes={JSON.stringify(appRecipes)} />
      </div>
    </BasicAnimLayout>
  );
};

export default page;
