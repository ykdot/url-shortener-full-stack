CREATE DATABASE url_shortener_database;
CREATE DATABASE real_time_chat_service;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL,
  password VARCHAR(100) NOT NULL
);
DROP TABLE users;


CREATE TABLE urls (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(15) UNIQUE,
  date DATE NOT NULL,
  user_id SERIAL NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  long_url VARCHAR(100) NOT NULL
);
DROP TABLE urls;

CREATE TABLE clicks (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(15) NOT NULL REFERENCES urls(short_code),
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ip_address VARCHAR(45),
  user_agent VARCHAR(100)
);
DROP TABLE clicks;

CREATE TABLE url_analytics (
  short_code VARCHAR(15) UNIQUE,
  clicks BIGINT NOT NULL
);
DROP TABLE url_analytics;


SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'url_shortener_database'
ORDER BY table_name;

SELECT current_database();

INSERT INTO users (username, email, password) VALUES ('user1', 'user1@aoz.com', '123456789');

SELECT * FROM User;

SELECT * FROM users;
SELECT * FROM urls;
SELECT * FROM clicks;
SELECT * FROM url_analytics;
DELETE FROM users WHERE id='1' AND username='user1';
DELETE FROM users WHERE id='2';
DELETE FROM urls WHERE short_code='';


INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aaa', 'today', 1, 'https://www.youtube.com/');
INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aab', 'today', 1, 'https://www.google.com/');
INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aac', 'today', 1, 'https://www.reddit.com/');
INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aaD', 'today', 1, 'https://www.reddit.com/');
INSERT INTO urls (date, user_id, long_url) VALUES ('today', 11, 'https://www.reddit.com/');

SELECT * FROM urls WHERE user_id=11;


SHOW datestyle;


INSERT INTO clicks (short_code, timestamp, ip_address, user_agent)
VALUES ('8', '2025-08-17 20:30:00Z', '127.0.0.1', 'final-test');





SELECT date, long_url, urls.short_code, clicks FROM urls LEFT JOIN url_analytics ON urls.short_code = url_analytics.short_code WHERE long_url ILIKE '%you%' ORDER BY short_code ASC LIMIT 2 OFFSET 0;
SELECT * FROM url_analytics;