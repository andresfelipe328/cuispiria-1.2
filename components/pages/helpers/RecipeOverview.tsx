import React from "react";
import Link from "next/link";
import Image from "next/image";

import { RecipeOverview as Recipe } from "@/utils/types";

import { AiFillLike } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import { MdAttachMoney } from "react-icons/md";
import { FaHeart, FaImage } from "react-icons/fa";
import { BsFillHeartPulseFill } from "react-icons/bs";

type Props = {
  saved: boolean;
  recipe: Recipe;
};

const RecipeOverview = ({ saved, recipe }: Props) => {
  return (
    <Link
      href={`/${recipe.customed ? "custom-recipe" : "recipe"}/${
        recipe.id || recipe.recipeId
      }`}
      id="recipe-overview-container"
      className="group/container"
    >
      <div className="relative w-full h-40 bg-light/70 rounded-lg flex items-center justify-center group-hover/container:shadow-m transition-ease overflow-hidden">
        {recipe.image && recipe.image.length > 0 ? (
          <Image
            src={recipe.image!}
            alt="recipe image"
            fill={true}
            sizes="100%"
            priority
            className="object-cover group-hover/container:scale-105 transition-ease"
          />
        ) : (
          <FaImage className="text-6xl text-dark group-hover/container:scale-110 transition-ease" />
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-md p-2 group-hover/container:-translate-y-2 group-hover/container:mx-2 group-hover/container:bg-medium group-hover/container:shadow-l transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-dark truncate">{recipe.title}</h3>
          <div className="flex items-center gap-2">
            <BiTimeFive className="icon text-extra" />
            <small>{recipe.readyInMinutes} min</small>
          </div>
        </div>

        {!recipe.customed && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <AiFillLike className="icon" />
              <small>{recipe.aggregateLikes}</small>
            </div>
            <div className="flex items-center gap-2">
              <BsFillHeartPulseFill className="icon" />
              <small>{recipe.healthScore}%</small>
            </div>
            {/* <div className="flex items-center ml-auto">
              <MdAttachMoney className="icon" />
              <small>{recipe.pricePerServing}</small>
            </div> */}
          </div>
        )}
        {recipe.timeSlot && (
          <small>
            {" "}
            meal at{" "}
            {recipe.timeSlot === 0
              ? "12 AM"
              : recipe.timeSlot < 12
              ? `${recipe.timeSlot} AM`
              : recipe.timeSlot === 12
              ? "12 PM"
              : `${recipe.timeSlot - 12} PM`}
          </small>
        )}
      </div>
    </Link>
  );
};

export default RecipeOverview;
