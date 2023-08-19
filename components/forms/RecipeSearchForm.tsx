"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { GrPowerReset } from "react-icons/gr";

import { Filter } from "@/utils/types";
import RecipeSearchFilters from "../pages/recipeSearch/RecipeSearchFilters";

const RecipeSearchForm = () => {
  // Variables
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [searchInput, setSearchInput] = useState("");

  const handleRecipeSearch = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("searching for recipe...");
  };

  return (
    <>
      <AnimatePresence initial={false} mode="wait">
        {show && (
          <RecipeSearchFilters
            filters={filters}
            setFilters={setFilters}
            show={show}
            setShow={setShow}
          />
        )}
      </AnimatePresence>

      <form
        id="recipe-search-form"
        onSubmit={handleRecipeSearch}
        className="flex flex-col items-center justify-center gap-5 "
      >
        <div className="w-full flex items-center justify-center gap-5 ">
          <input
            id="search-recipe-input"
            type="text"
            placeholder="recipe"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full md:w-1/2"
          />

          <button
            type="button"
            className="relative button"
            onClick={() => setShow(!show)}
            disabled={searchInput ? false : true}
          >
            {filters.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-light w-6 h-6 rounded-3xl grid place-content-center shadow-m animate-bounce">
                <small>{filters.length}</small>
              </span>
            )}
            <p className="text-button">filters</p>
          </button>
          {filters.length > 0 && (
            <button onClick={() => setFilters([])} className="button">
              <GrPowerReset className="icon" />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default RecipeSearchForm;
