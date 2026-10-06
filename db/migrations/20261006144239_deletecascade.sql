-- migrate:up

ALTER TABLE notes
DROP CONSTRAINT notes_userid_fkey;

ALTER TABLE notes
ADD CONSTRAINT notes_userid_fkey
FOREIGN KEY (userid)
REFERENCES users(userid)
ON DELETE CASCADE;


-- migrate:down

