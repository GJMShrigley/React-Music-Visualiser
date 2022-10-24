import React from 'react';

export default function List(props) {
    function handleClick() {
        const result = props.result.uri;
        props.get(result);
    }

    let image;

    if (props.result.type != "track") {
        props.result.images.length ? image = props.result.images[0].url : image = "No Image";
        
    } else {
        props.result.album.images.length ? image = props.result.album.images[0].url : image = "No Image";
    }

    switch(props.result.type) {
        case "artist": 
            let genres = props.result.genres.join(", ");
    return ( 
        <div className = "list__item" onClick={handleClick} >
        <img className = "list__image" src = {image}/> 
        <div className = "list__info">     
        <div className = "list__name" > {props.result.name} </div> 
        <div className = "list__genre" > {genres} </div> 
        </div> 
        </div>
    )

        case "track":
            const milliseconds = props.result.duration_ms;
            let duration = `${Math.floor((milliseconds / 1000 / 60) % 60).toString().padStart(2, "0")}:${Math.floor((milliseconds / 1000) % 60).toString().padStart(2, "0")}`;
    return (
        <div className = "list__item" onClick={handleClick} >
        <img className = "list__image" src = {image}/>  
        <div className = "list__info">     
        <div className = "list__name" > {props.result.name} </div> 
        <div className = "list__artists" > {props.result.artists.name} </div> 
        <div className = "list__album" > {props.result.album.name} </div> 
        <div className = "list__duration" > Duration: {duration} </div> 
        </div> 
        </div>
        )

        case "show":
    return ( 
        <div className = "list__item" onClick={handleClick} >
        <img className = "list__image" src = {image}/> 
        <div className = "list__info">     
        <div className = "list__name" > {props.result.name} </div> 
        <div className = "list__episodes" > Episodes: {props.result.total_episodes} </div> 
        </div> 
        </div>
    )

        case "album":
     return (
        <div className = "list__item" onClick={handleClick} >
        <img className = "list__image" src = {image}/> 
        <div className = "list__info">     
        <div className = "list__name" > {props.result.name} </div> 
        <div className = "list__artists" > {props.result.artists.name} </div> 
        <div className = "list__album" > {props.result.name} </div> 
        <div className = "list__tracks" > Total Tracks: {props.result.total_tracks} </div> 
        </div> 
        </div>
        )

        case "playlist":
    return (
        <div className = "list__item" onClick={handleClick} >
        <img className = "list__image" src = {image}/> 
        <div className = "list__info">     
        <div className = "list__name" > {props.result.name} </div> 
        <div className = "list__owner" > {props.result.owner.display_name} </div> 
        <div className = "list__tracks" > Total Tracks: {props.result.tracks.total} </div> 
        </div> 
        </div>
        )
    };

}