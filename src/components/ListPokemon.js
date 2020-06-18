import React from 'react';
import { Card, Col, Button } from 'antd'

export default function listPokemon (props) {
  const { pokemon, description, setPokemon, span, seeDetail, addToFavourite } = props
  const { Meta } = Card

  const ButtonSelector = () => {
    if(addToFavourite) {
      return (
        <>
          <Button type="link" onClick = {() => seeDetail(pokemon.id)}>See Detail</Button> 
          <Button type="link" onClick = {() => addToFavourite(pokemon.id)}>Add To Favourite</Button>
        </>
      )
    } else if (seeDetail) {
      return (  
        <>
          <Button type="link" onClick = {() => seeDetail(pokemon.id)}>See Detail</Button> 
        </>
      )
    } else {
      return (
        <Button type="link" onClick = {() => setPokemon(pokemon)}>Read More</Button>
      )
    }
  }

  return (
    <Col key = { pokemon.id } span = { span } style={{marginTop: '2vh'}}>
        <Card
        key = { pokemon.id }
        hoverable
        style = {{ width: 240, cursor: 'move' }}
        cover = { <img src = { pokemon.image } alt = "no-data" /> }
        >
        <Meta
        title = { pokemon.name } 
        description = { description.length > 30 ? <> <span> {description} </span> <ButtonSelector></ButtonSelector> </> : description } />
        </Card>
    </Col>
  )
}
