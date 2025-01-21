// local storage implementations
const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
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

const fetchAllCategories = async () => {
  try {
    const response = await fetch(categoriesURL);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const categoriesList = await response.json();
    console.log(categoriesList);
    return categoriesList;
  } catch (error) {
    console.warn(error);
  }
}

const fetchCategoryItems = async (category) => {
  try {
    const response = await fetch(categoryItemsURL+category);
    if (!response.ok) {
      throw new Error(`Error code ${response.status}`);
    }
    const categoriesItems = await response.json();
    return categoriesItems;
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
}
