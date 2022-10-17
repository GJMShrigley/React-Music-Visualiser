import './App.css';
import React, { useState, useEffect } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import Player from './components/Player';
import axios from 'axios';
import Menu from "./components/Menu";
import List from "./components/List";

const spotifyApi = new SpotifyWebApi();

const getTokenFromUrl = () => {
  return window.location.hash.substring(1).split("&").reduce((initial, item) => {
    let parts = item.split("=")
    initial[parts[0]] = decodeURIComponent(parts[1])
    return initial;
  }, {});
};

function App() {
  const [spotifyToken, setSpotifyToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState("artist");
  const [searchResult, setSearchResult] = useState([]);
  // const [resultUri, setResultUri] = useState("");
  // const [resultType, setResultType] = useState("");
  const [track, setTrack] = useState({});

  useEffect(() => {
    const hash = window.location.hash;
    let spotifyToken = window.localStorage.getItem("token");
    

    if (!spotifyToken && hash) { 
      spotifyToken = getTokenFromUrl().access_token;
      window.localStorage.setItem("token", spotifyToken);
      window.location.hash ="";
      spotifyApi.setAccessToken(spotifyToken)
      spotifyApi.getMe().then((user) => {
      });
    }
    setSpotifyToken(spotifyToken)
      setLoggedIn(true);
  }, []);

  const logout = () => {
    setSpotifyToken("");
    window.localStorage.removeItem("token");
    setLoggedIn(false);
  };

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
  }

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
  }

  const searchFor = async (e) => {
    e.preventDefault();
    const dataType = searchType + "s";
    const {data} = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      },
      params: {
        q: searchText,
        type: searchType
      }
    });
    setSearchResult(data[dataType].items);
  };

  const getData = (e) => {
    const result = e.split(":");
    // setResultType(result[1]);
    // setResultUri(result[2]);
    getTrack(result[1], result[2]);
  };

  const getTrack = async (resultType, resultUri) => {
    const dataType = resultType + "s";
    const {data} = await axios.get(`https://api.spotify.com/v1/${dataType}/${resultUri}`, {
      headers: {
        Authorization: `Bearer ${spotifyToken}`
      }
    });
    console.log(track);
    setTrack(data);
  };

  const searchResultList = searchResult.map((result) => {
    return (
      <List 
        key={result.id}
        result={result}
        get={getData}
      />
    );
  });

  return (
    <div className="App">
      {!loggedIn && <a href="http://localhost:8888/">Login to Spotify</a>}
      <Menu 
      search={searchFor}
      searchType={handleSearchType}
      token={spotifyToken}
      searchText={handleSearchText}
      logout={logout}
     />  
      {loggedIn && <Player 
        token={spotifyToken}
        track={track}
      />}
      <section className="list">
     {searchResultList}
     </section>
    </div>
  );
}

export default App;
