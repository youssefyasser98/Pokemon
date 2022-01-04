import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {GetPokemon} from "../actions/pokemonActions";
import _ from "lodash";

const Pokemon = (props) => {
  const pokemonName = props.match.params.pokemon;
  const dispatch = useDispatch();
  const pokemonState = useSelector(state => state.Pokemon);
  React.useEffect(() => {
    dispatch(GetPokemon(pokemonName))
  }, []);

  const ShowData = () => {
    if (!_.isEmpty(pokemonState.data[pokemonName])) {
      const pokeData = pokemonState.data[pokemonName];
      return(
      <div className="pokemon-container">
       <div className="all-container">
        <div className={"pokemon-wrapper"}>
          <form action="/pokemon">
            <button className="btn" type="submit">X</button>
          </form>
          <div className="limgg">
            <img className="limg" src={pokeData.sprites.front_default} alt=""/>
          </div>
          <div className={"ppp"}>
           <p className="pp">{pokeData.name}</p>
          </div>
          <div className="infoo">
          <div className="item">
            <h4>ID : {pokeData.id}</h4>
          </div>
          <div className="item">
          <h4>Type : </h4>
            {pokeData.types.map(el => {
              return <ul> <li>{el.type.name}</li> </ul>
            })}
          </div>
          <div className="item">
            <h4>Height : {pokeData.height}</h4>
          </div>
          <div className="item">
            <h4>Abilities : </h4>
            {pokeData.abilities.map(el => { 
              return <ul> <li>{el.ability.name}</li> </ul>
            })}
          </div>
          </div>
        </div>
       </div>
      </div>
      )
    }

    if (pokemonState.loading) {
      return <p>Loading...</p>
    }

    if (pokemonState.errorMsg !== "") {
      return <p>{pokemonState.errorMsg}</p>
    }

    return <p>error getting pokemon</p>
  }

  return(
    <div className={"poke"}>
      {ShowData()}
    </div>
  )
};

export default Pokemon