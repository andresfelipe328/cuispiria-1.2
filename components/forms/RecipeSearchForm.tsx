"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

import { GrPowerReset } from "react-icons/gr";

import { Filter, RecipeOverview } from "@/utils/types";
import RecipeSearchFilters from "../pages/recipeSearch/RecipeSearchFilters";

type FormValues = {
  searchRecipeInput: string;
};

type Props = {
  setRecipesList: Function;
  recipesList: RecipeOverview[];
  setLoading: Function;
};

const RecipeSearchForm = ({
  recipesList,
  setRecipesList,
  setLoading,
}: Props) => {
  // Variables
  const [show, setShow] = useState(false);
  const [filters, setFilters] = useState<Filter[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<FormValues>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/get-recipes`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            searchRecipeInput: searchParams.get("query"),
            filters,
            offset: recipesList.length,
          }),
        }
      );

      // const { message, code, data } = await res.json();
      res.json().then(({ message, code, data }) => {
        setLoading(false);
        setRecipesList((prev: RecipeOverview[]) => [
          ...prev,
          ...JSON.parse(data),
        ]);
      });
    };

    if (searchParams.get("query")) {
      setLoading(true);
      fetchRecipes();
    }
  }, []);

  const handleRecipeSearch = async (formData: FormValues) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/get-recipes`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          filters,
          offset: recipesList.length,
        }),
      }
    );

    const { message, code, data } = await res.json();
    setRecipesList(JSON.parse(data));
    router.push(`/search-recipe?query=${formData.searchRecipeInput}`);
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
        onSubmit={handleSubmit(handleRecipeSearch)}
        className="flex flex-col items-center justify-center gap-5 "
        autoComplete="off"
      >
        <div className="w-full flex items-center justify-center gap-5 ">
          <input
            id="search-recipe-input"
            type="text"
            placeholder="search recipes..."
            {...register("searchRecipeInput", {
              required: "recipe search is required",
            })}
            className="w-full md:w-1/2"
          />

          <button
            type="button"
            className="relative button"
            onClick={() => setShow(!show)}
          >
            {filters.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-light w-6 h-6 rounded-3xl grid place-content-center shadow-m animate-bounce">
                <small>{filters.length}</small>
              </span>
            )}
            <p className="text-button">filters</p>
          </button>
          {filters.length > 0 && (
            <button
              type="button"
              onClick={() => setFilters([])}
              className="button"
            >
              <GrPowerReset className="icon" />
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default RecipeSearchForm;
