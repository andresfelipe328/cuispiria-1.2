"use client";

import React, { useLayoutEffect, useRef } from "react";
import { SessionProvider } from "next-auth/react";

import { gsap } from "gsap";

type Props = {
  children: React.ReactNode;
};

const RootAnimLayout = ({ children }: Props) => {
  // Variables
  const rootRef = useRef<HTMLDivElement>(null);

  return (
    <SessionProvider>
      <main
        id="main-website-container"
        className="h-screen flex flex-col overflow-auto"
        ref={rootRef}
      >
        {children}
      </main>
    </SessionProvider>
  );
};

export default RootAnimLayout;
