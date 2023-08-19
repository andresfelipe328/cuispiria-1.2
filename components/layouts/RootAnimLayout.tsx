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

  // Animation
  // useLayoutEffect(() => {
  //   let ctx = gsap.context(() => {
  //     gsap.to(rootRef.current, {
  //       opacity: 1,
  //       duration: 0.25,
  //     });

  //     return () => ctx.revert();
  //   }, rootRef);
  // }, []);

  return (
    <SessionProvider>
      <main
        id="main-website-container"
        className="h-screen flex flex-col overflow-auto"
        // style={{ opacity: 0 }}
        ref={rootRef}
      >
        {children}
      </main>
    </SessionProvider>
  );
};

export default RootAnimLayout;
