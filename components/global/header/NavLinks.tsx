"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BiSolidDashboard } from "react-icons/bi";
import { AiTwotoneCalendar } from "react-icons/ai";
import { GiBubblingBowl } from "react-icons/gi";
import { IoMdSettings } from "react-icons/io";
import { BsListUl } from "react-icons/bs";

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
    text: "recipes",
  },
  {
    icon: IoMdSettings,
    href: "/settings",
    text: "settings",
  },
];

const NavLinks = () => {
  const currPath = usePathname();

  return (
    <ul
      id="header-nav"
      className="scale-0 hidden md:scale-100 origin-top flex-1 animm:flex items-center justify-center gap-5 transition-ease"
    >
      {NAVLINKS.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="group flex flex-col items-center gap-1"
        >
          <small
            className={`text-extra scale-0 group-hover:scale-100 ${
              link.href === currPath ? "scale-100" : "scale-0"
            } origin-top transition-ease`}
          >
            {link.text}
          </small>
          <link.icon
            className={`icon -translate-y-2 ${
              link.href === currPath
                ? "translate-y-0 text-extra scale-110"
                : "-translate-y-2"
            } group-hover:translate-y-0 transition-ease`}
          />
        </Link>
      ))}
    </ul>
  );
};

export default NavLinks;
