import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './bootstrap.css';
import ToDoApp from "./components/Login/ToDoApp";

class App extends Component {
  render() {
    return (
        <div className="App">
          <ToDoApp />
        </div>
    );
  }
}

export default App;
