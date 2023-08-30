"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";

import { BiMenuAltRight } from "react-icons/bi";

import DropMenu from "./DropMenu";

const Burger = () => {
  // Variables
  const [show, setShow] = useState(false);
  const pathmame = usePathname();

  // Close drop menu on pathname change
  useEffect(() => {
    if (show) setShow(!show);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathmame]);

  return (
    <>
      <div
        id="burger-button"
        className="scale-100 md:scale-0 absolute h-[102px] flex items-center top-0 right-5 z-50 transition-ease"
      >
        <button
          onClick={() => setShow(!show)}
          className="group p-2 bg-medium rounded-md shadow-s"
        >
          <BiMenuAltRight className="icon" />
        </button>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {show && <DropMenu show={show} setShow={setShow} />}
      </AnimatePresence>
    </>
  );
};

export default Burger;
