let category = "Dessert";
const manyURL = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`;
const singleURL = `https://themealdb.com/api/json/v1/1/lookup.php?i=`

let randomFood = {};

const fetchAllRecipes = async () => {
  try {
    const response = await fetch(manyURL);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const allRecipes = await response.json();
    return allRecipes;
  } catch (error) {
    console.error(error);
  }
};

const fetchSingleRecipe = async (id) => {
  try {
    const response = await fetch(singleURL+id);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const singleRecipe = await response.json();
    console.log(singleRecipe);
    return singleRecipe;
  } catch (error) {
    console.error(error);
  }
}

export { fetchAllRecipes, fetchSingleRecipe };
