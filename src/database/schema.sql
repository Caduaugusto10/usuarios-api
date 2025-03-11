CREATE DATABASE cadastro;

\c cadastro

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL
);

INSERT INTO users (name, email) VALUES 
    ('Thiago Ferreira', 'thiago@email.com'),
    ('Marcelo Carboni', 'marcelo@email.com'),
    ('Eduardo Correia', 'eduardo@email.com'),
    ('Felipe Santos', 'felipe@email.com');
