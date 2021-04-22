import React from 'react';
import './App.css';
import { Header } from './Components/HeaderComponent/HeaderComponent';

export class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Header/>
      </div>
    );
  }
}
