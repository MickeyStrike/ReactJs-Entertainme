import { useState, useEffect } from 'react'
import axios from 'axios'

const getDataPokemon = (pokemonsUrl) => {
  return pokemonsUrl.map((url) => {
    return axios({
      method: 'GET',
      url
    })
  })
}

const getDescription = (pokemonId) => {
  return axios({
    method: 'GET',
    url:`https://pokeapi.co/api/v2/ability/${pokemonId}`
  })
}

export default function useFetecher(url) {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error,setError] = useState(null)
  // useEffect = componentDidMount
  useEffect(() => {
    let tempPokeData = []
      setLoading(true)
      axios ({
        method: 'GET',
        url
      })
      .then(({data}) => {
        if(data.id) { // ==== getOnePokemon =====
          tempPokeData = data
          return getDescription(data.id) // getOneDescriptionPokemon
        } else {
          let newResult = []
          data.results.map((pokemon) => {
            return newResult = [...newResult,pokemon.url]
          })
          return getDataPokemon (newResult)
        }
      })
      .then((dataPokemon) => {
        // console.log(dataPokemon.data.effect_entries[0].effect,"<<<<<<<<<< DESC")
        if(dataPokemon.data !== undefined) { // GET DESCRIPTION ONE POKEMON
          tempPokeData.description = dataPokemon.data.effect_entries[0].effect
          setData(tempPokeData)
        } else {
          return Promise.all(dataPokemon)
        }
      })
      .then((pokeData) => {
        let description = []
        pokeData.forEach((value) => {
          description = [...description,getDescription(value.data.id)]
        })
        tempPokeData = pokeData
        return Promise.all(description)
      })
      .then ((result) => {
        let pokemons = []
        tempPokeData.forEach((e,i) => {
          const { name, id, types } = e.data
          const image = e.data.sprites.front_default
          const newTypes = types.map((el) => el.type.name)
          let { effect } = result[i].data.effect_entries[0]
          pokemons = [...pokemons,{ id, name, types: newTypes, image, description: effect }]
        })
        setData(pokemons)
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  },[url])

  return { data, loading, error }
}