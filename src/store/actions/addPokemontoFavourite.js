import axios from 'axios'
function addPokemon (pokemonId) {
  let dataPokemon = {}
  // untuk sync paramsnya lgsg payload
  // console.log(pokemon,"<<<< POKEMON")
  // return {
  //   type: 'ADD_POKEMON_TO_FAVOURITE',
  //   id: pokemon[0].id,
  //   data: pokemon
  // }

  // untuk async
  return function getData (pokemon) {
    return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(({data}) => {
      dataPokemon = data
      dataPokemon.image = data.sprites.front_default
      return axios.get(`https://pokeapi.co/api/v2/ability/${pokemonId}`)
      .then((results => {
        dataPokemon.description = results.data.effect_entries[0].effect // get description
        return pokemon({
          type: 'ADD_POKEMON_TO_FAVOURITE',
          id: pokemonId,
          data: dataPokemon
        })
      }))
    })
  }
  
}

export default addPokemon