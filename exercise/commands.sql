CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

insert into blogs (url, title) values ('localhost', 'helsinki is the best');
insert into blogs (url, title) values ('127.0.0.1', 'i love relational db');

select * from blogs;