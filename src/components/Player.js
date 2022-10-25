import React from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import '../App.css';

export default function Player({ token, track }) {
 

      return (
        <div className="player">
        <SpotifyPlayer 
            token={token}
            uris={track.uri ? [track.uri] : []}
            play={track.uri ? true : false}
        />
        </div>
      )
  
}
