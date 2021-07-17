import { useEffect, useState } from 'react';
import CharacterCard from './CharacterCard';
import Filter from './Filter.jsx';
import PageControlButtons from './PageControlButtons';

const fetchAllCharacters = (callback, url) => {
  fetch(url)
      .then((response) => response.json())
      .then((data) => {
          if (data) {
              callback(data);
          }
      }); 
}

const CharacterFilter = () => {
  const [apiUrl, setApiUrl] = useState("https://rickandmortyapi.com/api/character");  
  const [allCharacters, setAllCharacters] = useState({});
  
    useEffect(() => {
        fetchAllCharacters((characters) => {
            setAllCharacters(characters);
        }, apiUrl)
    }, [apiUrl]);
    
  
    return (        
       <div className="character-card-container">     
            <Filter setApiUrl={setApiUrl}/>  
            {allCharacters.error ? <h1>{allCharacters.error}</h1> : <>
                {allCharacters.results && allCharacters.results.map((character) => {
                    return <CharacterCard character= {character}/>
            })}         
            <div className="page-control-container">
                <PageControlButtons allCharacters={allCharacters} setApiUrl={setApiUrl}/>
            </div>
        </>}
       </div>
    )
}

export default CharacterFilter;