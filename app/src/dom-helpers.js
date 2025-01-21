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
  const section = document.querySelector("section#recipe-of-the-day");

  const h1 = document.createElement("h1");
  h1.textContent = `Recipe of the day: ${recipe.strMeal}`;

  const img = document.createElement("img");
  img.src = recipe.strMealThumb;
  img.alt = recipe.strMeal;

  section.append(img, h1);
};

export { renderAllRecipes, renderRecipeOfDay };
