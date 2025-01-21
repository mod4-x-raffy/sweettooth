let category = "Dessert";
const manyURL = `https://themealdb.com/api/json/v1/1/filter.php?c=${category}`;

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

export { fetchAllRecipes };
