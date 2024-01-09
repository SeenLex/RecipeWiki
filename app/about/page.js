import React from "react";

const About = () => {
  return (
    <div className=" p-40" id="about-section">
      <h1 className="text-3xl font-bold" id="headline">
        About <b id="recipe-wiki-header">RecipeWiki</b>
      </h1>
      <p className="text-lg" id="subheadline">
        Explore the art of cooking and baking with our delightful recipe blog.
      </p>
      <p className="text-lg font-semibold">What You&apos;ll Discover:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="p-4 flex items-center">
          <i className="feature-icon">🍽️</i>
          <span className="ml-2">Diverse Recipes</span>
        </div>
        <div className="p-4 flex items-center">
          <i className="feature-icon">👩‍🍳</i>
          <span className="ml-2">Expert Tips</span>
        </div>
        <div className="p-4 flex items-center">
          <i className="feature-icon">🎥</i>
          <span className="ml-2">Video Tutorials</span>
        </div>
        <div className="p-4 flex items-center">
          <i className="feature-icon">🍅</i>
          <span className="ml-2">Ingredient Spotlights</span>
        </div>
        <div className="p-4 flex items-center">
          <i className="feature-icon">📝</i>
          <span className="ml-2">Informative Articles</span>
        </div>
        <div className="p-4 flex items-center">
          <i className="feature-icon">📷</i>
          <span className="ml-2">Gorgeous Food Photography</span>
        </div>
        <div className="p-4 flex items-center">
          <i className="feature-icon">💌</i>
          <span className="ml-2">Community and Feedback</span>
        </div>
      </div>
      <p className="text-lg mt-4">
        RecipeWiki is your go-to resource for culinary creativity, offering a
        delightful journey through the world of flavors. Get ready to embark on
        a culinary adventure and elevate your cooking game. Happy cooking!
        🍽️👨‍🍳🍰
      </p>
    </div>
  );
};

export default About;
