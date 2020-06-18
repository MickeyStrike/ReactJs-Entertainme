import React from 'react'
import '../styles.css'
import { Row, Col, Card, Avatar, Skeleton, notification } from 'antd'
import { 
  EditOutlined, 
  EllipsisOutlined, 
  SettingOutlined
} from '@ant-design/icons'
import "antd/dist/antd.css"
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import ListPokemon from '../components/ListPokemon'
import useFetcher from '../helpers/useFetcher'
import allAction from '../store/actions'

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

const SkeletonCard = () => {
  const { Meta } = Card
  let twentyCard = []
  for (let i = 0; i < 20; i++) {
    twentyCard = 
    [...twentyCard, 
      (
        <Col key={i} span = { 6 } style={{marginTop: '2vh'}}>
          <Card
            style={{ width: 300, marginTop: 16 }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
          <Skeleton avatar active>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
          </Card>
        </Col>
      )
    ]
  }
  return twentyCard
}

export default function ListPokemonPage () {

  const history = useHistory()
  const dispatch = useDispatch()
  const pokemon = useSelector(state => state.pokemons)

  const { data: pokemons, loading: isLoadingPokemon, error: errorPokemons } = useFetcher (
    `https://pokeapi.co/api/v2/pokemon/?offset=20&limit=40`
  )
  
  const seeDetail = (id) => {
    history.push(`/detailPokemon/${id}`)
  }

  const addToFavourite = (id) => {
    let filter = pokemons.filter((pokemon) => {
      return pokemon.id === id
    })
    // filter sebelum dispatch agar tidak ada pokemon fav kembar
    let filteredState = pokemon.filter((data) => data.id === filter[0].id)
    if (filteredState.length > 0) {
      notification['success'] ({message: 'Success Add to Favourite', description: 'You have already added this pokemon to favorite'})
    } else {
      dispatch(allAction.addPokemon(id))
      notification['success'] ({message: 'Success Add to Favourite', description: 'You have already added this pokemon to favorite'});
    }
  }

  if (errorPokemons) {
    return <p>{errorPokemons}</p>
  }

  return (
    <>
      <Row style={{overflowY:'scroll', maxHeight: '85vh'}}>
        {
        isLoadingPokemon ? 
        <SkeletonCard /> :
        pokemons.map(( pokemon ) => {
          let description = readMore(pokemon.description)
          return <ListPokemon key={pokemon.id} pokemon={pokemon} description={description} seeDetail={seeDetail} addToFavourite={addToFavourite} span={6} />
        })
        }
      </Row>
    </>
  )
}
