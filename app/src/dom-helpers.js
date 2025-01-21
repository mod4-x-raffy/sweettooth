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

const renderRecipeOfDay = (recipe) => {
  const section = document.querySelector("section#recipe-banner");
  section.innerHTML = '';

  const div = document.createElement('div');
  div.id = 'recipe-banner';
  div.dataset.idMeal = recipe.idMeal;

  const h1 = document.createElement("h1");
  h1.textContent = `Recipe of the day: ${recipe.strMeal}`;

  const img = document.createElement("img");
  img.src = recipe.strMealThumb;
  img.alt = recipe.strMeal;

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

// TODO: render error toast
const renderErrorToast = () => {

}

export {
  renderAllRecipes,
  renderRecipeOfDay,
  renderSingleRecipe
};
