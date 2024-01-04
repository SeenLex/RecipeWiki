import {
  cuisineTypes,
  dishTypes,
  mealTypes,
} from "@/app/components/filter/Filter";
import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React from "react";
import EditForm from "./EditForm";

const EditRecipe = async ({ params }) => {
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
  return <EditForm recipe={recipe} id={id} />;
};

export default EditRecipe;
