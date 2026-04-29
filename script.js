document.getElementById("searchBtn").addEventListener("click", function () {
  let ingredient = document.getElementById("ingredient").value.trim();
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  if (ingredient === "") {
    resultsDiv.innerHTML = "Please enter an ingredient.";
    return;
  }

  // Fetch recipes from TheMealDB API
  fetch('https://www.themealdb.com/api/json/v1/1/search.php?s={meal_name}'.replace("{meal_name}", ingredient))
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = "";

      if (!data.meals) {
        resultsDiv.innerHTML = "No recipes found.";
        return;
      }

      data.meals.forEach(meal => {
        let mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" width="200">
          <br>
          <button onclick="getRecipe(${meal.idMeal})">View Details</button>
        `;

        resultsDiv.appendChild(mealCard);
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = "Error fetching recipes.";
      console.error(error);
    });
});

// Function to fetch full recipe details
function getRecipe(id) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${id}`)
    .then(response => response.json())
    .then(data => {
      let meal = data.meals[0];
      let resultsDiv = document.getElementById("results");

      resultsDiv.innerHTML = `
        <div class="recipe-card">
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" class="meal-image"><br><br>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Area:</strong> ${meal.strArea}</p>
          <h3>Instructions:</h3>
          <p>${meal.strInstructions}</p>

          ${meal.strYoutube ? `
            <h3>🎥 Watch Recipe Video:</h3>
            <div class="video-container">
              <iframe 
                src="https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}"
                frameborder="0" allowfullscreen>
              </iframe>
            </div>
          ` : ""}

          <br>
          <button onclick="location.reload()">Back to Search</button>
        </div>
      `;
    });
}
function showIndianRecipes() {
  let resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading Indian recipes...";

  fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=Indian")
    .then(response => response.json())
    .then(data => {
      resultsDiv.innerHTML = "";
      data.meals.forEach(meal => {
        let mealCard = document.createElement("div");
        mealCard.classList.add("meal-card");

        mealCard.innerHTML = `
          <h2>${meal.strMeal}</h2>
          <img src="${meal.strMealThumb}" width="200">
          <br>
          <button onclick="getRecipe(${meal.idMeal})">View Details</button>
        `;

        resultsDiv.appendChild(mealCard);
      });
    })
    .catch(error => {
      resultsDiv.innerHTML = "Error fetching Indian recipes.";
      console.error(error);
    });
}

