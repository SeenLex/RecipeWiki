import { db } from "@/app/firebase";
import { IconHeartFilled } from "@tabler/icons-react";
import { IconHeart } from "@tabler/icons-react";
import {
  deleteField,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

const Card = ({ card, user, setFavoritesId = null, favoritesId = null }) => {
  function extractIdFromUri(uri) {
    return uri.split("#recipe_").pop();
  }
  async function setFavorite() {
    const uri = extractIdFromUri(card.uri);
    let uriObject = {};
    uriObject[uri] = uri;
    const document = doc(db, "favourites", user.email);
    const documentSnapshot = await getDoc(document);
    if (!documentSnapshot.exists()) {
      await setDoc(doc(db, "favourites", user.email), uriObject);
    } else {
      await updateDoc(document, uriObject);
    }
    setIsFavorite(!isFavorite);
  }

  async function removeFavorite() {
    const uri = extractIdFromUri(card.uri);
    const document = doc(db, "favourites", user.email);
    const documentSnapshot = await getDoc(document);
    if (!documentSnapshot.exists()) {
      return;
    } else {
      const deleteObject = {};
      deleteObject[uri] = deleteField();
      await updateDoc(document, deleteObject);
    }
    setIsFavorite(!isFavorite);
  }

  async function checkIsFavorite() {
    console.log("checkIsFavorite" + card.uri)
    const uri = extractIdFromUri(card.uri);
    const document = doc(db, "favourites", user.email);
    const documentSnapshot = await getDoc(document);
    if (!documentSnapshot.exists()) {
      return false;
    } else {
      const favorites = documentSnapshot.data();
      return favorites[uri] ? true : false;
    }
  }

  const [isFavorite, setIsFavorite] = useState(false);

  async function checkFavorite() {
    if (!user) return;
    const favorite = await checkIsFavorite();
    setIsFavorite(favorite);
  }
  checkFavorite();

  return (
    <div className="card border border-gray-200 rounded-lg overflow-hidden shadow-lg relative">
      <img
        src={card.image}
        height={300}
        width={500}
        className="max-h-[200px] object-cover"
        alt=""
      ></img>
      {user && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          {isFavorite ? (
            <button
              onClick={() => {
                removeFavorite();
                if (setFavoritesId && favoritesId) {
                  const idArray = favoritesId.filter(
                    (id) => id !== extractIdFromUri(card.uri)
                  );
                  setFavoritesId(idArray);
                }
              }}
              className="rounded-full flex items-center justify-center bg-white w-10 h-10 overflow-hidden shadow-xl"
            >
              <IconHeartFilled className="text-red-400" />
            </button>
          ) : (
            <button
              onClick={() => setFavorite()}
              className="rounded-full flex items-center justify-center bg-white w-10 h-10 hover:bg-red-400 overflow-hidden shadow-xl"
            >
              <IconHeart />
            </button>
          )}
        </div>
      )}
      <div className="p-4">
        <h3 className="mb-4">{card.label}</h3>
        <p className="mb-3">{parseInt(card.calories)} calories</p>
        <a
          href={`/recipe/${extractIdFromUri(card.uri)}`}
          className="button px-4 py-2 border border-black rounded-md"
        >
          Explore
        </a>
        <div className="text-green-800">{}</div>
      </div>
    </div>
  );
};

export default Card;
