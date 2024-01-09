import React from "react";
import { MyFavourites } from "../my-favourites/MyFavourites";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase";

export const Sidebar = () => {
  const [user, loading, error] = useAuthState(auth);
  return (
    <div className="col-span-2 max-w-[240px] py-6 px-4 bg-gradient-to-t from-orange-100 to-orange-300 min-h-[calc(100vh-81px)]">
      <div className="sidebar-items sticky top-[calc(81px+24px)]">
        {auth.currentUser && <MyFavourites />}
      </div>
    </div>
  );
};
