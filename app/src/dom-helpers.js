import {
  fetchSingleRecipe,
  fetchCategoryItems,
  fetchAllCategories,
  fetchRandomRecipe
} from './data-layer.js'

// -------------- EVENT HANDLERS -------------- //
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
  form.clear(); // TODO: confirm if this works
  if (recipeData === null) {
    renderErrorToast();
    return;
  }
  renderSingleRecipe(recipeData);
}

const collapseAllCategories = () => {
  const contentDivs = document.querySelectorAll('div.category-content');
  for (const div of contentDivs) {
    if (div.classList.contains('collapsed')) continue;
    div.classList.add('collapsed');
  }
}

const handleCategoryExpand = async (event) => {
  const div = event.target.closest('div');
  if (!div.classList.contains('category-header')) return;

  // TODO: Expand this category
  const contentDiv = div.nextElementSibling;
  if (contentDiv.classList.contains('collapsed')) collapseAllCategories();
  const categoryLI = event.target.closest('li');
  console.log(contentDiv);
  if (!contentDiv.classList.contains('collapsed')) {
    contentDiv.classList.add('collapsed');
    return;
  }

  if (contentDiv.innerHTML.trim() === '') {
    console.log(contentDiv.innerHTML);
    const categoryItems = await fetchCategoryItems(categoryLI.dataset.category);

    const categoryItemsUL = document.createElement('ul');
    categoryItemsUL.classList.add('category-items');

    console.log(categoryItems);
    for (const [index, recipe] of categoryItems.meals.entries()) {
      const li = document.createElement('li');
      li.id = index;
      li.classList.add('category-item')
      // TODO: not sure about this one
      // li.dataset.category = categoryLI.dataset.category;

      const img = document.createElement('img');
      img.src = recipe.strMealThumb;
      img.alt = recipe.strMeal;

      const p = document.createElement("p");
      p.textContent = recipe.strMeal;

      li.append(img, p);
      categoryItemsUL.append(li);
    }

    contentDiv.append(categoryItemsUL);
  }
  console.log(contentDiv.classList);
  contentDiv.classList.remove('collapsed');
  console.log(contentDiv.classList);
}

// -------------- RENDER FUNCS -------------- //
const initLanding = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
<section id="recipe-banner">
  <!-- item here will be handled in js -->
</section>
<section id="categories-section">
  <ul id="categories-list">
    <!-- items here will be handled in js -->
  </ul>
</section>
`;
}

const renderLanding = async () => {
  // TODO: Refactor into showing categories instead

  // if coming from details page.
  initLanding();
  await renderRecipeOfTheDay();
  await renderAllCategories();

  // attach listeners
  const recipeOfTheDay = document.querySelector('div#recipe-container');
  recipeOfTheDay.addEventListener('click', handleBannerClick);

  const searchBox = document.querySelector('form#search-box');
  searchBox.addEventListener('submit', handleSearch);

  const mainMenuButton = document.querySelector('button#main-menu');
  mainMenuButton.addEventListener('click', rerenderLanding);

  const categoriesListUL = document.querySelector('ul#categories-list');
  categoriesListUL.addEventListener('click', handleCategoryExpand)
}

const renderCategoryItems = async () => {
  // TODO:
  // 1. fetch all items from this category
  // 2. append the data
  // 3. maybe render?
}

const renderAllCategories = async () => {
  const categoriesList = await fetchAllCategories();
  const categoriesListUL = document.querySelector('ul#categories-list')
  for (const [index, category] of categoriesList.meals.entries()) {
    const li = document.createElement('li');
    li.id = index;
    li.dataset.category = category.strCategory;

    // -------------- CATEGORY HEADER DIV -------------- //
    const headerDiv = document.createElement('div');
    headerDiv.classList.add('category-header');
    const headerText = document.createElement('h3');
    headerText.textContent = category.strCategory;
    // finalize header div 
    headerDiv.append(headerText);
    li.append(headerDiv);


    // -------------- CATEGORY CONTENT DIV -------------- //
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('category-content');
    contentDiv.classList.add('collapsed');
    // finalize content div, collapsed, initially
    li.append(contentDiv)
    // finalize li into parent UL
    categoriesListUL.append(li);
  }
}

const rerenderLanding = async () => {
  if (document.querySelector('section#categories-section') === null) renderLanding();
}

const renderAllRecipes = (allRecipes) => {
  const recipesUL = document.querySelector("ul#dish-catalog");
  recipesUL.innerHTML = '';

  allRecipes.meals.forEach((recipe) => {
    const li = document.createElement("li");
    li.dataset.idMeal = recipe.idMeal;

    const img = document.createElement("img");
    img.src = recipe.strMealThumb;
    img.alt = recipe.strMeal;

    const p = document.createElement("p");
    p.textContent = recipe.strMeal;

    li.append(img, p);
    recipesUL.append(li);
  });
};

const renderRecipeOfTheDay = async () => {
  let recipeData = await fetchRandomRecipe();
  recipeData = recipeData.meals[0];
  const section = document.querySelector("section#recipe-banner");
  section.innerHTML = '';

  const div = document.createElement('div');
  div.id = 'recipe-container';
  div.dataset.idMeal = recipeData.idMeal;

  const h1 = document.createElement("h1");
  h1.textContent = `Recipe of the day: ${recipeData.strMeal}`;

  const img = document.createElement("img");
  img.src = recipeData.strMealThumb;
  img.alt = recipeData.strMeal;

  div.append(img, h1);
  section.append(div);
};

const renderSingleRecipe = (recipeData) => {
  // grab and clear app container
  const main = document.querySelector("main");
  main.innerHTML = "";

  // -------------- BANNER -------------- //
  const banner = document.createElement("section");
  banner.id = "recipe-banner";

  const foodImg = document.createElement("img");
  foodImg.src = recipeData.meals[0].strMealThumb;
  foodImg.alt = recipeData.meals[0].strMeal;

  const h1 = document.createElement("h1");
  h1.textContent = `${recipeData.meals[0].strMeal}`;

  // TODO: Recipe banner background image
  // idk yet maybe same image but with offset, blur
  // monochrome, and whatever the fuck else
  // i'm usually supposed to do here
  // const backImg = document.createElement('img');

  // finalize banner section
  // banner.append(backImg, foodImg);
  banner.append(foodImg, h1);
  main.append(banner);

  // -------------- INGREDIENTS -------------- //
  const recipe = document.createElement("section");
  recipe.id = "recipe-details";

  const ingredientsDiv = document.createElement("div");
  ingredientsDiv.id = "ingredients-div";

  const ingredientsH2 = document.createElement("h2");
  ingredientsH2.textContent = "Ingredients";

  const ingredientsUl = document.createElement("ul");
  ingredientsUl.id = "ingredients-list";

  // mealsDB is cooked bro what the hell is this
  const ingredientsArr = [];
  // yes this is NECESSARY
  // I LOVE mealdb bro... (not)
  for (let i = 1; i < 21; i++) {
    // grab data, look out for errors
    const currItem = recipeData.meals[0][`strIngredient${i}`].toLowerCase();
    if (currItem === null || currItem === "") break;
    const currUnit = recipeData.meals[0][`strMeasure${i}`].toLowerCase();
    if (currUnit === "") console.log(`blank currUnit: ${currUnit}`);

    const li = document.createElement("li");
    const p = document.createElement("p");

    const spanItem = document.createElement("span");
    const emUnit = document.createElement("em");
    spanItem.textContent = currItem;
    spanItem.classList.add("item");
    emUnit.textContent = currUnit;
    emUnit.classList.add("unit");

    p.append(emUnit, spanItem);
    li.append(p);
    ingredientsUl.append(li);
    // for testing grabbing the data
    // ingredientsArr.push({
    //   item: currItem,
    //   unit: currUnit
    // })
    console.log(`unit: ${emUnit.textContent}`);
    console.log(`item: ${spanItem.textContent}`);
    console.log();
  }

  // finalize ingredients
  ingredientsDiv.append(ingredientsH2, ingredientsUl);
  recipe.append(ingredientsDiv);

  // -------------- DIVIDER -------------- //
  // inside this thing is just a line divider or something
  const recipeDivider = document.createElement("div");
  recipeDivider.id = "recipe-divider";

  // finalize divider
  recipe.append(recipeDivider);

  // -------------- STEPS -------------- //
  const stepsDiv = document.createElement("div");
  stepsDiv.id = "steps-div";

  const stepsH2 = document.createElement("h2");
  stepsH2.textContent = "Recipe";

  const stepsOl = document.createElement("ol");
  stepsOl.id = "steps-ol";
  const stepsArr = recipeData.meals[0].strInstructions.split(/[\r\n]+/);
  stepsArr.forEach((step, index) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = index + 1;
    p.textContent = step;

    // finalize list item
    li.append(h3, p);
    stepsOl.append(li);
  });
  // finalize stepsDiv
  stepsDiv.append(stepsH2, stepsOl);
  recipe.append(stepsDiv);

  main.append(recipe);
};

// TODO: Render Error Toast
// make it so that all errors in fetching pass through here
const renderErrorToast = () => {

}

export {
  renderLanding,
  renderAllRecipes,
  renderSingleRecipe,
  renderErrorToast
};
