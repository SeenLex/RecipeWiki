"use client";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { Cards } from "./components/cards/Cards";
import { Sidebar } from "./components/sidebar/Sidebar";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import Login from "./login/page";

export default function Homepage() {
  // get all recipes from a collection
  // const q = query(collection(db, "recipes"));
  // const querySnapshot = await getDocs(q);
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  // recipes = []
  // get all recipes
  // recipesFromDB = [recipes1, recipes2 ...]
  // [recipes, setRecipes] = useState([])
  // setRecipes(recipesFromDB)

  // sort by name asc
  // myArray = recipes
  // myArray.sort();

  // setRecipes(myArray)

  // get a single recipe
  // const docRefGetOne = doc(db, "recipes", "recipe-1");
  // const docSnapGetOne = await getDoc(docRefGetOne);

  // if (docSnapGetOne.exists()) {
  //   console.log("Get a single recipe: ", docSnapGetOne.data());
  // } else {
  //   console.log("No such document!");
  // }

  // create a single recipe
  // await setDoc(doc(db, "recipes", "recipe-3"), {
  //   test: "valoare recipe 3"
  // });

  // update a single recipe
  // const recipeRef = doc(db, "recipes", "recipe-2");
  // await updateDoc(recipeRef, {
  //   test: "valorea noua a lui recipe 2"
  // })

  // delete a single recipe
  // await deleteDoc(doc(db, "recipes", "recipe-3"));


  return (
    <div>
      {/* <Sidebar /> */}
      <Cards />
    </div>
  );
}