import React from "react";

import { CustomRecipe, Slot } from "@/utils/types";

import { FaTimes } from "react-icons/fa";

import Backdrop from "@/components/layouts/Backdrop";
import CollapseAnimLayout from "@/components/layouts/CollapseAnimLayout";
import CreateMealForm from "@/components/forms/CreateRecipeForm";

type Props = {
  meals: CustomRecipe[];
  setMeals: Function;
  show: boolean;
  setShow: Function;
  selectedSlot: Slot;
};

const CreateMealModal = ({
  meals,
  setMeals,
  selectedSlot,
  show,
  setShow,
}: Props) => {
  return (
    <Backdrop>
      <CollapseAnimLayout style="modal-create-meal">
        <div
          id="create-meal-header-container"
          className="sticky top-0 bg-dark rounded-tl-md p-2"
        >
          <button
            id="drop-down-close-button"
            onClick={() => setShow(!show)}
            className="group absolute top-3 right-2 back"
          >
            <FaTimes className="icon text-light" />
          </button>
          <h2>Create A Meal</h2>
        </div>

        <CreateMealForm
          meals={meals}
          setMeals={setMeals}
          setShow={setShow}
          show={show}
          selectedSlot={selectedSlot}
        />
      </CollapseAnimLayout>
    </Backdrop>
  );
};

export default CreateMealModal;
