"use client";

import React from "react";

import { CustomRecipe } from "@/utils/types";

import { FaHeart } from "react-icons/fa";
import { useSession } from "next-auth/react";

type Props = {
  recipe: string;
};

const SaveButton = ({ recipe }: Props) => {
  // Variables
  const session = useSession();

  const handleSaveRecipe = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/save-recipe`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          session: session,
          recipe: recipe,
        }),
      }
    );

    const { message, code, data } = await res.json();
  };

  return (
    <button onClick={handleSaveRecipe} type="button" className="button">
      <FaHeart className="icon" />
    </button>
  );
};

export default SaveButton;
