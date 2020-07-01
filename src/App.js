import React from 'react';
// import logo from './logo.svg';
import {BrowserRouter as Router,  Route, Switch} from 'react-router-dom'
import Game from './Game'
import Home from './Home'
import './App.css';


function App() {
  return (
    <Router>
      <main>

      </main>
      <div>
      <Switch>
          {/* <Route exact path ="/" component={Home} /> */}
          <Route exact path="/" component={Game} />
        </Switch>
    </div>
    </Router>
    
  );
}

export default App;
