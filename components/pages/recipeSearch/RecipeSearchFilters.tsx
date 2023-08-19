"use client";

import React from "react";

import { FaTimes } from "react-icons/fa";
import { BsCheckLg } from "react-icons/bs";

import CollapseAnimLayout from "@/components/layouts/CollapseAnimLayout";
import Backdrop from "@/components/layouts/Backdrop";
import { COURSE, CUISINE, DIET, SORT } from "@/utils/filtering";
import { Filter } from "@/utils/types";

type Props = {
  show: boolean;
  setShow: Function;
  filters: Filter[];
  setFilters: Function;
};

const RecipeSearchFilters = ({ show, setShow, filters, setFilters }: Props) => {
  const handleAddFilter = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string,
    group: string
  ) => {
    const isGroupFilled = filters.find((filter) => filter.group === group);

    if (isGroupFilled) {
      const isSameTitle = isGroupFilled.title === title;
      if (isSameTitle) {
        setFilters(filters.filter((filter) => isGroupFilled !== filter));
      } else e.target.checked = false;
    } else {
      setFilters([
        ...filters,
        {
          group,
          title,
        },
      ]);
    }
  };

  const handleAddSort = (
    e: React.ChangeEvent<HTMLInputElement>,
    title: string,
    group: string
  ) => {
    const isGroupFilled = filters.find((filter) => filter.group === group);
    if (isGroupFilled) {
      const isSameTitle = isGroupFilled.title === title;
      if (isSameTitle) {
        setFilters(filters.filter((filter) => isGroupFilled !== filter));
        e.target.checked = false;
      } else {
        setFilters([
          ...filters,
          {
            group,
            title,
          },
        ]);
      }
    } else
      setFilters([
        ...filters,
        {
          group,
          title,
        },
      ]);
  };

  const handleConfirmFilters = () => {
    setShow(!show);
  };

  const handleIsChecked = (title: string, group: string) => {
    const isGroupFilled = filters.find((filter) => filter.title === title);

    if (isGroupFilled?.title === title) return true;
    else return false;
  };

  return (
    <Backdrop>
      <CollapseAnimLayout style="modal-filter">
        <div
          id="filters-header-container"
          className="sticky top-0 bg-dark rounded-tl-md p-2"
        >
          <button
            id="drop-down-close-button"
            onClick={() => setShow(!show)}
            className="group absolute top-3 right-2 back"
          >
            <FaTimes className="icon text-light" />
          </button>
          <h2>Search Filters</h2>
        </div>

        <ul id="filters-contents" className="flex flex-col gap-2 p-4">
          <li id="filter-course-container" className="flex flex-col gap-2">
            <h3>Course</h3>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {COURSE.map((course, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <label>
                    <input
                      type="checkbox"
                      name={`input-${course.text}`}
                      id={`input-${course.text}`}
                      className="hidden peer"
                      onChange={(e) =>
                        handleAddFilter(e, course.text, "COURSE")
                      }
                      checked={handleIsChecked(course.text, "COURSE")}
                    />
                    <div className="group filter-checkbox">
                      <BsCheckLg className="text-base text-extra" />
                    </div>
                  </label>
                  <p className="font-semibold">{course.text}</p>
                </div>
              ))}
            </ul>
          </li>

          <li id="filter-cuisine-container" className="flex flex-col gap-2">
            <h3>Cuisine</h3>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {CUISINE.map((cuisine, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <label>
                    <input
                      type="checkbox"
                      name={`input-${cuisine.text}`}
                      id={`input-${cuisine.text}`}
                      className="hidden peer"
                      onChange={(e) =>
                        handleAddFilter(e, cuisine.text, "CUISINE")
                      }
                      checked={handleIsChecked(cuisine.text, "CUISINE")}
                    />
                    <div className="group filter-checkbox">
                      <BsCheckLg className="text-base text-extra" />
                    </div>
                  </label>
                  <p className="font-semibold">{cuisine.text}</p>
                </div>
              ))}
            </ul>
          </li>

          <li id="filter-diet-container" className="flex flex-col gap-2">
            <h3>Diet</h3>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {DIET.map((diet, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <label>
                    <input
                      type="checkbox"
                      name={`input-${diet.text}`}
                      id={`input-${diet.text}`}
                      className="hidden peer"
                      onChange={(e) => handleAddFilter(e, diet.text, "DIET")}
                      checked={handleIsChecked(diet.text, "DIET")}
                    />
                    <div className="group filter-checkbox">
                      <BsCheckLg className="text-base text-extra" />
                    </div>
                  </label>
                  <p className="font-semibold">{diet.text}</p>
                </div>
              ))}
            </ul>
          </li>

          <li id="filter-sort-container" className="flex flex-col gap-2">
            <h3>Sort</h3>
            <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
              {SORT.map((sort, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <label>
                    <input
                      type="checkbox"
                      name={`input-${sort.text}`}
                      id={`input-${sort.text}`}
                      className="hidden peer"
                      onChange={(e) => handleAddSort(e, sort.text, "SORT")}
                      checked={handleIsChecked(sort.text, "SORT")}
                    />
                    <div className="group filter-checkbox">
                      <BsCheckLg className="text-base text-extra" />
                    </div>
                  </label>
                  <p className="font-semibold">{sort.text}</p>
                </div>
              ))}
            </ul>
          </li>
        </ul>

        <button
          onClick={handleConfirmFilters}
          className="button my-4 mx-auto w-[90%] md:w-1/2"
        >
          <p className="text-button w-full text-center">Apply Filters</p>
        </button>
      </CollapseAnimLayout>
    </Backdrop>
  );
};

export default RecipeSearchFilters;
