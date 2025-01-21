import { renderAllRecipes, renderRecipeOfDay, renderSingleRecipe } from "/src/dom-helpers.js";
import { fetchAllRecipes, fetchSingleRecipe, searchRecipe } from "/src/data-layer.js";

const handleRecipeClick = async (event) => {
  const li = event.target.closest('li');
  if (li === null) return;
  console.log(li.dataset.idMeal);

  const recipeData = await fetchSingleRecipe(li.dataset.idMeal);
  renderSingleRecipe(recipeData);
}

const handleBannerClick = async (event) => {
  const div = event.target.closest('div');
  if (div === null) return;
  console.log(div.dataset.idMeal);

  const recipeData = await fetchSingleRecipe(div.dataset.idMeal);
  renderSingleRecipe(recipeData);
}

const handleSearch = async (event) => {
  event.preventDefault();
  const form = event.target;
  console.log(form.elements.dish.value);
  const recipeData = await searchRecipe(form.elements.dish.value);
  if (recipeData === null) {
    renderErrorMessage();
    return;
  }
  renderSingleRecipe(recipeData);
}

const initMain = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
    <section id="recipe-banner">
      <!-- item here will be handled in js -->
    </section>
    <section id="recipe-list">
      <ul id="dish-catalog">
        <!-- item here will be handled in js -->
      </ul>
      <div id="button-div">
        <button id="load-more"></button>
      </div>
    </section>
    `;
}

const handleMainMenu = async () => {
  if (document.querySelector('section#recipe-list') === null) initMain();
  const allRecipes = await fetchAllRecipes();
  renderAllRecipes(allRecipes);
  const randomFood =
    allRecipes.meals[Math.floor(Math.random() * allRecipes.meals.length)];
  renderRecipeOfDay(randomFood);

  // attach listeners
  const recipeOfTheDay = document.querySelector('section#recipe-banner');
  recipeOfTheDay.addEventListener('click', handleBannerClick);

  const recipesUL = document.querySelector('ul#dish-catalog');
  console.log(recipesUL)
  recipesUL.addEventListener('click', handleRecipeClick);

  const searchBox = document.querySelector('form#search-box');
  searchBox.addEventListener('submit', handleSearch);

  const mainMenuButton = document.querySelector('button#main-menu');
  mainMenuButton.addEventListener('click', handleMainMenu)
}

const main = async () => {
  handleMainMenu();
};

main();
