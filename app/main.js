import { renderAllRecipes, renderRecipeOfDay, renderSingleRecipe } from "/src/dom-helpers.js";
import { fetchAllRecipes, fetchSingleRecipe } from "/src/data-layer.js";

const handleRecipeClick = async (event) => {
  const li = event.target.closest('li');
  if (li === null) return;
  console.log(li.dataset.idMeal);

  const recipeData = await fetchSingleRecipe(li.dataset.idMeal);
  renderSingleRecipe(recipeData);
}


const main = async () => {
  const allRecipes = await fetchAllRecipes();
  renderAllRecipes(allRecipes);
  const randomFood =
    allRecipes.meals[Math.floor(Math.random() * allRecipes.meals.length)];

  renderRecipeOfDay(randomFood);

  const recipesUL = document.querySelector('ul#dish-catalog');
  console.log(recipesUL)
  recipesUL.addEventListener('click', handleRecipeClick);
};

main();
