function createNode(element) {
    return document.createElement(element)
}

function append(parent, el) {
    return parent.appendChild(el)
}

const section = document.querySelector('.cards')
let url = window.location.href
let salgadosPage = 'salgados.html'
let docesPage = 'doces.html'
let dataRecipe


fetch("https://receitas-7774.onrender.com/receitas")
    .then((response) => response.json())
    .then(function(data) {
        //verificação da localização da pagina
        if(url.match(salgadosPage)) {
            dataRecipe = data.filter((item) => item.categoria === 'salgados')
        } else if(url.match(docesPage)) {
            dataRecipe = data.filter((item) => item.categoria === 'doces')
        }
        createCardRecipe(dataRecipe)
    })
    .catch(function(error) {
        console.log(error)
    })

function openRecipePage() {
    const buttons = document.querySelectorAll('button')
    const title = document.querySelector('.title')
    for(let button of buttons) {
        button.addEventListener('click', (e) => {
            e.preventDefault()
            section.innerHTML = ''
            title.innerHTML = `Receita de ${e.target.parentNode.parentNode.querySelector('.title-card').innerHTML}`
            showRecipeIngredients(e)
        })
    }
}

function createCardRecipe(dataRecipe) {
    section.innerHTML = ''
    dataRecipe.forEach((receita) => {
        //criando elementos
        let divAll = createNode('div')
        divAll.classList.add('card')
        let divImage = createNode('div')
        let img = createNode('img')
        img.setAttribute('alt', `imagem da receita de ${receita.nome}`)
        let divText = createNode('div')
        let title = createNode('p')
        title.classList.add('title-card')
        let description = createNode('p')
        let author = createNode('p')
        author.classList.add('small-text')
        let porcao = createNode('p')
        porcao.classList.add('small-text')
        let botao = createNode('button')
        botao.setAttribute('id', `${receita._id}`)

        //atribuindo valores a eles
        img.src = `${receita.imagem}`
        title.innerHTML = `${receita.nome}`
        description.innerHTML = `${receita.descricao}`
        author.innerHTML = `por: <a href=${receita.contato} target="_blank">${receita.autor}</a>`
        porcao.innerHTML = `serve: ${receita.rendimento}`
        botao.innerHTML = 'Ver Receita'

        //chamando eles
        append(divImage, img)
        append(divText, title)
        append(divText, description)
        append(divText, author)
        append(divText, porcao)
        append(divText, botao)
        append(divAll, divImage)
        append(divAll, divText)
        append(section, divAll)
    })
    openRecipePage()
}

function showRecipeIngredients(e) {
    const currentRecipe = dataRecipe.filter((recipe) => recipe._id === e.target.id)[0]
    let recipe_template = `
        <section class="recipe">
            <img src=${currentRecipe.imagem} alt="">
            <span class="recipe_description">${currentRecipe.descricao}</span>
            <span class="recipe_rend">Rende: ${currentRecipe.rendimento}</span>
            <span class="recipe_spend">Tempo de preparo: ${currentRecipe.tempo}</span>
            <span class="recipe_author">Autor da receita: ${currentRecipe.autor}</span>
            <span class="section_title">Ingredientes:</span>
            <ul>
                ${upIngredients(currentRecipe)}
            </ul>
            <span class="section_title">Segredo:</span>
            <span class="secret">${currentRecipe.segredo}</span>
        </section>
    `
    section.insertAdjacentHTML('afterbegin', recipe_template)
}

function upIngredients(recipe) {
    let ingredientsHtml = '';
    recipe.ingredientes.forEach((ingrediente) => {
        ingredientsHtml += `<li class='ingredient'>${ingrediente}</li>`;
    });
    return ingredientsHtml;
}


