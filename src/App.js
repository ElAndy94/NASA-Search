import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import NasaSearch from './containers/NasaSearch/NasaSearch';
import SelectedItem from './containers/NasaSearch/SelectedItem/SelectedItem';
import Aux from './hoc/Aux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: null,
      itemImage: false,
      itemVideo: false,
      title: '',
      desc: '',
      center: '',
    }
  }

  handleItemInfo = (id, img, video, title, center, desc) => {
    this.setState({ itemId: id, itemImage: img, itemVideo: video, title: title, center: center, desc: desc });
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/selectedItem" render={(props) => <SelectedItem {...props} itemId={this.state.itemId} itemImg={this.state.itemImage} itemVid={this.state.itemVideo} title={this.state.title} center={this.state.center} desc={this.state.desc} />}/>
        <Route path="/" exact render={(props) => <NasaSearch {...props} onItemInfo={this.handleItemInfo} />}/>
        <Redirect to="/" />
      </Switch>
    );

    return (
      <Aux>
        <header className="App-header">
          {routes}
        </header>
      </Aux>
    );
  }
}
export default App;
