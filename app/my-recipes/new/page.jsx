"use client";

import {
  cuisineTypes,
  dishTypes,
  mealTypes,
} from "@/app/components/filter/Filter";
import { auth, db } from "@/app/firebase";
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const NewRecipe = () => {
  const [mealType, setMealType] = useState(mealTypes[0]);
  const [dishType, setDishType] = useState(dishTypes[0]);
  const [cuisineType, setCuisineType] = useState(cuisineTypes[0]);
  const [label, setLabel] = useState("");
  const [calories, setCalories] = useState("");
  const [weight, setWeight] = useState("");
  const [img, setImg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      mealType,
      dishType,
      cuisineType,
      label,
      calories,
      weight,
      img,
      user: user.email
    };
    const docRef = await addDoc(collection(db, "recipes"), recipe);
    console.log(docRef);
    window.location.href = "/my-recipes";
  };
  const [user, loading, error] = useAuthState(auth);
  if (!user && !loading) {
    return <div>Access denied</div>;
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">Create a new recipe</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-lg" htmlFor="label">
              Name
            </label>
            <input
              className="py-3 px-4 border border-gray-400 rounded-md"
              type="text"
              name="label"
              id="label"
              placeholder="Fillet mignon"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg" htmlFor="img">
              Image path
            </label>
            <input
              className="py-3 px-4 border border-gray-400 rounded-md"
              type="text"
              name="img"
              id="img"
              placeholder="google.com/cat.png"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg" htmlFor="calories">
              Calories
            </label>
            <input
              className="py-3 px-4 border border-gray-400 rounded-md"
              type="text"
              name="calories"
              id="calories"
              placeholder="480"
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-lg" htmlFor="weight">
              Weight
            </label>
            <input
              className="py-3 px-4 border border-gray-400 rounded-md"
              type="text"
              name="weight"
              id="weight"
              placeholder="500"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Meal type</label>
            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
              className="px-4 py-2 rounded border border-gray-200 overflow-hidden capitalize"
              id="mealtype-select"
            >
              {mealTypes.map((mealType) => (
                <option className="capitalize" key={mealType} value={mealType}>
                  {mealType}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Dish type</label>
            <select
              value={dishType}
              onChange={(e) => setDishType(e.target.value)}
              className="px-4 py-2 rounded border border-gray-200 overflow-hidden capitalize"
              id="dishtype-select"
            >
              {dishTypes.map((dishType) => (
                <option className="capitalize" key={dishType} value={dishType}>
                  {dishType}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-1">Cuisine type</label>
            <select
              value={cuisineType}
              onChange={(e) => setCuisineType(e.target.value)}
              className="px-4 py-2 rounded border border-gray-200 overflow-hidden capitalize"
              id="cuisinetype-select"
            >
              {cuisineTypes.map((cuisineType) => (
                <option
                  className="capitalize"
                  key={cuisineType}
                  value={cuisineType}
                >
                  {cuisineType}
                </option>
              ))}
            </select>
          </div>
          <button className="border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white mt-4">
            Save
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewRecipe;
