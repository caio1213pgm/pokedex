const listaPokemon = document.getElementById("pokemonList");
const butaoMaisPoke = document.getElementById("morePoke");
const btnDescricao = document.getElementById("btnDD");
const limit = 6;
let offset = 0;
const maxPoke = 151;

function descricaoPoke(pokemonId) {
  const descricao = document.getElementById(pokemonId);
  if (descricao.style.display === "flex") {
    descricao.style.display = "none";
  } else {
    descricao.style.display = "flex";
  }
}

function carregarPokemons(offset, limit) {
  function PokemonParaHtml(pokemon) {
    return `
              <li class="poke-card ${pokemon.type}" >
  
                  <span class="poke-number">#${pokemon.pokeId}</span>
                  <span class="poke-name">${pokemon.name}</span>
  
                  <div class="poke-card-dates">
  
                      <ol class="types">
                      ${pokemon.types
                        .map((type) => `<li class="type">${type}</li>`)
                        .join("")}
                      </ol>
                      
                      <img src="${pokemon.pokeImg}" alt="${pokemon.name}">
                  </div>

                  <button type="button" class="btnDescricao" id="btnDD" onclick="descricaoPoke(${
                    pokemon.pokeId
                  })">Descrição</button>
                  <div class="divDescricao" id="${pokemon.pokeId}">
                  <div class="descriptionDetails">
                        <h3>Peso: ${pokemon.peso}kg</h3>
                        <input type="range" id="cowbell" name="cowbell" min="0" max="1000" value="${
                          pokemon.peso
                        }" step="10" />
                  </div>
                  <div class="descriptionDetails">
                        <h3>HP: ${pokemon.vida}</h3>
                        <input type="range" id="cowbell" name="cowbell" min="0" max="100" value="${
                          pokemon.vida
                        }" step="10" />
                  </div>  
                  <div class="descriptionDetails">
                        <h3>Ataque: ${pokemon.ataque}</h3>
                        <input type="range" id="cowbell" name="cowbell" min="0" max="100" value="${
                          pokemon.ataque
                        }" step="10" />
                  </div>
                  <div class="descriptionDetails">
                        <h3>Defesa: ${pokemon.defesa}</h3>
                        <input type="range" id="cowbell" name="cowbell" min="0" max="100" value="${
                          pokemon.defesa
                        }" step="10" />
                  </div>
                  <div class="descriptionDetails">
                        <h3>Velocidade: ${pokemon.velocidade}</h3>
                        <input type="range" id="cowbell" name="cowbell" min="0" max="150" value="${
                          pokemon.velocidade
                        }" step="10" />
                  </div>
                        <button type="button" class="btnDescricao" id="btnDD" onclick="descricaoPoke(${
                          pokemon.pokeId
                        })">Fechar</button>
                  </div>

  
              </li>
      `;
  }

  pokeApi.getAllPokemons(offset, limit).then((pokemons = []) => {
    const meuHtml = pokemons.map(PokemonParaHtml).join("");
    listaPokemon.innerHTML += meuHtml;
  });
}

carregarPokemons(offset, limit);

butaoMaisPoke.addEventListener("click", () => {
  offset += limit;

  const qtdLimite = offset + limit;

  if (qtdLimite >= maxPoke) {
    const novoLimit = maxPoke - offset;
    carregarPokemons(offset, novoLimit);
    butaoMaisPoke.style.display = "none";
  } else {
    carregarPokemons(offset, limit);
  }
});
