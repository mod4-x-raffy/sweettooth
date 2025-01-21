const renderAllRecipes = (allRecipes) => {
  const recipesUL = document.querySelector("ul#dish-catalog");

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

const renderRecipeOfDay = (recipe) => {
  const section = document.querySelector("section#recipe-banner");

  const h1 = document.createElement("h1");
  h1.textContent = `Recipe of the day: ${recipe.strMeal}`;

  const img = document.createElement("img");
  img.src = recipe.strMealThumb;
  img.alt = recipe.strMeal;

  section.append(img, h1);
};

const renderSingleRecipe = (recipeData) => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  
  // -------------- BANNER -------------- //
  const banner = document.createElement('section');
  banner.id = 'recipe-banner';

  const foodImg = document.createElement('img');
  foodImg.src = recipeData.meals[0].strMealThumb;
  foodImg.alt = recipeData.meals[0].strMeal;

  // TODO: Recipe banner background image
  // idk yet maybe same image but with offset, blur
  // monochrome, and whatever the fuck else 
  // i'm usually supposed to do here
  // const backImg = document.createElement('img');

  // finalize banner section
  // banner.append(backImg, foodImg);
  banner.append(foodImg);
  main.append(banner);
}

export { renderAllRecipes, renderRecipeOfDay, renderSingleRecipe };
