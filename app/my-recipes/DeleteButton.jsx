"use client";

import { deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { db } from "../firebase";

const DeleteButton = ({ id }) => {
  const handleDelete = (id) => {
    return async () => {
      await deleteDoc(doc(db, "recipes", id));
      window.location.reload();
    };
  };
  return (
    <button
      onClick={handleDelete(id)}
      className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg"
    >
      Delete
    </button>
  );
};

export default DeleteButton;
