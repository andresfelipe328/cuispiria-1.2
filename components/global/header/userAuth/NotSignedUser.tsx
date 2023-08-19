"use client";

import React from "react";
import { signIn } from "next-auth/react";

import { TiUser } from "react-icons/ti";

const NotSignedUser = () => {
  // Login user
  const handleLogin = () => {
    signIn("google", {
      redirect: true,
      callbackUrl: "/",
    });
  };

  return (
    <>
      <div
        id="user-logo-placeholder"
        className="rounded-full bg-extra border-4 border-light shadow-small"
      >
        <TiUser className="text-5xl icon" />
      </div>

      <button id="login-button" onClick={handleLogin} className="button">
        <p className="text-button">login</p>
      </button>
    </>
  );
};

export default NotSignedUser;
