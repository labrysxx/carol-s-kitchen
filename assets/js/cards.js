function createNode(element) {
    return document.createElement(element)
}

function append(parent, el) {
    return parent.appendChild(el)
}

const section = document.querySelector('.cards')
let idBotao
let url = window.location.href
let salgadosPage = 'salgados.html'
let docesPage = 'doces.html'
let dataRecipe


fetch("js/db.json")
    .then((response) => response.json())
    .then(function(data) {
        //verificação da localização da pagina
        if(url.match(salgadosPage)) {
            dataRecipe = data.salgados
        } else if(url.match(docesPage)) {
            dataRecipe = data.doces
        }
        return dataRecipe.map(function(receita) {
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
            botao.setAttribute('id', `${receita.id}`)

            //atribuindo valores a eles
            img.src = receita.imagem
            title.innerHTML = `${receita.nome}`
            description.innerHTML = `${receita.descricao}`
            author.innerHTML = `por: <a href=${receita.contato} target="_blank">${receita.autor}</a>`
            porcao.innerHTML = `serve: ${receita.rendimento}`
            botao.innerHTML = `<a href="../receita.html">Ver Receita</a>`

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

            botao.addEventListener('click', (e) => {
                idBotao = e.target.id
                console.log(idBotao)
            })

        })

    })
    .catch(function(error) {
        console.log(error)
    })



