import React, { Component } from 'react';
import ControlledCarousel from './ControlledCarousel';

import 'react-day-picker/lib/style.css'
//import logo from './logo.svg';
import './App.css';
import MyNavBar from './MyNavBar';


class App extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {

    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="App">
         <MyNavBar></MyNavBar>

          <header className="App-containers">

            <ControlledCarousel></ControlledCarousel>

          </header>
        </div>
      </React.Fragment>
    );
  }
}



export default App;
