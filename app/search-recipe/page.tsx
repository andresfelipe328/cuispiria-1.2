import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import NotSignedInPageRestriction from "@/components/infoModal/NotSignedInPageRestriction";
import Recipes from "@/components/pages/recipeSearch/Recipes";

export const metadata: Metadata = {
  title: "Cuispiria - Recipe Search",
  description: "Search for a recipe",
};

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-4 p-4">
        <h2 className="bg-dark w-fit px-5 py-2 shadow-s">Search Recipe</h2>

        {!session && <NotSignedInPageRestriction />}

        <Recipes />
      </div>
    </BasicAnimLayout>
  );
};

export default page;
