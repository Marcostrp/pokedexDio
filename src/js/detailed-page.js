const pokemonDetailed = document.getElementById('pokemonDetailed');

function getPokemonNumberFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('numero');
}


function loadPokemonDetail(numero) {
    console.log('Buscando Pokémon número:', numero);
    pokeApi.getPokemon(numero).then((pokemon)  => {
        console.log('Pokémon retornado:', pokemon);

    pokeApi.getPokemon(numero).then((pokemon)  => {
    
        pokemonDetailed.className = `content detailPage ${pokemon.type}`;

        const newHTML = `
        <div class="topoDetail">
            <span class="name">${pokemon.name}</span>
            <span class="number">#${pokemon.number}</span>
        </div>

         <ol>
            <li>
                <div class="details">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
            </li>
         
        </ol>

        <img id="pokeImage" src="${pokemon.photo}" alt="${pokemon.name}">
        <div class="pokeDetail">
            
        </div>
        <div class="pagination">
            <button id="backward" type="button">
            ←
            </button>
            <button id="indexPage" type="button">
            Página Inicial
            </button>
            <button id="forward" type="button">
            →
            </button>
        </div>
        `;
        pokemonDetailed.innerHTML = newHTML

        document.getElementById('indexPage').addEventListener('click', function() {
        window.location.href = './index.html';
        });

        document.getElementById('forward').addEventListener('click', function() {
        window.location.href = `./detalhe.html?numero=${parseInt(numero) + 1}`;
        });

        if(numero > 1){
            document.getElementById('backward').addEventListener('click', function() {
            const prev = Math.max(1, parseInt(numero) - 1);
            window.location.href = `detalhe.html?numero=${prev}`;
            });
        } else {

        }
    });

    
    loadMorePokemonDetail(numero)

})
}

function loadMorePokemonDetail(numero) {
    console.log('Buscando Pokémon número:', numero);
    pokeApi.getPokemon(numero).then((pokemon)  => {
        console.log('Pokémon retornado:', pokemon);

    pokeApi.getPokemon(numero).then((pokemon)  => {
    
        const pokeDetailDiv = document.querySelector('.pokeDetail');
        
        const newHTML = `
            <div class="detailText">
                <ol class="caracteristicPokemon">
                   <li class="caract">Abilities</li>
                </ol>
                <ol class="detailCaracteristic">
                    ${pokemon.abilities.slice(0,5).map((ability) => `<li>${ability}</li>`).join('')}
                </ol> 
            </div>
            <div class="detailText">
                <ol class="caracteristicPokemon">
                    <li class="caract">Moves</li>
                </ol>
                <ol class="detailCaracteristic">
                    ${pokemon.moves.slice(0,5).map((move) => `<li>${move}</li>`).join('')}
                </ol> 
            </div>
        `;
        pokeDetailDiv.innerHTML = newHTML
    });
})
}



// Executa ao carregar a página

// function loadMorePokemonDetail(numero) {
//     console.log('Buscando Pokémon número:', numero);
//     pokeApi.getPokemon(numero).then((pokemon)  => {
//         console.log('Pokémon retornado:', pokemon);

//         const pokeDetailDiv = document.querySelector('.pokeDetail');
//         pokeDetailDiv.innerHTML = ""; // Limpa antes de inserir

//         // Limite de abilities (por exemplo, 5)
//         const limit = 5;
//         const abilities = pokemon.abilities.slice(0, limit);

//         abilities.forEach((ability, index) => {
//             const newHTML = `
//                 <div class="detailText">
//                     <ol class="caracteristicPokemon">
//                         <li class="caract">${ability}</li>
//                     </ol>
//                     <ol class="detailCaracteristic">
//                         ${pokemon.moves.slice(index * 5, (index + 1) * 5).map((move) => `<li>${move}</li>`).join('')}
//                     </ol>
//                 </div>
//             `;
//             pokeDetailDiv.innerHTML += newHTML;
//         });
//     });
// }



const numero = getPokemonNumberFromURL();

loadPokemonDetail(numero)





