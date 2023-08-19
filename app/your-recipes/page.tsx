import React from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import CustomRecipes from "@/components/pages/yourRecipes/CustomRecipes";
import Recipes from "@/components/pages/yourRecipes/Recipes";

export const metadata: Metadata = {
  title: "Cuispiria - Your Recipes",
  description: "List of all your saved and custom recipes",
};

const page = async () => {
  // Variables
  const session = await getServerSession(authOptions);
  if (!session) redirect("/search-recipe");

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-5 p-4">
        <h2 className="bg-dark w-fit px-5 py-2 shadow-s">Your Recipes</h2>

        <CustomRecipes />
        <Recipes />
      </div>
    </BasicAnimLayout>
  );
};

export default page;
