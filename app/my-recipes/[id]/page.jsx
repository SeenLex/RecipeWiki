import { db } from "@/app/firebase";
import RecipePageCard from "@/app/recipe/RecipePageCard";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

const MyRecipe = async ({ params }) => {
  const id = params.id;
  const recipeRef = doc(db, "recipes", id);
  const recipeSnap = await getDoc(recipeRef);
  if (recipeSnap.exists()) {
    console.log("Document data:", recipeSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
    return <div></div>;
  }
  const recipe = recipeSnap.data();
  return <RecipePageCard recipeInfo={recipe} />;
};

export default MyRecipe;
