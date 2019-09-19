import React, { Component } from 'react'
import Main from '../main'
import Game from '../game'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './app.css';

export default class App extends Component {

  render() {

    return(
      <div className='container'>
        <header className='header'>
          <p className='title'>Tic Tac Toe</p>
        </header>
        <Router>
          <Route path='/' exact component={Main} />
          <Route path='/:game' component={Game} />
        </Router>
      </div>
    )
  }
}
