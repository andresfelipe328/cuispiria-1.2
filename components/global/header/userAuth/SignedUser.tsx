"use client";

import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

const SignedUser = () => {
  const { data: session, status } = useSession();

  // Logout user
  const handleLogout = () => {
    signOut();
  };

  return (
    <>
      {session && (
        <Image
          src={session!.user!.image!}
          width={50}
          height={50}
          alt="app logo"
          className="rounded-full border-4 border-extra shadow-small"
          priority
        />
      )}
      <button id="logout-button" onClick={handleLogout} className="button">
        <p className="text-button">logout</p>
      </button>
    </>
  );
};

export default SignedUser;
