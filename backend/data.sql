DROP DATABASE IF EXISTS jobify;

CREATE DATABASE jobify;

\c jobify;

CREATE TABLE users (
  username VARCHAR(25) PRIMARY KEY,
  password TEXT NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  is_admin BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE jobs (
  username TEXT PRIMARY KEY REFERENCES users,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  link TEXT NOT NULL
);

DROP DATABASE IF EXISTS jobify_test;

CREATE DATABASE jobify_test;

\c jobify_test;

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  password TEXT NOT NULL
);

CREATE TABLE jobs (
  username TEXT PRIMARY KEY REFERENCES users,
  company TEXT NOT NULL,
  title TEXT NOT NULL,
  location TEXT NOT NULL,
  link TEXT NOT NULL
);