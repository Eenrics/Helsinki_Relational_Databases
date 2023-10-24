INSERT INTO users (username, name) VALUES ('mat@luk.fr', 'math');
INSERT INTO users (username, name) VALUES ('john@doen.fr', 'John');
INSERT INTO users (username, name) VALUES ('lebron@james.fr', 'Lebron');
INSERT INTO blogs (url, title, user_id) VALUES ('https:www.loging.it', 'loving it already', 1);
INSERT INTO blogs (url, title, user_id) VALUES ('https:www.loging.them', 'loving them already', 1);
INSERT INTO blogs (url, title, user_id) VALUES ('https:www.loging.me', 'loving meee already', 1);
INSERT INTO user_blogs (user_id, blog_id) VALUES (1, 2);
INSERT INTO user_blogs (user_id, blog_id) VALUES (2, 3);


DROP TABLE users CASCADE;
DROP TABLE blogs CASCADE;
DROP TABLE migrations CASCADE;
DROP TABLE sessions CASCADE;
DROP TABLE user_blogs CASCADE;