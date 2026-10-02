-- migrate:up
CREATE TYPE userRoles AS ENUM ('student', 'teacher', 'guest');

CREATE TABLE
  users (
    userid SERIAL PRIMARY KEY,
    username VARCHAR(30) UNIQUE,
    fullname TEXT NOT NULL,
    password TEXT,
    role userRoles DEFAULT 'guest'
  );

CREATE TABLE
  notes (
    userid INT NOT NULL REFERENCES users (userid),
    noteid SERIAL PRIMARY KEY NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
      TIME ZONE DEFAULT CURRENT_TIMESTAMP
  );

-- migrate:down
