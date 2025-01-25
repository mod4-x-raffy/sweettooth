import {
  fetchSingleRecipe,
  fetchCategoryItems,
  fetchAllCategories,
  // fetchRandomRecipe,
  searchRecipe,
  toggleSaved,
  checkSaved,
  getSaved
} from './data-layer.js'
import saveRecipeIco from '../etc/save-recipe.png';
import unsaveRecipeIco from '../etc/unsave-recipe.png';
import beansIco from '../etc/1920.png';
import beansOriginIco from '../etc/loading.jpeg';

// -------------- EVENT HANDLERS -------------- //
const handleRecipeClick = async (event) => {
  // Ignore all clicks not made over list-items.
  const li = event.target.closest('li');
  if (li === null || li.classList.contains('category')) return;

  // Enables un/saving of recipes
  //   Currently, it is the only button under any given
  //   `ul` in the app so this works just fine.
  if (event.target.closest('button') !== null) {
    // toggle the item in localstore
    const img = li.querySelector('img');
    const isSaved = toggleSaved({
      idMeal: li.dataset.idMeal,
      strMeal: img.alt,
      strMealThumb: img.src
    });

    const ul = event.target.closest('ul');
    // If currently on Favorites screen,
    //   Simply remove the element from the DOM.
    if (ul.id === 'saved-list') {
      ul.removeChild(li);
    // If currently on the Landing page,
    //   Re-render the button on top of the clicked
    //   list item to reflect the opposite action.
    //   i.e. saved icon <==> unsaved icon
    } else {
      const button = li.querySelector('button');
      const saveImg = button.querySelector('img');
      saveImg.src = (!isSaved) ? saveRecipeIco : unsaveRecipeIco
      saveImg.alt = (isSaved) ? 'Unsave' : 'Save';
    }
    return; // guard clause
  }

  // User clicks on a recipe,
  //   This will render a detailed page for it.
  if (li.classList.contains('category-item')) {
    const recipeData = await fetchSingleRecipe(li.dataset.idMeal);
    renderSingleRecipe(recipeData);
  }
}

const handleSearch = async (event) => {
  // TODO: Error handling
  event.preventDefault();
  const form = event.target;
  console.log(form.elements.dish.value);
  const recipeData = await searchRecipe(form.elements.dish.value);
  // TODO: should i check if recipe data is null?
  // this actually falls on the API, but a failsafe woule be nice
  form.reset();
  if (recipeData === null) {
    renderErrorToast();
    return;
  }
  renderSingleRecipe(recipeData);
}

// Renders the expansion of the selected category tab.
const handleCategoryExpand = async (event) => {
  const div = event.target.closest('div');
  if (!div.classList.contains('category-header')) return;

  // If this current category tab is collapsed,
  //   Before expanding it, make sure that all other
  //   category tabs are collapsed first.
  const contentDiv = div.nextElementSibling;
  if (contentDiv.classList.contains('collapsed')) collapseAllCategories();

  // If this current category tab is expanded,
  //   Simply handle the event by collapsing it instead.
  const categoryLI = event.target.closest('li');
  if (!contentDiv.classList.contains('collapsed')) {
    contentDiv.classList.add('collapsed');
    return;
  }

  // If this is the first expansion of this category tab,
  //   Render it for the first time!
  //   Subsequent collapses/expansions are just hiding the
  //   already rendered elements.
  if (contentDiv.innerHTML.trim() === '') {
    renderCategoryItems(contentDiv, categoryLI);
  }

  contentDiv.classList.remove('collapsed');
}

// -------------- RENDER FUNCS -------------- //
const collapseAllCategories = () => {
  const contentDivs = document.querySelectorAll('div.category-content');
  for (const div of contentDivs) {
    if (div.classList.contains('collapsed')) continue;
    div.classList.add('collapsed');
  }
}

const initLanding = () => {
  const main = document.querySelector('main');
  main.classList.add('init');
  const nav = document.querySelector('nav');
  nav.classList.remove('init');
  const body = document.querySelector('body');
  body.classList.remove('init');
  main.innerHTML = `
    <div id='title-div'>
      <div id='hero-logo-div'>
        <img src='' alt='Sweet Tooth'>
      </div>
      <div id='hero-title-div'>
        <h1>
          Select a category
        </h1>
      </div>
    </div>
    <section id="categories-section">
      <ul id="categories-list">
        <!-- items here will be handled in js -->
      </ul>
    </section>
  `;
  const titleDiv = document.querySelector('div#title-div');
  const logo = titleDiv.querySelector('img');
  logo.src = beansIco;
}

const renderSaved = () => {
  const saved = getSaved();
  // TODO: uncomment once renderBlankSaved is done
  // if (Object.keys(saved).length === 0) {
  //   renderBlankSaved();
  //   return;
  // }
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.classList.remove('detailed');

  const h1 = document.createElement('h1');
  h1.textContent = 'Saved Recipes';

  const ul = document.createElement('ul');
  ul.id = 'saved-list';
  ul.addEventListener('click', handleRecipeClick);

  let i = 0;
  for (const [key, value] of Object.entries(saved)) {
    const li = document.createElement('li');
    li.id = i++;
    li.dataset.idMeal = key;
    li.classList.add('category-item');

    const img = document.createElement('img');
    img.src = value.strMealThumb;
    img.alt = value.strMeal;

    const p = document.createElement('p');
    let temp = value.strMeal[0].toUpperCase();
    temp += value.strMeal.slice(1).toLowerCase();
    p.textContent = temp;

    // conditional to check if saved and render differently
    const isSaved = checkSaved(value.idMeal);
    const button = document.createElement('button');
    button.classList.add('save-recipe');
    const saveImg = document.createElement('img');
    saveImg.src = (isSaved) ? saveRecipeIco : unsaveRecipeIco
    saveImg.alt = (!isSaved) ? 'Unsave' : 'Save';
    button.append(saveImg);

    li.append(img, p, button);
    ul.append(li);
  }
  main.append(h1, ul);
}

// TODO: Render blank saved (if no saves yet)
// fallback message to say that there's nothing here yet
const renderBlankSaved = () => {

}

// 'Fallback' on app launch.
//   This loadscreen gives time for the app to
//   make all the necessary fetches before rendering
//   the landing page.
const renderFallback = (bool) => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  const img = document.createElement('img');
  img.id = 'loading';
  img.src = beansOriginIco;
  img.alt = 'loading';
  main.append(img);
}

// Renders the landing page.
//   Optional argument is used to render a fallback
//   if the app is loaded for the first time.
const renderLanding = async (first=false) => {
  // Fallback render
  if (first) renderFallback(true);
  // Fetching data...
  const categories = await fetchAllCategories();
  for (const item of categories.meals) {
    await fetchCategoryItems(item.strCategory);
  }
  // Render data
  initLanding();
  await renderAllCategories();

  // Initialize all the listeners for the landing page.
  const searchBox = document.querySelector('form#search-box');
  searchBox.addEventListener('submit', handleSearch);

  const mainMenuButton = document.querySelector('button#saved');
  mainMenuButton.addEventListener('click', renderSaved);

  const categoriesListUL = document.querySelector('ul#categories-list');
  categoriesListUL.addEventListener('click', handleCategoryExpand)

  const savedButton = document.querySelector('button#saved');
  savedButton.addEventListener('click', renderSaved);

  const backButton = document.querySelector('button#main-menu');
  backButton.addEventListener('click', rerenderLanding);

  // Un/Hides navbar based on screen position.
  //  In this case, only render it when the user is
  //  scrolled to the top.
  window.onscroll = () => {
    const top = document.body.scrollTop + document.documentElement.scrollTop === 0;
    if (top) {
      document.querySelector('nav').classList.remove('init');
    } else {
      document.querySelector('nav').classList.add('init');
    }
  };

  // When rendering landing, scroll to top.
  //   This accounts for when the saved list grows
  //   large enough that the user has to scroll to
  //   see their whole list. Going back to the landing
  //   screen will automatically pull their view to the
  //   top of the screen for convenience.
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// Renders the items inside each category.
//   This triggers in response to `handleCategoryExpand`.
const renderCategoryItems = async (contentDiv, categoryLI) => {
    const categoryItems = await fetchCategoryItems(categoryLI.dataset.category);

    const categoryItemsUL = document.createElement('ul');
    categoryItemsUL.classList.add('category-item');
    categoryItemsUL.addEventListener('click', handleRecipeClick);

    for (const [index, recipe] of categoryItems.meals.entries()) {
      const li = document.createElement('li');
      li.id = index;
      li.dataset.idMeal = recipe.idMeal;
      li.classList.add('category-item')
      // NOTE: not sure about this one
      // li.dataset.category = categoryLI.dataset.category;

      const img = document.createElement('img');
      img.src = recipe.strMealThumb;
      img.alt = recipe.strMeal;

      const p = document.createElement('p');
      let temp = recipe.strMeal[0].toUpperCase();
      temp += recipe.strMeal.slice(1).toLowerCase();
      p.textContent = temp;

      const isSaved = checkSaved(recipe.idMeal);
      const button = document.createElement('button');
      button.classList.add('save-recipe');
      const saveImg = document.createElement('img');
      saveImg.src = (!isSaved) ? saveRecipeIco : unsaveRecipeIco
      saveImg.alt = (isSaved) ? 'Unsave' : 'Save';
      button.append(saveImg);

      li.append(img, p, button);
      categoryItemsUL.append(li);
    }
    contentDiv.append(categoryItemsUL);
}

// Renders the list of categories as expandable tabs
const renderAllCategories = async () => {
  const categoriesList = await fetchAllCategories();
  const categoriesListUL = document.querySelector('ul#categories-list')
  for (const [index, category] of categoriesList.meals.entries()) {
    const li = document.createElement('li');
    li.id = index;
    li.classList.add('category');
    li.dataset.category = category.strCategory;

    const headerDiv = document.createElement('div');
    headerDiv.classList.add('category-header');
    const headerText = document.createElement('h1');
    headerText.textContent = category.strCategory;
    headerDiv.append(headerText);
    li.append(headerDiv);

    // contentDiv is empty and collapsed, initially.
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('category-content');
    contentDiv.classList.add('collapsed');
    li.append(contentDiv);
    categoriesListUL.append(li);
  }
}

// Conditionally renders the landing screen.
//   This function only executes a render in response
//   to a click that doesn't occur in the landing page.
const rerenderLanding = async () => {
  if (document.querySelector('section#categories-section') === null) {
    const main = document.querySelector('main');
    main.classList.remove('detailed');
    renderLanding();
  }
}

// Currenly UNUSED!
//   Implemented at first, but in its current structure,
//   it doesn't mesh very well with the minimalist UI.
const renderRecipeOfTheDay = async () => {
  let recipeData = await fetchRandomRecipe();
  // TODO: should i check if recipe data is null?
  // this actually falls on the API, but a failsafe woule be nice
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

// Renders a detailed page of the recipe
//   in response to a click on any recipe list item.
const renderSingleRecipe = (recipeData) => {
  const main = document.querySelector("main");
  main.innerHTML = "";
  main.classList.add('detailed');

  const banner = document.createElement("section");
  banner.classList.add('detailed');
  banner.id = "recipe-banner";
  banner.dataset.idMeal = recipeData.meals[0].idMeal;

  const foodImg = document.createElement("img");
  foodImg.src = recipeData.meals[0].strMealThumb;
  foodImg.alt = recipeData.meals[0].strMeal;

  banner.append(foodImg);
  main.append(banner);

  const recipe = document.createElement("section");
  recipe.id = "recipe-details";
  
  const h1Div = document.createElement('div');
  h1Div.id = 'h1-div';
  const h1 = document.createElement('h1');
  let temp = recipeData.meals[0].strMeal[0].toUpperCase();
  temp += recipeData.meals[0].strMeal.slice(1).toLowerCase();
  h1.textContent = temp;

  h1Div.append(h1);
  recipe.append(h1Div);

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

  // The current max ingredient fields in the api is 21!
  for (let i = 1; i < 21; i++) { 
    // Only grab up until the ingredient field is empty.
    let currItem = recipeData.meals[0][`strIngredient${i}`];
    if (currItem === null || currItem === "") break;
    let currUnit = recipeData.meals[0][`strMeasure${i}`];

    currItem = currItem.toLowerCase();
    currUnit = currUnit.toLowerCase();

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
  }

  // finalize ingredients
  ingredientsDiv.append(ingredientsH2, ingredientsUl);
  recipe.append(ingredientsDiv);

  const stepsDiv = document.createElement("div");
  stepsDiv.id = "steps-div";

  const stepsH2 = document.createElement("h2");
  stepsH2.textContent = "Recipe";

  const stepsOl = document.createElement("ol");
  stepsOl.id = "steps-ol";
  // This processing does NOT cover all of API's quirks.
  //   Some items do not use line breaks at all, or have a
  //   step-number on an entirely different line!
  const stepsArr = recipeData.meals[0].strInstructions.split(/[\r\n]+/);
  stepsArr.forEach((step, index) => {
    if (step === '') return;

    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    const stepStart = step.search(/[a-zA-Z]/);
    h3.textContent = index + 1;
    p.textContent = step.slice(stepStart);

    li.append(h3, p);
    stepsOl.append(li);
  });
  // finalize stepsDiv
  stepsDiv.append(stepsH2, stepsOl);
  recipe.append(stepsDiv);

  // Adds mascot
  const logo = document.createElement('img');
  logo.id = 'cute';
  logo.src = beansIco;
  logo.alt = 'Sweet Tooth';

  recipe.append(logo);
  main.append(recipe);

  // Scroll to top smoothly
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
};

// TODO: Render Error Toast
// make it so that all errors in fetching pass through here
const renderErrorToast = () => {

}

export {
  renderLanding,
  renderSingleRecipe,
  renderErrorToast,
  // renderRecipeOfTheDay
};
