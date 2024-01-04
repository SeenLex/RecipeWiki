"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, getDocs, query } from "firebase/firestore";
import Card from "../components/cards/Card";

const FavouritesPage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [favoritesId, setFavoritesId] = useState([]);
  const [favorites, setFavorites] = useState(null);
  const [refreshFavorites, setRefreshFavorites] = useState(true);

  const getFavoritesId = async () => {
    if (!user) return;
    const document = doc(db, "favourites", user.email);
    const documentSnap = await getDoc(document);
    const favoritesIdArray = documentSnap.exists() ? documentSnap.data() : [];
    setFavoritesId(Object.values(favoritesIdArray));
  };

  const baseLink = "https://api.edamam.com/api/recipes/v2";
  const app_id = "77ab4532";
  const app_key = "9b2df32292418d119f55ecb45f2d48d3";

  const getCard = async (id) => {
    const response = await fetch(
      `${baseLink}/${id}?` +
        new URLSearchParams({
          app_id: app_id,
          app_key: app_key,
          type: "public",
        }),
      {
        method: "GET",
      }
    );
    try {
      const recipe = await response.json();
      return recipe.recipe;
    } catch (e) {
      console.log(e);
    }
  };

  const getCards = async () => {
    if (!favoritesId) return;
    const favoritesArray = [];
    for (const id of favoritesId) {
      const recipe = await getCard(id);
      favoritesArray.push(recipe);
    }
    setFavorites(favoritesArray);
  };

  useEffect(() => {
    getFavoritesId();
  }, [user]);

  useEffect(() => {
    getCards();
  }, [favoritesId]);

  if (favorites && favorites.length > 0) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">My favorites</h1>
          <div className="grid grid-cols-4 gap-12">
            {favorites.map((card, i) => (
              <Card
                key={`card-${i}`}
                card={card}
                user={user}
                setFavoritesId={setFavoritesId}
                favoritesId={favoritesId}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  if (favorites === null) {
    return (
      <section className="py-16">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-6">My favorites</h1>
          <div className="flex justify-center py-12">
            <div>
              <div role="status">
                <svg
                  aria-hidden="true"
                  class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-6">My favorites</h1>
        <div className="grid grid-cols-4 gap-12">
          <div className="col-span-4">
            <p>No favorites found</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FavouritesPage;
