"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { useForm, useFieldArray } from "react-hook-form";

import { nanoid } from "nanoid";
import {
  CustomRecipe,
  FormValues,
  Ingredient,
  Instruction,
  Slot,
} from "@/utils/types";
import { refreshPage } from "@/app/actions";

import { FaTrash } from "react-icons/fa";

type Props = {
  meals: CustomRecipe[];
  setMeals: Function;
  selectedSlot: Slot;
  setShow: Function;
  show: boolean;
};

const CreateRecipeForm = ({
  setMeals,
  meals,
  selectedSlot,
  setShow,
  show,
}: Props) => {
  // Variables
  const session: any = useSession();
  const recipeIndex = isThereMeal();
  const form = useForm<FormValues>({
    defaultValues: {
      title: meals[recipeIndex]?.title || "",
      readyInMinutes: meals[recipeIndex]?.readyInMinutes.toString() || "",
      recipeTypes: meals[recipeIndex]?.recipeTypes.toString() || "",
      recipeIngredient: meals[recipeIndex]?.recipeIngredient || [
        { ingredientId: nanoid(), ingredient: "" },
      ],
      recipeInstruction: meals[recipeIndex]?.recipeInstruction || [
        { instructionId: nanoid(), instruction: "" },
      ],
    },
  });
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = form;
  const {
    fields: fieldsIng,
    append: appendIng,
    remove: removeIng,
  } = useFieldArray({
    name: "recipeIngredient",
    control,
  });
  const {
    fields: fieldsInst,
    append: appendInst,
    remove: removeInst,
  } = useFieldArray({
    name: "recipeInstruction",
    control,
  });

  function isThereMeal() {
    const meal = meals.findIndex(
      (meal) =>
        new Date(meal.date).getDate() ===
          new Date(selectedSlot.day).getDate() &&
        meal.timeSlot === selectedSlot.timeSlot
    );

    return meal;
  }

  const handleAddRecipe = async (data: FormValues) => {
    // Variables
    const newRecipeId = nanoid();
    const { readyInMinutes, recipeTypes, ...rest } = data;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/create-custom-recipe`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          action: "create",
          prevRecipeId: meals[recipeIndex]?.recipeId,
          userId: session.data.user.id,
          recipeId: newRecipeId,
          date: new Date(selectedSlot!.day),
          timeSlot: selectedSlot!.timeSlot,
          customed: true,
          readyInMinutes: Number(readyInMinutes),
          recipeTypes: recipeTypes.split(","),
          saved: false,
          ...rest,
        }),
      }
    );

    const { message, code } = await res.json();

    if (code === 200) {
      // if recipe exists for selectedSlot, modified recipe
      if (recipeIndex > -1) {
        meals[recipeIndex] = {
          userId: session.data.user.id,
          recipeId: meals[recipeIndex].recipeId,
          date: meals[recipeIndex].date,
          timeSlot: meals[recipeIndex].timeSlot,
          customed: true,
          readyInMinutes: Number(readyInMinutes),
          recipeTypes: recipeTypes.split(","),
          saved: false,
          ...rest,
        };
        setMeals(meals);
      } else {
        setMeals([
          ...meals,
          {
            userId: session.data.user.id,
            recipeId: newRecipeId,
            date: new Date(selectedSlot!.day),
            timeSlot: selectedSlot!.timeSlot,
            customed: true,
            readyInMinutes: Number(readyInMinutes),
            recipeTypes: recipeTypes.split(","),
            saved: false,
            ...rest,
          },
        ]);
      }
      refreshPage();
      setShow(!show);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleAddRecipe)}
      className="flex flex-col gap-4 p-4"
      autoComplete="off"
    >
      <div className="flex flex-col md:flex-row justify-center gap-5">
        <div className="flex flex-col gap-2">
          <div className="w-80 max-w-80 h-40 mx-auto bg-light rounded-md"></div>
          <div className="flex flex-1 flex-col gap-2">
            <input
              type="text"
              id="recipe-title"
              className=""
              {...register("title", {
                required: "recipe title is required",
              })}
              placeholder="a well descriptive title"
            />
            {errors.title?.message && (
              <small className="bg-error text-medium rounded-md p-1">
                {errors.title?.message}
              </small>
            )}

            <input
              type="text"
              id="recipe-time-required"
              {...register("readyInMinutes", {
                required: "recipe time is required",
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: "invalid time format",
                },
              })}
              placeholder="time in minutes"
            />
            {errors.readyInMinutes?.message && (
              <small className="bg-error text-medium rounded-md p-1">
                {errors.readyInMinutes?.message}
              </small>
            )}

            <input
              type="text"
              id="recipe-types"
              {...register("recipeTypes", {
                required: "recipe type(s) is required",
                pattern: {
                  value: /^(\s*\w+(\s+\w+)*\s*)(,\s*\w+(\s+\w+)*\s*)*$/,
                  message: "invalid type(s) format",
                },
              })}
              placeholder="type(s) separated by ,"
            />
            {errors.recipeTypes && (
              <small className="bg-error text-medium rounded-md p-1">
                {errors.recipeTypes?.message}
              </small>
            )}
          </div>
        </div>

        <div className=" flex flex-col gap-2 md:h-[276px] overflow-auto md:p-2">
          <h3 className="text-dark">Ingredients:</h3>
          {fieldsIng.map((field, index) => (
            <div key={field.id} className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  id={`recipe-ingredient-${field.id}`}
                  {...register(`recipeIngredient.${index}.ingredient`, {
                    required: "at least one ingredient is required",
                    pattern: {
                      value:
                        /^(\D+\s+)+([+-]?\d+(\.\d+)?)+(\s+\w+(?![\w\d]))?$/,
                      message: "invalid ingredient format",
                    },
                  })}
                  className="flex-1"
                  placeholder="ingredient amt units"
                />

                <button
                  type="button"
                  onClick={() => removeIng(index)}
                  className="bg-dark p-2 rounded-md shadow-s hover:shadow-m transition-ease"
                >
                  <FaTrash className="text-error" />
                </button>
              </div>
              {errors.recipeIngredient?.[index]?.ingredient && (
                <small className="bg-error text-medium rounded-md p-1">
                  {errors.recipeIngredient?.[index]?.ingredient?.message}
                </small>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendIng({ ingredientId: nanoid(), ingredient: "" })
            }
            className="bg-light p-2 rounded-md w-fit mx-auto button"
          >
            <p className="text-main font-semibold">add ingredient</p>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-dark">Instructions:</h3>
        {fieldsInst.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <input
                type="text"
                id={`recipe-instruction-${field.id}`}
                {...register(`recipeInstruction.${index}.instruction`, {
                  required: "at least one instruction is required",
                })}
                className="flex-1"
                placeholder="a well descriptive instruction"
              />
              <button
                type="button"
                onClick={() => removeInst(index)}
                className="bg-dark p-2 rounded-md shadow-s hover:shadow-m transition-ease"
              >
                <FaTrash className="text-error" />
              </button>
            </div>
            {errors.recipeInstruction?.[index]?.instruction && (
              <small className="bg-error text-medium rounded-md p-1">
                {errors.recipeInstruction?.[index]?.instruction?.message}
              </small>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            appendInst({ instructionId: nanoid(), instruction: "" })
          }
          className="bg-light p-2 rounded-md w-fit mx-auto button"
        >
          <p className="text-main font-semibold">add instruction</p>
        </button>
      </div>

      <button className="w-[70%] mx-auto mt-2 disabled:opacity-50 button">
        <p className="w-full text-center">submit</p>
      </button>
    </form>
  );
};

export default CreateRecipeForm;
