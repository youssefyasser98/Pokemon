import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import _ from "lodash";
import {GetPokemonList} from "../actions/pokemonActions";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
const IMG_API = "https://img.pokemondb.net/sprites/black-white/anim/normal/";


const PokemonList = (props) => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const pokemonList = useSelector(state => state.PokemonList);
  React.useEffect(() => {
    FetchData(1)
  }, []);

  const FetchData = (page = 1) => {
    dispatch(GetPokemonList(page))
  }

  const ShowData = () => {
    if (pokemonList.loading) {
      return <p>Loading...</p>
    }

    if (!_.isEmpty(pokemonList.data)) {
      return(
        
        <div className="pokemon-container">
          <div className="all-container">
           {pokemonList.data.map(el => {
            return(
              <div className={"pokemon-item"}>
                <img src={IMG_API + el.name + '.gif'}  alt={el.name} />
                <p>{el.name}</p>
                <Link to={`/pokemon/${el.name}`}>View</Link>
              </div>
            )
          })}
          </div>
        </div>

      )
    }

    if (pokemonList.errorMsg !== "") {
      return <p>{pokemonList.errorMsg}</p>
    }

    return <p>unable to get data</p>
  };

  return(
    <div>
      <div className="heade">
          <img className="logoimg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Pok%C3%A9_Ball_icon.svg" alt="Logo" /> <br/>
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg" alt="Pokemon" />
          </div>
          <div className="h">
           <h3>Generation One</h3>
           <h4>151 pokemon</h4>
       </div>
      <div className={"search"}>
        <p>Search :  </p>
        <input type="text" onChange={e => setSearch(e.target.value)}/>
        <button onClick={() => props.history.push(`/pokemon/${search}`)}>Search</button>
      </div>
      {ShowData()}
      {!_.isEmpty(pokemonList.data) && (
        <ReactPaginate
          pageCount={Math.ceil(pokemonList.count / 15)}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          onPageChange={(data) => FetchData(data.selected + 1)}
          containerClassName={"pagination"}
        />
      )}
    </div>
  )
};

export default PokemonList