import React from 'react'
import { useParams } from 'react-router-dom'
import useFetcher from '../helpers/useFetcher'
import { Row, Col, Skeleton } from 'antd'

export default function DetailPokemonPage() {
  const { id } = useParams()
  
  const { data: pokemon, loading: loadingPokemon, error: errorPokemons } = useFetcher(`https://pokeapi.co/api/v2/pokemon/${id}`)

  if (!errorPokemons) {
    return <p>{errorPokemons}</p>
  }
  let name = pokemon.name.split('')
  name[0] = name[0].toUpperCase()
  name.join('')
  return (
    <>
    {
      loadingPokemon ? 
      <Skeleton></Skeleton> 
      :
      <>
        <Row style={{display: 'flex',justifyContent: 'center', alignItems: 'center', width: '100%'}}>
          <h1 style={{fontSize: '40px'}}>{name}</h1>
        </Row>
        <Row style={{display: 'flex',justifyContent: 'center', alignItems: 'center', width: '100%', height: '60vh'}}>
          <Col span={12} style={{textAlign: 'center'}}>
            <img src={pokemon.sprites.front_default} alt="no data" style={{width: '240px', height: '240px'}}></img>
          </Col>
          <Col span={12} style={{textAlign: 'center'}}>
            <h1>{pokemon.description}</h1>
          </Col>
        </Row>
      </>
    }
    </>
  )
}
