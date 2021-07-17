import { useHistory, useParams } from "react-router"
import { useEffect, useState } from 'react';

const CharacterPage = () => {
    const history = useHistory();
const backToHome = () => {
    history.push("/")
}

    let {id} = useParams();
const fetchCharacter = (callback, url) => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            if (data) {
                callback(data);
            }
        }); 
  }

  const [apiUrl, setApiUrl] = useState("https://rickandmortyapi.com/api/character/" + id);  
  const [character, setCharacter] = useState({});
  const [episodes, setEpisodes] = useState([]);
  
    useEffect(() => {
        fetchCharacter((character) => {
            setCharacter(character);
        }, apiUrl)
    }, [apiUrl]);

    useEffect (() => {
        if (character.episode) {
            let episodeNumbers = character.episode.slice(Math.max(character.episode.length - 5, 0))
                                                  .map(link => link.split('/').pop());
            fetch("https://rickandmortyapi.com/api/episode/" + episodeNumbers.toString())
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    Array.isArray(data) ? setEpisodes(data) : setEpisodes([data])
                }
            }); 
        }
    }, [character])
    return (
         <div>
             <img src={character.image} alt="character image" />
             <h2>{character.name}</h2>
             <p>{character.status} - {character.species}</p>
             <p>Origin Location: {character.origin && character.origin.name}</p>
             <p>Current Location: {character.location && character.location.name}</p>
             <p>Last episodes: {episodes.map(episode => <p>{episode.name}</p> )}</p>
             <button onClick={backToHome} >Go Back</button>
         </div>
    )
}

export default CharacterPage