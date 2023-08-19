import React from "react";
import { BiTimeFive } from "react-icons/bi";

import { MdAttachMoney } from "react-icons/md";
import { FaHeart, FaImage } from "react-icons/fa";
import { BiSolidTachometer } from "react-icons/bi";
import { BsFillHeartPulseFill } from "react-icons/bs";

type Props = {
  saved: boolean;
};

const RecipeOverview = ({ saved }: Props) => {
  return (
    <div id="recipe-overview-container" className="group/container">
      <div className="relative w-full h-40 bg-light/70 rounded-lg flex items-center justify-center group-hover/container:shadow-m transition-all duration-200">
        {!saved && (
          <button className="absolute right-2 top-2 group/fav p-2 bg-medium rounded-lg">
            <FaHeart className="icon text-base group-hover/fav:text-red-500" />
          </button>
        )}
        <FaImage className="text-6xl text-dark group-hover/container:scale-110 transition-all duration-200 ease-in-out" />
      </div>

      <div className="flex flex-col gap-2 rounded-md p-2 group-hover/container:-translate-y-2 group-hover/container:mx-2 group-hover/container:bg-medium group-hover/container:shadow-l transition-all duration-200 ease-in-out">
        <div className="flex items-center justify-between">
          <h3 className="text-dark">Recipe Name</h3>
          <div className="flex items-center gap-2">
            <BiTimeFive className="icon text-extra" />
            <small>25 min</small>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <BiSolidTachometer className="icon" />
            <small>85%</small>
          </div>
          <div className="flex items-center gap-2">
            <BsFillHeartPulseFill className="icon" />
            <small>55%</small>
          </div>
          <div className="flex items-center ml-auto">
            <MdAttachMoney className="icon" />
            <small>68.37</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeOverview;
