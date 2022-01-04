import React from 'react';
import './App.css';
import {Switch, Route, NavLink, Redirect} from "react-router-dom";
import PokemonList from "./containers/PokemonList";
import Pokemon from "./containers/Pokemon";

function App() {
  return (
    <div className="App">
      <nav>
        <NavLink to={"/pokemon"}>Go to Home Page</NavLink>
      </nav>
      <Switch>   
       <div className="app-container">
         <Route path={"/pokemon"} exact component={PokemonList} />
         <Route path={"/pokemon/:pokemon"} exact component={Pokemon} />
         <Redirect to={"/pokemon"} />
        </div>
      </Switch>
    </div>
  );
}

export default App;
