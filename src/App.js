import React from 'react'
import { Switch, Route, Redirect } from 'react-router';
import Titlebar from './components/titlebar';
import Navbar from './components/navbar';
import Camelot from './containers/Camelot';
import Key from './containers/Key';
import Bpm from './containers/BPM';
import Chart from './components/chart';
import { Grid, Container } from 'semantic-ui-react';

const appStyle = {
  width:'100vw', 
  height:'100vh',
}
const containerStyle = {
  width:'100%',
  height:'100%',
  // border:'1px solid black',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}

export default class App extends React.Component {
  render(){
    return (
      <div style={appStyle} className="app">
        <Titlebar />
        <Grid style={{paddingTop:'1em'}}>
          <Grid.Column style={{paddingTop: '7em', height:`100vh`}} width={2}>
            <Navbar />
          </Grid.Column>
          <Grid.Column width={10} style={{padding:0, paddingTop:'7em'}}>
            <Container style={containerStyle}>
              <Switch>
                <Route path="/" exact component={Camelot} />
                <Route path="/camelot" exact component={Camelot} />
                <Route path="/bpm" exact component={Bpm} />
                <Route path="/key" exact component={Key} />
                <Redirect to="/" />
              </Switch>
            </Container>
          </Grid.Column>
          <Grid.Column width={4} style={{padding:0, paddingTop:'7em', height:'100vh'}}>
            <Container style={containerStyle}>
              <Chart />
            </Container>
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}