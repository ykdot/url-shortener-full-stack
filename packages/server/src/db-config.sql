CREATE DATABASE url_shortener_database;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE urls (
  short_code VARCHAR(6) PRIMARY KEY,
  user_id SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  long_url VARCHAR(100) NOT NULL
);

CREATE TABLE clicks (
  short_code VARCHAR(6) PRIMARY KEY,
  timestamp TIMESTAMPTZ NOT NULL,
  id_address VARCHAR(100) NOT NULL,
  country VARCHAR(100) NOT NULL
);

CREATE TABLE url_analytics (
  short_code VARCHAR(6) PRIMARY KEY,
  clicks BIGINT NOT NULL
);


SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'url_shortener_database'
ORDER BY table_name;

SELECT current_database();

INSERT INTO users (username, email, password) VALUES ('user1', 'user1@aoz.com', '123456789');

SELECT * FROM users;
SELECT * FROM urls;
DELETE FROM users WHERE id='1' AND username='user1';