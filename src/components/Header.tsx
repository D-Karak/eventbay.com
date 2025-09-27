import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../images/logo.png";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import SearchBar from "./SearchBar";
const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="flex flex-col lg:flex-row items-center gap-4 p-4">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <Link href="/" className="font-bold shrink-0">
            <Image
              src={logo}
              alt="EventBay Logo"
              width={100}
              height={100}
              className="w-20 lg:w-18"
            ></Image>
          </Link>
          <div className="lg:hidden">
            <SignedIn>
            <div className="inline-block ml-6 mr-5">
              <UserButton
                appearance={{
                   elements: {
                    rootBox: {
                      width: "38px",
                      height: "38px",
                    },
                    avatarBox: {
                      width: "38px",
                      height: "38px",
                    },
                  },
                }}
              />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton>
                <button className="font-medium text-sm text-foreground border-2 border-primary py-2 px-3.5 rounded-full 
                hover:scale-105   transition-all duration-200
                 cursor-pointer">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
        {/* searchBar */}
        <div className="w-full lg:max-w-2xl">
          <SearchBar />
        </div>

        {/* Desktop action buttons */}
        <div className="hidden  ml-auto lg:flex lg:items-center lg:justify-center">
          <SignedIn>
            <Link href="/mytickets">
              <button className="text-sm text-foreground border-2 border-primary py-2 px-3 rounded-full hover:bg-primary font-medium hover:text-white cursor-pointer transition-colors duration-200">
                My Tickets
              </button>
            </Link>
            <Link href="seller">
              <button className="ml-4 text-sm text-foreground border-2 border-primary py-2 px-3 rounded-full hover:bg-primary font-medium hover:text-white cursor-pointer transition-colors duration-200">
                Sell Tickets
              </button>
            </Link>
            <div className="inline-block ml-6 mr-5">
              <UserButton
                appearance={{
                  elements: {
                    rootBox: {
                      width: "38px",
                      height: "38px",
                    },
                    avatarBox: {
                      width: "38px",
                      height: "38px",
                    },
                  },
                }}
              />
            </div>
          </SignedIn>
        </div>
        {/* Mobile action buttons */}
        <SignedIn>
            <div className="flex lg:hidden w-full gap-3 items-center">
                <Link href="/mytickets" className="flex-1">
              <button className="text-sm w-full text-foreground border-2 border-primary py-2 px-3 rounded-full hover:bg-primary font-medium hover:text-white cursor-pointer transition-colors duration-200">
                My Tickets
              </button>
            </Link>
            <Link href="seller" className="flex-1">
              <button className="text-sm w-full text-foreground border-2 border-primary py-2 px-3 rounded-full hover:bg-primary font-medium hover:text-white cursor-pointer transition-colors duration-200">
                Sell Tickets
              </button>
            </Link>
            </div>
        </SignedIn>

      </div>
    </header>
  );
};

export default Header;
