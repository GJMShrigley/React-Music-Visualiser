import React, { useState, useEffect } from "react";
import SpotifyPlayer from 'react-spotify-web-playback';
import '../App.css';

export default function Player({ token, track }) {

    if (!token) {
      return null;
    } else {
      return (
        <div className="player">
        <SpotifyPlayer 
            token={token}
            uris={track.uri ? [track.uri] : []}
        />
        </div>
      )
    }
}
