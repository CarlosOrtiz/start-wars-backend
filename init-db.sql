CREATE TABLE IF NOT EXISTS film (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    episode_id INT NOT NULL,
    director TEXT NOT NULL,
    producer TEXT NOT NULL,
    opening_crawl TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS character (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    height TEXT NOT NULL,
    mass TEXT NOT NULL,
    gender TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    film_ids INTEGER[] 
);
