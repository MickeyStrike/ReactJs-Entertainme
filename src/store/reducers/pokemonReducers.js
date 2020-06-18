const initialState = []

const pokemonReducers = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_POKEMON_TO_FAVOURITE":
      return [...state, { id: action.id, data: action.data } ]
    default:
      return state
  }
}

export default pokemonReducers