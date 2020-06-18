import React from 'react'
import { Row, Empty, Col } from 'antd'
import "antd/dist/antd.css"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import ListPokemon from '../components/ListPokemon'

const readMore = (description) => {
  let newDescription = []
  if(description.length > 30) {
    description = description.split('')
    for (let i = 0; i < description.length; i++) {
      if(i < 30) {
        newDescription += description[i]
      }else {
        return newDescription += '...'
      }
    }
  } else {
    newDescription = description
  }
  return newDescription
}

export default function PokemonFavouritePage() {
  
  const history = useHistory()
  const pokemons = useSelector(state => state.pokemons)
  
  const seeDetail = (id) => {
    history.push(`/detailPokemon/${id}`)
  }

  return (
    <>
      <Row>
        {
          pokemons.length < 1 ?
          <>
          <Col span={8}></Col>
          <Col span={8}>
            <Empty style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80vh'}} />
          </Col>
          <Col span={8}></Col>
        </>
        :
        pokemons.map(( pokemon ) => {
          let description = readMore(pokemon.data.description)
          return <ListPokemon key={pokemon.id} pokemon={pokemon.data} description={description} seeDetail={seeDetail} span={6} />
        })
        }
      </Row>
    </>
  )
}