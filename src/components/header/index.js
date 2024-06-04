"use client";

import { AlignJustify } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const Header = ({user, profileInfo}) => {
  
  const menuItems = [
    {
      id: 1,
      label: "Home",
      path: "/",
      show: true,
    },
    {
      id: 2,
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      id: 3,
      label: "Rigister",
      path: "/sign-up",
      show: !user,
    },
    {
      id: 4,
      label: "Jobs",
      path: "/jobs",
      show: user,
    },
    {
      id: 5,
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === "candidate",
    },
    {
      id: 6,
      label: "Membership",
      path: "/membership",
      show: user,
    },
    {
      id: 7,
      label: "Account",
      path: "/account",
      show: user,
    },
  ];
  return (
    <header className="flex h-16 w-full shrink-0 items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button className="lg:hidden">
            <AlignJustify className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <Link href={"#"} className="mr-6 hidden lg:flex">
            <h3>JOBSCO</h3>
          </Link>
          <div className="grid gap-2 py-6">
            {menuItems.map((menuItem) =>
              menuItem.show ? (
                <Link
                  href={menuItem.path}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  key={menuItem.id}
                >
                  {menuItem.label}
                </Link>
              ) : null
            )}
          </div>
        </SheetContent>
      </Sheet>
      <Link href={"/"} className="hidden lg:flex mr-6">JOBSCO</Link>
      <nav className="ml-auto hidden lg:flex gap-6">
        {
            menuItems.map((menuItem) => (
                menuItem.show ? 
                <Link href={menuItem.path} className="group inine-flex w-max items-center rounded-md px-4 py-2 bg-white text-sm font-mediumF" key={menuItem.id}>
                    {menuItem.label}
                </Link>: null
            ))
        }
        <UserButton afterSignOutUrl="/"/>
      </nav>
    </header>
  );
};

export default Header;
