import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";

const page = async () => {
  // Variables
  const session = await getServerSession(authOptions);
  if (!session) redirect("/search-recipe");

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-2 p-4">
        <h2>Settings</h2>
      </div>
    </BasicAnimLayout>
  );
};

export default page;
