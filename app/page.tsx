import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Cuispiria - Home",
  description: "Recepies & Recepie Management App",
};

export default async function Home() {
  // Variables
  const session = await getServerSession(authOptions);
  if (!session) redirect("/search-recipe");

  return (
    <BasicAnimLayout>
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col gap-2 p-4">
        <h2>Dashboard</h2>
      </div>
    </BasicAnimLayout>
  );
}
