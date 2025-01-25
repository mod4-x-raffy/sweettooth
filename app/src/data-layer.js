import { renderErrorToast } from "./dom-helpers";

// -------------- LOCALSTORAGE -------------- //
const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
}

const initSaved = () => {
  if (getLocalStorage('sweettooth-saved') === null) {
    localStorage.setItem('sweettooth-saved', JSON.stringify({}));
  }
}

// -------------- SAVED LIST FEATURES -------------- //
const toggleSaved = (data) => {
  initSaved();
  const currentSaved = getLocalStorage('sweettooth-saved');
  const idStr = String(data.idMeal);
  // If it exists, remove it
  if (currentSaved[idStr] !== undefined) {
    delete currentSaved[idStr];
    setLocalStorage('sweettooth-saved', currentSaved);
    return false;
  // If it doesn't exist, add it
  } else {
    currentSaved[idStr] = {
      strMeal: data.strMeal,
      strMealThumb: data.strMealThumb
    }
    setLocalStorage('sweettooth-saved', currentSaved);
    return true;
  };
}

const checkSaved = (id) => {
  initSaved();
  const currentSaved = getLocalStorage('sweettooth-saved');
  if (currentSaved[String(id)] !== undefined) return true;
  return false;
}

const getSaved = () => {
  initSaved();
  return getLocalStorage('sweettooth-saved');
}

// API endpoints and external assets used.
const categoriesURL = `https://themealdb.com/api/json/v1/1/list.php?c=list`
const categoryItemsURL = `https://themealdb.com/api/json/v1/1/filter.php?c=`;
const detailsURL = `https://themealdb.com/api/json/v1/1/lookup.php?i=`
const searchURL = `https://themealdb.com/api/json/v1/1/search.php?s=`
// const areasURL = `https://themealdb.com/api/json/v1/1/list.php?a=list`
// const randomURL = `https://themealdb.com/api/json/v1/1/random.php`
// const svgPath = '/assets/world.svg';

// Fetches all recipe categories from theMealDB.
//   Only fetches on refresh/first load to save time.
let categoriesList = {};
const fetchAllCategories = async () => {
  try {
    if (Object.keys(categoriesList).length !== 0) return categoriesList;
    const response = await fetch(categoriesURL);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    categoriesList = await response.json();
    return categoriesList;
  } catch (error) {
    console.warn(error);
    renderErrorToast(error);
  }
}


// Fetches all recipes under a specific category from theMealDB.
//   Only fetches on refresh/first load to save time.
let categoriesItems = {};
const fetchCategoryItems = async (category) => {
  try {
    if (categoriesItems[category] !== undefined) return categoriesItems[category];
    const response = await fetch(categoryItemsURL+category);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    categoriesItems[category] = await response.json();
    return categoriesItems[category];
  } catch (error) {
    console.warn(error);
    renderErrorToast(error);
  }
}

// Fetches the complete data for a single recipe using its id.
const fetchSingleRecipe = async (id) => {
  try {
    const response = await fetch(detailsURL+id);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const recipeData = await response.json();
    return recipeData;
  } catch (error) {
    console.warn(error);
    renderErrorToast(error);
  }
}

// Fetches the complete data for a single recipe using its name.
const searchRecipe = async (name) => {
  try {
    const response = await fetch(searchURL+name);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const recipeData = await response.json();
    return recipeData;
  } catch (error) {
    console.warn(error);
    renderErrorToast(error);
    return null;
  }
}

// Fetches the complete data for a random recipe.
//   Currently NOT implemented!
const fetchRandomRecipe = async () => {
  try {
    const response = await fetch(randomURL);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const recipeData = await response.json();
    console.log(recipeData);
    return recipeData;
  } catch (error) {
    console.warn(error);
    renderErrorToast(error);
    return null;
  }
}

export {
  setLocalStorage,
  getLocalStorage,
  fetchSingleRecipe,
  fetchCategoryItems,
  fetchAllCategories,
  searchRecipe,
  toggleSaved,
  checkSaved,
  getSaved
  // fetchRandomRecipe,
}
