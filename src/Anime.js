import React from 'react';
import PropTypes from 'prop-types';

const cleanDescription = (description) => {
  if (!description) return '';
  return description.replace(/\[.*?\]|[\p{Script=Han}]/gu, '');
};

function Anime({ id, name, poster, description, genres, score, season }) {
  return (
    <div>
      <span>{score}</span>
      <h2 key={id}>{name}</h2>
      {poster && <img src={poster} alt={name} />}
      <p>{cleanDescription(description)}</p>
      <p>{season}</p>
      {genres && genres.length > 0 && (
        <div>
          <h3>Жанры:</h3>
          <ul>
            {genres.map((genre, index) => (
              <li key={index}>{genre.russian}</li>  // Отображаем название жанра
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

Anime.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  poster: PropTypes.string,
  description: PropTypes.string,
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      russian: PropTypes.string.isRequired,
    })
  ),
  score: PropTypes.number,
  season: PropTypes.string,
};

export default Anime;
