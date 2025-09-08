CREATE DATABASE url_shortener_database;
CREATE DATABASE real_time_chat_service;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL,
  email VARCHAR(25) NOT NULL,
  password VARCHAR(100) NOT NULL
);
DROP TABLE users;

CREATE TABLE admin (
  id SERIAL PRIMARY KEY,
  username VARCHAR(25) NOT NULL UNIQUE,
  email VARCHAR(25) NOT NULL UNIQUE,
  password VARCHAR(100) NOT NULL
);
DROP TABLE admin;
SELECT * FROM admin;

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
SELECT * FROM admin;
SELECT * FROM urls;
SELECT * FROM clicks;
SELECT * FROM url_analytics;
DELETE FROM users WHERE id='1' AND username='user1';
DELETE FROM users WHERE id='2';
DELETE FROM urls WHERE short_code='';


INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aaa', 'today', 11, 'https://www.youtube.com/');
INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aab', 'today', 11, 'https://www.google.com/');
INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aac', 'today', 11, 'https://www.reddit.com/');
INSERT INTO urls (short_code, date, user_id, long_url) VALUES ('111aaD', 'today', 11, 'https://www.reddit.com/');
INSERT INTO urls (date, user_id, long_url) VALUES ('today', 11, 'https://www.reddit.com/');

SELECT * FROM urls WHERE user_id=11;


SHOW datestyle;


INSERT INTO clicks (short_code, timestamp, ip_address, user_agent)
VALUES ('8', '2025-08-17 20:30:00Z', '127.0.0.1', 'final-test');

SELECT COUNT(*) FROM clicks WHERE timestamp >= current_date - interval '7 days';
SELECT COUNT(DISTINCT short_code) FROM clicks WHERE timestamp >= current_date - interval '7 days';
SELECT short_code, COUNT(*) AS row_count FROM clicks WHERE timestamp >= current_date - interval '7 days' GROUP BY short_code ORDER BY row_count DESC LIMIT 1;
SELECT COUNT(*) FROM clicks WHERE timestamp >= current_date - interval '28 days';
SELECT COUNT(DISTINCT short_code) FROM clicks WHERE timestamp >= current_date - interval '28 days';


WITH daily_counts AS (
    SELECT
        short_code,
        COUNT(*) AS total_clicks,
        COUNT(DISTINCT short_code) OVER () AS distinct_short_codes
    FROM
        clicks
    WHERE
        timestamp >= current_date - interval '7 days'
    GROUP BY
        short_code
    ORDER BY
        total_clicks DESC
    LIMIT 1
)
SELECT
    (SELECT SUM(total_clicks) FROM daily_counts) AS total_clicks_last_7_days,
    (SELECT distinct_short_codes FROM daily_counts LIMIT 1) AS distinct_short_codes_last_7_days,
    short_code AS most_frequent_short_code_last_7_days
FROM daily_counts;



WITH filtered_data AS (
    SELECT
        short_code,
        COUNT(*) AS row_count
    FROM
        clicks
    WHERE
        timestamp >= current_date - interval '28 days'
    GROUP BY
        short_code
)
SELECT
    (SELECT SUM(row_count) FROM filtered_data) AS total_clicks,
    (SELECT COUNT(short_code) FROM filtered_data) AS distinct_short_codes,
    (SELECT short_code FROM filtered_data ORDER BY row_count DESC LIMIT 1) AS most_frequent_short_code;


WITH filtered_data AS (SELECT short_code, COUNT(*) AS row_count FROM clicks WHERE timestamp >= current_date - interval '7 days' GROUP BY short_code) SELECT (SELECT SUM(row_count) FROM filtered_data) AS total_clicks, (SELECT COUNT(short_code) FROM filtered_data) AS distinct_short_codes, (SELECT short_code FROM filtered_data ORDER BY row_count DESC LIMIT 1) AS most_frequent_short_code; 



