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

const toggleSaved = (data) => {
  initSaved();
  const currentSaved = getLocalStorage('sweettooth-saved');
  const idStr = String(data.idMeal);
  console.log(currentSaved);
  // if it exists, remove it
  if (currentSaved[idStr] !== undefined) {
    delete currentSaved[idStr];
    setLocalStorage('sweettooth-saved', currentSaved);
    return false;
  // if it doesn't exist, add it
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

const categoriesURL = `https://themealdb.com/api/json/v1/1/list.php?c=list`
const categoryItemsURL = `https://themealdb.com/api/json/v1/1/filter.php?c=`;
const detailsURL = `https://themealdb.com/api/json/v1/1/lookup.php?i=`
const searchURL = `https://themealdb.com/api/json/v1/1/search.php?s=`
const randomURL = `https://themealdb.com/api/json/v1/1/random.php`

// NOTE: API Endpoints
// Search by name
//   www.themealdb.com/api/json/v1/1/search.php?s=${Name}
// Lookup by id (details)
//   www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}
// Look up a random meal (details)
// Not really needed, can just primitively randomize
// for landing page "random" meal of the day
//   www.themealdb.com/api/json/v1/1/random.php
// List all categories
//   www.themealdb.com/api/json/v1/1/list.php?c=list
// Filter by category
//   www.themealdb.com/api/json/v1/1/filter.php?c=${category}
// List all areas
//   www.themealdb.com/api/json/v1/1/list.php?a=list
// Filter by area
//   www.themealdb.com/api/json/v1/1/filter.php?a=${area}
// Generate a single random meal
//   https://www.themealdb.com/api/json/v1/1/random.php

// const fetchAllRecipes = async (category) => {
//   try {
//     const response = await fetch(categoryItemsURL+category);
//     if (!response.ok) {
//       throw new Error(`Error code ${response.status}`);
//     }
//     const categoryRecipes = await response.json();
//     return categoryRecipes;
//   } catch (error) {
//     console.warn(error);
//   }
// };

let categoriesList = {};
const fetchAllCategories = async () => {
  try {
    if (Object.keys(categoriesList).length !== 0) return categoriesList;
    const response = await fetch(categoriesURL);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    categoriesList = await response.json();
    console.log(categoriesList);
    return categoriesList;
  } catch (error) {
    console.warn(error);
  }
}

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
  }
}

const fetchSingleRecipe = async (id) => {
  try {
    const response = await fetch(detailsURL+id);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const recipeData = await response.json();
    console.log(recipeData);
    return recipeData;
  } catch (error) {
    console.warn(error);
  }
}

const searchRecipe = async (name) => {
  try {
    const response = await fetch(searchURL+name);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const recipeData = await response.json();
    console.log(recipeData);
    return recipeData;
  } catch (error) {
    console.warn(error);
    return null;
  }
}

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
    return null;
  }
}

export {
  // fetchAllRecipes,
  setLocalStorage,
  getLocalStorage,
  fetchSingleRecipe,
  fetchCategoryItems,
  fetchAllCategories,
  fetchRandomRecipe,
  searchRecipe,
  toggleSaved,
  checkSaved,
  getSaved
}
