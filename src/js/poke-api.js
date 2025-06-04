const pokeApi = {}

function convertPokeApiDetail (pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.number = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const moves = pokeDetail.moves.map((moveSlot) => moveSlot.move.name)

    pokemon.types = types
    pokemon.type = type
    pokemon.abilities = abilities
    pokemon.moves = moves

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetail)
}

pokeApi.getPokemons = (offset = 0, limit = 3) => {
    const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons)=> pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        
}

pokeApi.getPokemon = function(number) {
    const url = `https://pokeapi.co/api/v2/pokemon/${number}`;
    return fetch(url)
        .then(response => response.json())
        .then(convertPokeApiDetail) // reutiliza o conversor!
        .catch(() => null);
};
