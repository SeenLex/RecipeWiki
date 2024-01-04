
export const mealTypes = [
  'breakfast',
  'brunch',
  'lunch',
  'dinner',
  'snack',
]

export const dishTypes = [
  "alcohol cocktail",
  "biscuits and cookies",
  "bread",
  "cereals",
  "condiments and sauces",
  "desserts",
  "drinks",
  "egg",
  "main course",
  "pancake",
  "preps",
  "preserve",
  "salad",
  "sandwiches",
  "soup",
  "starter",
];

export const cuisineTypes = [
  "american",
  "asian",
  "british",
  "caribbean",
  "central europe",
  "chinese",
  "eastern europe",
  "french",
  "greek",
  "indian",
  "italian",
  "japanese",
  "korean",
  "kosher",
  "mediterranean",
  "mexican",
  "middle eastern",
  "nordic",
  "south american",
  "south east asian",
  "world"
];



export const Filter = ({mealType, setMealType, dishType, setDishType, cuisineType, setCuisineType}) => {
  return (
    <>
      <div>
        <label className="block mb-1">Meal type</label>
        <select value={mealType} onChange={(e) => setMealType(e.target.value)} className="px-4 py-2 rounded border border-gray-200 overflow-hidden capitalize" id="mealtype-select">
          <option value="">Anything</option>
          {mealTypes.map((mealType) => (
            <option className="capitalize" key={mealType} value={mealType}>{mealType}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Dish type</label>
        <select value={dishType} onChange={(e) => setDishType(e.target.value)} className="px-4 py-2 rounded border border-gray-200 overflow-hidden capitalize" id="dishtype-select">
          <option value="">Anything</option>
          {dishTypes.map((dishType) => (
            <option className="capitalize" key={dishType} value={dishType}>{dishType}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block mb-1">Cuisine type</label>
        <select value={cuisineType} onChange={(e) => setCuisineType(e.target.value)} className="px-4 py-2 rounded border border-gray-200 overflow-hidden capitalize" id="cuisinetype-select">
          <option value="">Anything</option>
          {cuisineTypes.map((cuisineType) => (
            <option className="capitalize" key={cuisineType} value={cuisineType}>{cuisineType}</option>
          ))}
        </select>
      </div>

    </>
  );
};
