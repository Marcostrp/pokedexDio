const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const maxRecord = 151
const limit = 10
let offset = 0

// function convertTypesToLi(pokemonTypes){
//     return pokemonTypes.map((typeSlot) => `<li id="type">${typeSlot.type.name}</li>`)

// }

// função que manipula o HTML com os itens do json
// <li id="type">Grass</li> substituido pela função convertTypesToLi


// constante que identifica os elementos no HTML através do iD

function pokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <a href="detalhe.html?numero=${pokemon.number}">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </a>
                
        </li>
    `;
}
        
// ----- Evolução do código -----
// fetch(url)

    // ----- Código verboso-----
    //
    // .then(function(response){
    // console.log(response);
    // })
    // .catch(function(error){
    //     console.error(error)
    // })
    // .finally(function(){
    //     console.log("Requisição aceita")
    // });
    // 

    // ---- código menor ----
    //
    // .then((response) => response.json())
    // .then((jsonBody) => jsonBody.results)
    // .then(pokemons => {
    //      for (let i = 0; i < pokemons.length; i++) {
    //          const pokemon = pokemons[i];
    //          pokemonList.innerHTML += pokemonToLi(pokemon)
    //      }      
    // })

// pokeApi.getPokemons().then((pokemons = [])  => {

    // ------- método 3 - menos verboso
    // 
    // pokemons.map lança converte o pokemon através da função pokemonToLi
    // e junta com o join, sem qualquer separação ('')!!
    // pokemonLista.innerHTML lança o resultado da conversão no corpo do HTML

    // pokemonList.innerHTML += pokemons.map(pokemonToLi).join('')
   
    // ------- método 1 e 2 ------
    // 
    // varre o array 'pokemons', o pokemon é convertido pelo pokemonToLi
    // o pokemonToLi é adicionado pelo innerHTML ao pokemonList
    // que é resultado de uma busca de id no HTM
    //

    // const listItens = []
    // for (let i = 0; i < pokemons.length; i++) {
    //     const pokemon = pokemons[i];
    //     listItens.push(pokemonToLi(pokemon))
    //     // --- método que renderiza varrendo e renderizando um por um
    //     // pokemonList.innerHTML += pokemonToLi(pokemon)
    // }
    // console.log(listItens)
    // -------

    // -------
    // método 2
    // cria uma lista com o map, que pega o pokemon (da pokeApi) e 
    // retorna convertido pelo pokemonToLi e
    // adiciona o pokemon convertido em html através do innerHTML
    //

    // const newList = pokemons.map((pokemon) => {
    //     return pokemonToLi(pokemon)
    // })
    // const newHTML = newList.join('')
    // pokemonList.innerHTML += newHTML
    // -------
// })


function loadPokemonItens(offset, limit) {

    pokeApi.getPokemons(offset, limit).then((pokemons = [])  => {
        const newHTML = pokemons.map((pokemon) => `
        <li class="pokemon ${pokemon.type}">
            <a href="detalhe.html?numero=${pokemon.number}">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </a>
         </li>
         `).join('')
        pokemonList.innerHTML += newHTML
    })
}

loadPokemonItens(offset, limit)



loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordNextPage = offset + limit

    if(qtdRecordNextPage >= maxRecord){
        const newLimit = maxRecord - offset
        loadPokemonItens(offset, newLimit)
        loadMoreButton.parentElement.removeChild(loadMoreButton)

    } else {
        loadPokemonItens(offset, limit)
    }

})


