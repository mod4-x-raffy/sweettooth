import { renderAllRecipes, renderRecipeOfDay } from "./src/dom-helpers";
import { fetchAllRecipes } from "/src/data-layer.js";
const main = async () => {
  const allRecipes = await fetchAllRecipes();
  renderAllRecipes(allRecipes);
  const randomFood =
    allRecipes.meals[Math.floor(Math.random() * allRecipes.meals.length)];

  renderRecipeOfDay(randomFood);
};

main();
