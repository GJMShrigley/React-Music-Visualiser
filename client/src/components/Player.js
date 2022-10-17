import React from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import '../App.css';

export default function Player({ token, track }) {
    if (!token) return null;
    console.log(token, track);

  return (
    <div className="player">
    <SpotifyPlayer 
        token={token}
        uris={track.uri ? [track.uri] : []}
    />
    </div>
  )
}
