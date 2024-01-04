import {
  IconChefHat,
  IconFlame,
  IconToolsKitchen2,
  IconWeight,
} from "@tabler/icons-react";
import Image from "next/image";
import React from "react";

export const RecipePageCard = ({ recipeInfo }) => {
  const images = recipeInfo.images ?? null;
  const imageThumbnail =
    images?.LARGE?.url ||
    images?.MEDIUM?.url ||
    images?.SMALL?.url ||
    recipeInfo.image ||
    recipeInfo.img ||
    "";
  const weight = recipeInfo.totalWeight || recipeInfo.weight || 0;
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-12 mb-12">
          <div className="col-span-8 shadow-lg">
            <div className="h-[500px] relative rounded-xl overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={imageThumbnail}
                alt={recipeInfo.label}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-30%"></div>
              <div className="absolute bottom-0 mb-8 ml-8 text-5xl font-bold text-white">
                {recipeInfo.label}
              </div>
            </div>
          </div>

          <div className="col-span-4 shadow-lg border border-gray-300 bg-[#FFEECC] p-8 rounded-md">
            <div className="text-xl mb-6 font-bold">Dish details</div>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-1">
                <IconWeight />
                <p>{parseInt(weight)} g</p>
              </div>
              <div className="flex items-center gap-1">
                <IconFlame />
                <p>{parseInt(recipeInfo.calories)} Kcal</p>
              </div>
              <div className="flex items-center gap-1">
                <IconToolsKitchen2 />
                <p className="capitalize">{recipeInfo.cuisineType} cuisine</p>
              </div>
              <div className="flex items-center gap-1">
                <IconChefHat />
                <p className="capitalize">{recipeInfo.mealType}</p>
              </div>
            </div>
          </div>
        </div>
        {recipeInfo.ingredients && (
          <div className="border border-gray-300 bg-[#FFEECC] p-8 rounded-md text-lg shadow-lg">
            <div className="text-2xl mb-6 font-bold">Ingredients</div>
            <div className="grid grid-cols-3 gap-8">
              {recipeInfo.ingredients.map(({ text, image }) => {
                return (
                  <div
                    className="flex flex-col gap-4 border border-gray-300 p-6 rounded-xl shadow-lg"
                    key={text}
                  >
                    <img
                      className="w-32 rounded-xl overflow-hidden"
                      src={image}
                    />
                    <p className="text-xl">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RecipePageCard;
