import React,{ useState } from 'react'
import '../styles.css'
import { Row, Col, Empty, Card, Avatar, Skeleton} from 'antd'
import { 
  EditOutlined, 
  EllipsisOutlined, 
  SettingOutlined
} from '@ant-design/icons';
import "antd/dist/antd.css";

import ListPokemon from '../components/ListPokemon'
import useFetcher from '../helpers/useFetcher'

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
  let eightCard = []
  for (let i = 0; i < 8; i++) {
    eightCard = 
    [...eightCard, 
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
  return eightCard
}

export default function DashboardPage () {
  let [pokemon,setPokemon] = useState(null)

  const { data: pokemons, loading: isLoadingPokemon, error: errorPokemons } = useFetcher (
    `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=8`
  )
  
  if (errorPokemons) {
    return <p>{errorPokemons}</p>
  }

  return (
    <>
        <Row>
            <Col span={12} style>
            <Row justify="space-around" style={{height: '80vh',overflowY: 'scroll'}}>
                {
                isLoadingPokemon ? 
                <SkeletonCard /> :
                pokemons.map(( pokemon ) => {
                    let description = readMore(pokemon.description)
                    return <ListPokemon key={pokemon.id} pokemon={pokemon} description={description} setPokemon={setPokemon} span={12} />
                })
                }
            </Row>
            </Col>
            <Col span={12}>
            <Row justify="space-around" style={{display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height:'100%'}}>
                <Col span={12}>
                {pokemon == null ? <Empty /> : <img src={pokemon.image} style={{height: 240, width: 240}} alt="No Data"></img>}
                </Col>
                <Col span={12}>
                {pokemon == null ? 'No Data Found' : pokemon.description}
                </Col>
            </Row>
            </Col>
        </Row>
    </>
  )
}
