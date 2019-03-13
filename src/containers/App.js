import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';
import Header from '../components/Header/Header';
import Connectors from '../components/Connectors/Connectors';
import Health from '../components/Health/Health';
import classes from './App.css';
import axios from 'axios';
import { BrowserRouter, Route } from 'react-router-dom';

const style = {
  ul : {
    margin: '0 auto',
    listStyle: 'none',
  }
};

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange,
  },
  typography: {
    useNextVariants: true,
  },
});


class App extends Component {
  state = {
    connectors : [{
      id: 'eupollofpolls',
      name: 'EU Poll of Polls',
      image: 'pollPolls.png',
      url: 'https://eupollofpolls.wdc.dev',
      description: 'Track political polling from across the EU using data from pollofpolls.eu',
      downloads: 0,
      views: 0,
    },{
      id: 'eventbrite',
      name: 'Eventbrite',
      image: 'eventbrite.png',
      url: 'https://eventrbite.wdc.dev',
      description: 'Analyse your organisation\'s events & registered attendees',
      downloads: 0,
      views: 0,
    },{
      id: 'kissflow',
      name: 'Kissflow',
      image: 'kissflow.png',
      url: 'https://kissflow.wdc.dev',
      description: 'Analyse your organisation\'s Kissflow business process flows',
      downloads: 0,
      views: 0,
    },{
      id: 'meetup',
      name: 'Meetup',
      image: 'meetup.png',
      url: 'https://meetup.wdc.dev',
      description: 'Find out who\'s engaging with your Meetup groups',
      downloads: 0,
      views: 0,
    },{
      id: 'spotify',
      name: 'Spotify',
      image: 'spotify.png',
      url: 'https://spotify.wdc.dev',
      description: 'Analyse your own personal Spotify activity',
      downloads: 0,
      views: 0,
    }]
  }

  componentDidMount () {
    axios.get('/api/stats')
      .then(response => {
        const stats = response.data;
        for (let connector in stats) {
          if (stats.hasOwnProperty(connector)) {
            const connectorIndex = this.state.connectors.findIndex(c => {
              return c.id === connector;
            });

            const connectorObj = {
              ...this.state.connectors[connectorIndex]
            };

            connectorObj.views = stats[connector].view;
            connectorObj.downloads = stats[connector].download;

            const connectors = [...this.state.connectors];

            connectors[connectorIndex] = connectorObj;

            this.setState({connectors : connectors})
          }
        }
      });
  }

  renderConnectorList = () => {
    return (
      <main>
        <div className={classes.container}>
          <ul style={style.ul}>
            <Connectors connectors={this.state.connectors} />
          </ul>
        </div>
      </main>
    )
  }

  renderHealth = () => {
    return (
      <main>
        <div className={classes.container}>
          <Health connectors={this.state.connectors} ></Health>
        </div>
      </main>
    )
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className={classes.App}>
            <Header />
            <Route path="/"
              render={this.renderConnectorList}
              exact/>
            <Route path="/health"
              render={this.renderHealth}
              exact/>
            <Route path='/wdc' component={() => { window.location.replace('/wdc.html'); return null;} }/>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

export default App;
