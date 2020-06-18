import React,{ useState } from 'react'
import './styles.css'
import { Layout, Menu } from 'antd'
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined, } from '@ant-design/icons';
import "antd/dist/antd.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Dashboard from './views/DashboardPage'
import ListPokemon from './views/ListPokemonPage'
import DetailPokemon from './views/DetailPokemonPage'
import PokemonFavourite from './views/PokemonFavouritePage'

export default function App () {
  let [collapsed,setCollapsed] = useState(false)

  const { Header, Content, Sider } = Layout;
  const { SubMenu } = Menu;

  const onCollapse = collapsed => {
    setCollapsed( collapsed );
  };

  return (
    <>
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <DesktopOutlined />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <UserOutlined />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <TeamOutlined />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <FileOutlined />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="header">
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
              <Menu.Item key="1"><Link to="/dashboard">Dashboard</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/listPokemon">List Pokemon</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/pokemonFavourite">Pokemon Favourite</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/listPokemon">
                <ListPokemon />
              </Route>
              <Route path="/detailPokemon/:id">
                <DetailPokemon />
              </Route>
              <Route path="/pokemonFavourite">
                <PokemonFavourite></PokemonFavourite>
              </Route>
            </Switch>
            </div>
          </Content>
        </Layout>
      </Layout>
    </Router>
    </>
  )
}
