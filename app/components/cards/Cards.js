"use client";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Filter } from "../filter/Filter";
import { auth } from "@/app/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Cards = () => {
  const [recipes, setRecipes] = useState();
  const baseLink = "https://api.edamam.com/api/recipes/v2";
  const app_id = "77ab4532";
  const app_key = "9b2df32292418d119f55ecb45f2d48d3";
  const [search, setSearch] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const [mealType, setMealType] = useState("");
  const [dishType, setDishType] = useState("");
  const [cuisineType, setCuisineType] = useState("");

  const searchRecipes = async () => {
    const searchParams = {
      app_id: app_id,
      app_key: app_key,
      type: "public",
    };
    if (search) {
      searchParams.q = search;
    }
    if (mealType) {
      searchParams.mealType = mealType;
    }
    if (dishType) {
      searchParams.dishType = dishType;
    }
    if (cuisineType) {
      searchParams.cuisineType = cuisineType;
    }
    if (!search && !mealType && !dishType && !cuisineType) {
      searchParams.health = "mollusk-free";
      searchParams.random = true;
    }

    const url = `${baseLink}?` + new URLSearchParams(searchParams);
    const response = await fetch(url, {
      method: "GET",
    });
    try {
      const recipes = await response.json();
      console.log(recipes.hits);
      setRecipes(recipes.hits);
      console.log(recipes.hits);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function setRecipes() {
      await searchRecipes();
    }
    setRecipes();
  }, []);

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="title-cards">
        <h1 className="text-2xl font-bold mb-6">Recipes</h1>
      </div>
      <div className="flex flex-wrap items-end gap-12 mb-12">
        <div>
          <label className="block mb-1">Search a recipe</label>
          <input
            className="px-4 py-2 rounded border border-gray-200 overflow-hidden"
            type="text"
            placeholder="Foods"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex-grow flex items-center gap-6">
          <Filter
            mealType={mealType}
            setMealType={setMealType}
            dishType={dishType}
            setDishType={setDishType}
            cuisineType={cuisineType}
            setCuisineType={setCuisineType}
          />
        </div>
        <button
          onClick={() => searchRecipes()}
          className="px-4 py-2 border rounded-md border-gray-600 hover:bg-orange-500 hover:text-white"
        >
          Find
        </button>
      </div>

      <div className="grid grid-cols-4 gap-12">
        {recipes &&
          recipes.map((recipe, i) => (
            <Card user={user} key={`card-${i}`} card={recipe.recipe} />
          ))}
      </div>
    </div>
  );
};
