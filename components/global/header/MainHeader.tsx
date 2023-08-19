import React from "react";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Burger from "./Burger";
import BasicAnimLayout from "@/components/layouts/BasicAnimLayout";
import NavLinks from "./NavLinks";
import SignedUser from "./userAuth/SignedUser";
import NotSignedUser from "./userAuth/NotSignedUser";

const MainHeader = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <BasicAnimLayout>
        <header
          id="header-container"
          className="sticky top-0 px-5 py-4 flex justify-between animm:justify-around z-50"
        >
          <div
            id="header-logo-and-name"
            className=" flex items-center justify-start gap-2"
          >
            <Image
              src="/cuispiria.svg"
              width={70}
              height={70}
              alt="app logo"
              priority
            />
            <h1 className="scale-0 md:scale-100 origin-left transition-ease">
              cuispiria
            </h1>
          </div>

          <NavLinks />

          <div
            id="header-user-and-logout"
            className="scale-0 hidden md:scale-100 origin-right animm:flex items-center justify-end gap-2 transition-ease"
          >
            {session ? <SignedUser /> : <NotSignedUser />}
          </div>
        </header>
      </BasicAnimLayout>
      <Burger />
    </>
  );
};

export default MainHeader;
