-- migrate:up


ALTER TABLE users ALTER COLUMN fullname TYPE VARCHAR(30);

-- migrate:down

