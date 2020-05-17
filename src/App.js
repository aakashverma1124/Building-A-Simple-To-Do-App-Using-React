import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import LoginComponent from "./components/Login/LoginComponent";

class App extends Component {
  render() {
    return (
        <div className="App">
          <LoginComponent />
        </div>
    );
  }
}

export default App;
