-- migrate:up


ALTER TABLE users ALTER COLUMN fullname DROP NOT NULL

-- migrate:down

