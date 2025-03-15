const axios = require('axios');
const pool = require('../config/db');
const dotenv = require('dotenv');
dotenv.config();

const fetchAllCharacters = async () => {
  let characters = [];
  let nextPage = SWAPI_URL;

  while (nextPage) {
    const response = await axios.get(nextPage);
    characters = characters.concat(response.data.results);
    nextPage = response.data.next;
  }

  return characters;
};

const fetchFilmDetails = async (filmUrl) => {
  const { data } = await axios.get(filmUrl);
  return {
    title: data.title,
    episode_id: data.episode_id,
    director: data.director,
    producer: data.producer,
    opening_crawl: data.opening_crawl,
    url: data.url
  };
};

const saveFilms = async (films) => {
  const filmIds = [];

  for (const filmUrl of films) {
    const filmData = await fetchFilmDetails(filmUrl);

    const existingFilm = await pool.query('SELECT id FROM film WHERE url = $1', [filmData.url]);
    if (existingFilm.rows.length > 0) {
      filmIds.push(existingFilm.rows[0].id);
      continue;
    }

    const newFilm = await pool.query(
      `INSERT INTO film (title, episode_id, director, producer, opening_crawl, url) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
      [filmData.title, filmData.episode_id, filmData.director, filmData.producer, filmData.opening_crawl, filmData.url]
    );

    filmIds.push(newFilm.rows[0].id);
  }

  return filmIds;
};

const saveCharacters = async (characters) => {
  for (const character of characters) {
    const filmIds = await saveFilms(character.films);

    await pool.query(
      `INSERT INTO character (name, height, mass, gender, url, film_ids) 
          VALUES ($1, $2, $3, $4, $5, $6) 
          ON CONFLICT (url) DO NOTHING`,
      [character.name, character.height, character.mass, character.gender, character.url, filmIds]
    );
  }
};

module.exports = { fetchAllCharacters, saveCharacters }