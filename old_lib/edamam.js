export const foodDbSearch = async (query) => {
  try {
  const response = await fetch(
    `https://api.edamam.com/api/food-database/parser?app_id=8de772d5&app_key=${process.env.FOOD_DB_KEY}&ingr=${query}`
  );
  return response.json();
  } catch (err) {
    throw new Error(err)
  }
};

export const getNutritionInfo = async (obj) => {
  const response = await fetch(
    `https://api.edamam.com/api/food-database/nutrients?app_id=8de772d5&app_key=${process.env.FOOD_DB_KEY}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredients: [obj.info] }),
    }
  );
  const nutritionInfo = await response.json();
  return nutritionInfo;
};
