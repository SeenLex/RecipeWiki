"use client";

import React, { useEffect, useState } from "react";
import logo from "../../assets/navbarlogo.png";
import { Searchbar } from "../searchbar/Searchbar";
import Image from "next/image";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";

export const Navbar = ({ callBack }) => {
  const [input, setInput] = useState("");
  const [user, loading, error] = useAuthState(auth);

  return (
    <nav className="navbar flex items-center justify-between bg-[#FFEECC] h-26 px-4 py-5 sticky top-0 z-10 border-b border-gray-100 shadow">
      <div className="flex items-center gap-10">
        <Link href="/">
          <h2 className="navbar-content">
            <Image alt="Recipe" className="max-w-[110px]" src={logo} />
          </h2>
        </Link>
        <Link href="/" className="hover:text-orange-400">
          Home
        </Link>
        {user && (
          <Link href="/my-recipes" className="hover:text-orange-400">
            My Recipes
          </Link>
        )}
        {user && (
          <Link href="/favourites" className=" hover:text-orange-400">
            Favourites
          </Link>
        )}
        <Link href="/about" className=" hover:text-orange-400">
          About
        </Link>
      </div>
      {user ? (
        <div className="flex items-center gap-4">
          <div>
            <div className="border border-black rounded-full w-10 aspect-square flex items-center justify-center">
              {user.email[0]?.toUpperCase()}
            </div>
          </div>

          <button
            onClick={() => {
              auth.signOut();
            }}
            className="navbar-button px-4 py-2 border rounded-md border-gray-600 hover:bg-orange-400 hover:text-white"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-4">
          <Link
            href="login"
            className="navbar-button px-4 py-2 border rounded-md border-gray-600 hover:bg-orange-500 hover:text-white"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
};
