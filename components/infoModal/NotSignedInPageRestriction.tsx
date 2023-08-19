import React from "react";

import { FaInfoCircle } from "react-icons/fa";

const NotSignedInPageRestriction = () => {
  return (
    <div
      id="main-container-tooltip"
      className="w-full flex justify-center my-5"
    >
      <div id="container-tooltip" className="bg-info rounded-md shadow-s">
        <div
          id="tooltip-header"
          className="flex items-center gap-2 bg-dark px-4 py-1 rounded-t-md"
        >
          <FaInfoCircle className="icon text-light" />
          <h3>Note</h3>
        </div>
        <p id="tooltip-info" className="leading-loose p-4 ">
          When not logged in, you may only look up recipes.
          <br />
          Please{" "}
          <span className="bg-extra p-2 rounded-md shadow-s text-button">
            login
          </span>{" "}
          to experience all functionalities.
        </p>
      </div>
    </div>
  );
};

export default NotSignedInPageRestriction;
