const filter_input = document.querySelector('.input_ingredient')
let recipes = Array()

filter_input.addEventListener('keydown', (e) => {
    if(e.keyCode === 13) {
        e.preventDefault()
        addFilter(e)
    }
})

window.addEventListener('DOMContentLoaded', () => {
    localStorage.clear()
})

function updateLocalStorage() {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

function checkLocalStorage() {
    recipes = JSON.parse(localStorage.getItem('recipes'))
}

function addFilter(e) {
    let chosenIngredient = e.target.value.toLowerCase()
    const filters = document.querySelector('.filters')

    let divIngredient = document.createElement('div')
    const deleteIngredient = document.createElement('div')

    deleteIngredient.innerHTML = 'x'
    divIngredient.innerHTML = chosenIngredient.toLowerCase()
    divIngredient.classList.add('ingredientFiltered');
    deleteIngredient.classList.add('deleteBtn')
    divIngredient.dataset.ingredient = chosenIngredient

    divIngredient.appendChild(deleteIngredient)
    filters.insertAdjacentElement('beforeend', divIngredient);

    recipes.push(chosenIngredient);
    updateLocalStorage();

    clearForm()
    showFilteredRecipes()
}

function clearForm() {
    filter_input.value = ''
}

function showFilteredRecipes() {
    checkLocalStorage()
    let filteredRecipes = dataRecipe.filter((recipe) => {
        return recipes.every((chosenIngredient) => {
            return recipe.ingredientes.some((ingredient) => {
                return ingredient.includes(chosenIngredient);
            });
        });
    });

    createCardRecipe(filteredRecipes)

    if(filteredRecipes.length === 0) {
        document.querySelector('.quote').children[0].innerHTML = 'Nenhuma receita encontrada :('
    }

    deleteIngredient()
}

function deleteIngredient() {
    const deleteFilterBtns = document.querySelectorAll('.deleteBtn')
    for (const deleteBtn of deleteFilterBtns) {
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault()
            checkLocalStorage()
            recipes = recipes.filter(ingredient => ingredient !== e.target.parentNode.dataset.ingredient)
            e.target.parentNode.remove()
            updateLocalStorage();
            showFilteredRecipes()
        })
    }
}

