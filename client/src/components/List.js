import React from 'react';

export default function List(props) {
    function handleClick() {
        const result = props.result.uri;
        props.get(result);
    }

    let image;
    let listAdditional;

// Setting image//
    if (props.result.type !== "track") {
        props.result.images.length ? image = props.result.images[0].url : image = "No Image";
    } else {
        props.result.album.images.length ? image = props.result.album.images[0].url : image = "No Image";
    }

// Setting additional info //
switch(props.result.type) {
    case "artist": 
        listAdditional = <div className="list__genre">{`${props.result.genres.join(", ")}`}</div>
        break;

    case "track":
        listAdditional = <div>
                            <div className="list__artists">{props.result.artists.name}</div> 
                            <div className="list__album">{props.result.album.name}</div> 
                            <div className="list__duration">Duration: {`${Math.floor((props.result.duration_ms / 1000 / 60) % 60).toString().padStart(2, "0")}:${Math.floor((props.result.duration_ms / 1000) % 60).toString().padStart(2, "0")}`}</div> 
                         </div>
        break;

    case "show":
        listAdditional = <div className="list__episodes">Episodes: {props.result.total_episodes}</div> 
        break;

    case "album":
        listAdditional = <div>
                            <div className="list__artists">{props.result.artists.name}</div> 
                            <div className="list__album">{props.result.name}</div> 
                            <div className="list__tracks">Total Tracks: {props.result.total_tracks}</div> 
                         </div>
        break;

    case "playlist":
        listAdditional = <div>
                            <div className="list__owner">{props.result.owner.display_name}</div> 
                            <div className="list__tracks">Total Tracks: {props.result.tracks.total}</div>  
                         </div>
        break;

    default:
        break;
}

// Combining elements //
    return (
        <div className="list__item" onClick={handleClick}>
        <img className="list__image" alt="Cover artwork" src={image}/> 
        <div className="list__info"> 
            <div className="list__name">{props.result.name}</div>
            {listAdditional}
        </div> 
        </div>
    )
}