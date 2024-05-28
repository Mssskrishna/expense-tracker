"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import { Button } from "../../components/ui/button";
import Link from "next/link";
function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center">
      <Image src={"logo.svg"} width={160} height={100} alt="logo" />
      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Get Started</Button>
        </Link>
      )}
    </div>
  );
}

export default Header;
