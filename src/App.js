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
      itemId: null
    }
  }

  handleItemId = (id) => {
    this.setState({ itemId: id });
    console.log(id);
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/selectedItem" render={(props) => <SelectedItem {...props} itemId={this.state.itemId} />}/>
        <Route path="/" exact render={(props) => <NasaSearch {...props} onItemId={this.handleItemId} />}/>
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
