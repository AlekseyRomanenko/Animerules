import React, { useEffect, useState } from 'react';
import { request, gql } from 'graphql-request';
import Anime from "./Anime.js";
import VideoPlayer from './VideoPlayer';

const endpoint = 'https://shikimori.one/api/graphql';
const anilistUrl = 'https://graphql.anilist.co';

function App() {
  const [anime, setAnime] = useState([]);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchAnimeData = async () => {
      const query = gql`
        {
          animes(limit: 10) {
            id
            russian
            description
            poster {
              mainUrl
            }
            score
            season
            genres {
              russian
            }
          }
        }
      `;

      try {
        const data = await request(endpoint, query);
        setAnime(data.animes);
      } catch (error) {
        console.error('Ошибка при запросе аниме:', error);
      }
    };

    const fetchVideoData = async () => {
      const query = `
      query ($id: Int) {
        Media(id: $id, type: ANIME) {
          id
          title {
            romaji
            english
            native
          }
        }
      }
      `;

      const variables = { id: 15125 };

      try {
        const response = await fetch(anilistUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: query,
            variables: variables,
          }),
        });

        const videoData = await response.json();
        setVideoData(videoData.data.Media);
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchAnimeData();
    fetchVideoData();
  }, []);
// Here we define our query as a multi-line string
// Storing it in a separate .graphql/.gql file is also possible
var query = `
query ($id: Int) { # Define which variables will be used in the query (id)
  Media (id: $id, type: ANIME) { # Insert our variables into the query arguments (id) (type: ANIME is hard-coded in the query)
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

// Define our query variables and values that will be used in the query request
var variables = {
    id: 15125
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };

// Make the HTTP Api request
fetch(url, options).then(handleResponse)
                   .then(handleData)
                   .catch(handleError);

function handleResponse(response) {
    return response.json().then(function (json) {
        return response.ok ? json : Promise.reject(json);
    });
}

function handleData(data) {
    console.log(data);
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}
  return (
    <div>
      <h1>Аниме</h1>
      {anime.map((anime) => (
        <Anime
          key={anime.id}
          name={anime.russian}
          description={anime.description}
          poster={anime.poster.mainUrl}
          score={anime.score}
          season={anime.season}
          genres={anime.genres} 
        />
      ))}
      {videoData && <VideoPlayer videoUrl={`http://kodikapi.com/list`} />}
    </div>
  );
}

export default App;
