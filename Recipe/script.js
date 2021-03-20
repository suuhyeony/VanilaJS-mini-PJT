getRandomMeal();

const meals = document.querySelector('.randomMeal-container');

async function getRandomMeal() {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    
    const data = await response.json();
    const randomMeal = data.meals[0]
    console.log(randomMeal);

    loadRandomMeal(randomMeal, true);
}


function loadRandomMeal(mealData, random = false) {
    const meal = document.createElement('div');
    meal.classList.add('div');

    meal.innerHTML = `
        <div class="meal-header">
            ${random ? `<span class="random">
            Random Recipe
            </span>` : ''}
            <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
        </div>
        <div class="meal-body">
            <h4>${mealData.strMeal}</h4>
            <button class="fav-btn">
                <i class="fa fa-heart"></i>
            </button>
        </div>
    `;

    meals.appendChild(meal);
}