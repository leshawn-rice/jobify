DROP DATABASE IF EXISTS jobify;

CREATE DATABASE jobify;

\c jobify;

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