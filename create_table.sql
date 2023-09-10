-- CREATING A NOTES TABLE
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    content text NOT NULL,
    important boolean,
    date time
);

-- SERIAL : which is not an actual type but an abbreviation for an integer column to which Postgres automatically assigns a unique, increasing value when creating rows.

-- In addition of to the note table, Postgres create a subtable called notes_id_seq, which keeps track of what values is assigned to the id column when creating the next note.

-- INSERTING CONTENTS TO THE TABLE
insert into notes (content, important) values ('Relational databases rule the world', true);
insert into notes (content, important) values ('MongoDB is webscale', false);