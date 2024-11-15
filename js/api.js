const pokeApi = {};

function convertToPokeClass(pokeDetail){
  const pokemon = new Pokemon()

  pokemon.name = pokeDetail.name;
  pokemon.pokeId = pokeDetail.id;
  pokemon.peso = pokeDetail.weight;
  pokemon.altura = pokeDetail.height;
  pokemon.xp = pokeDetail.base_experience;
  pokemon.vida = pokeDetail.stats[0].base_stat
  pokemon.ataque = pokeDetail.stats[1].base_stat
  pokemon.defesa = pokeDetail.stats[2].base_stat
  pokemon.velocidade = pokeDetail.stats[5].base_stat


  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
  const [type] = types
  pokemon.types = types
  pokemon.type = type

  pokemon.pokeImg = pokeDetail.sprites.other.dream_world.front_default

  return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertToPokeClass)
}

pokeApi.getAllPokemons = (offset = 0,limit = 7) => {
  const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) =>  jsonBody.results)
    .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
    .then((detailRequests) => Promise.all(detailRequests))
    .then((pokemonsDetails) => pokemonsDetails)
}
