import { combineReducers } from 'redux'
import pokemonReducers from './pokemonReducers'

const rootReducers = combineReducers({
  pokemons: pokemonReducers
})

export default rootReducers