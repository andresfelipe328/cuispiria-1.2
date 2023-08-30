import React from "react";

import { FaHeart } from "react-icons/fa";

const SaveButton = () => {
  return (
    <button type="button" className="absolute right-2 top-14 button ">
      <FaHeart className="icon" />
    </button>
  );
};

export default SaveButton;
