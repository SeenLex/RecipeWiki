"use client";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import DeleteButton from "./DeleteButton";
import { useAuthState } from "react-firebase-hooks/auth";

const AdminPage = () => {
  // shape of array
  // label: string
  // calories: number
  // totalWeight: number
  // cuisineType: string
  // mealType: string
  // ingredients: [text: string]
  // image: string
  const [user, loading, error] = useAuthState(auth);
  useEffect(() => {
    if (!user) {
      return;
    }
    async function getUsersRecipes() {
      const recipesRef = collection(db, "recipes");
      const q = query(recipesRef, where("user", "==", user.email));
      const recipes = await getDocs(q);
      const fetchedData = [];
      recipes.forEach((recipe) => {
        fetchedData.push({ id: recipe.id, data: recipe.data() });
      });
      setRecipesData(fetchedData);
    }
    getUsersRecipes();
  }, [user]);

  const [recipesData, setRecipesData] = useState(null);

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6">My recipes</h1>
        <div className="flex gap-4 flex-col mb-6">
          {recipesData === null
            ? "Loading recipes..."
            : recipesData.length
            ? recipesData.map(({ id, data }) => (
                <div
                  class="flex items-center gap-3"
                  key={`recipe-${data.label}`}
                >
                  <a
                    href={`/my-recipes/${id}`}
                    className="block p-4 border border-gray-200 rounded-lg w-[33%] shadow-lg"
                  >
                    <h2>{`${data.label}`}</h2>
                  </a>
                  <DeleteButton id={id} />
                  <a
                    href={`/my-recipes/edit/${id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg"
                  >
                    Edit
                  </a>
                </div>
              ))
            : "No recipes found"}
        </div>
        <a
          href="/my-recipes/new"
          className="border border-green-500 text-green-600 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white"
        >
          + New Recipe
        </a>
      </div>
    </section>
  );
};

export default AdminPage;
