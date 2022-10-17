import React from "react";

import '../App.css';

export default function Menu(props) {
      return ( 
      <header className = "header" >
      <img className="header__icon"></img>
        {props.token ?
        <form className = "header__search-bar" onSubmit = {props.search} >
        <input className = "header__input" type = "text"
        onChange = {props.searchText}/> 
        <button className = "header__button" type = {"submit"}>Search</button>
        <select className = "header__dropdown" onChange = {props.searchType}>
          <option className = "header__option" value = "artist">Artists</option>
          <option className = "header__option" value = "track">Songs</option>
          <option className = "header__option" value = "show">Podcasts & Shows</option>
          <option className = "header__option" value = "album">Albums</option>
          <option className = "header__option" value = "playlist">Playlists</option>
        </select>
        </form> : <div></div>
        } 

        {!props.token ? <a className = "header__login" href="http://localhost:8888/">Login</a> 
        : 
        <button className = "header__logout" onClick = {props.logout}> Logout </button>
        }
      </header> 
    );
}