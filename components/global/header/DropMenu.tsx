"use client";

import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { FaTimes } from "react-icons/fa";
import { BsListUl } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { GiBubblingBowl } from "react-icons/gi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { BiSolidDashboard } from "react-icons/bi";

import CollapseAnimLayout from "@/components/layouts/CollapseAnimLayout";
import Backdrop from "@/components/layouts/Backdrop";
import SignedUser from "./userAuth/SignedUser";
import NotSignedUser from "./userAuth/NotSignedUser";

const NAVLINKS = [
  {
    icon: BiSolidDashboard,
    href: "/",
    text: "home",
  },
  {
    icon: GiBubblingBowl,
    href: "/search-recipe",
    text: "search",
  },
  {
    icon: AiTwotoneCalendar,
    href: "/meal-planning",
    text: "planning",
  },
  {
    icon: BsListUl,
    href: "/your-recipes",
    text: "your recipes",
  },
  {
    icon: IoMdSettings,
    href: "/settings",
    text: "settings",
  },
];

type Props = {
  show: boolean;
  setShow: Function;
};

const DropMenu = ({ show, setShow }: Props) => {
  // Variables
  const session = useSession();

  // Handle closing of drop menu on window resize
  const handleDroNav = useCallback(() => {
    const windowSize = window.innerWidth;
    if (show && windowSize > 767) setShow(!show);
  }, [show, setShow]);

  // Resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleDroNav);

    return () => window.removeEventListener("resize", handleDroNav);
  }, [handleDroNav]);

  return (
    <Backdrop>
      <CollapseAnimLayout style="modal-nav">
        <button
          id="drop-down-close-button"
          onClick={() => setShow(!show)}
          className="group absolute top-6 right-1 back"
        >
          <FaTimes className="icon" />
        </button>

        <ul id="drop-down-nav-links" className="flex flex-col gap-5">
          {NAVLINKS.map((link, index) => (
            <Link
              key={index}
              href={link.href}
              className="group flex items-center gap-4"
            >
              <link.icon className="icon transition-ease" />
              <small className="text-dark group-hover:text-extra transition-ease">
                {link.text}
              </small>
            </Link>
          ))}
        </ul>

        <div
          id="drop-down-auth-controller"
          className="absolute bottom-10 right-5 flex items-center gap-2"
        >
          {session.data ? <SignedUser /> : <NotSignedUser />}
        </div>
      </CollapseAnimLayout>
    </Backdrop>
  );
};

export default DropMenu;
