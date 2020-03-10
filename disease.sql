create database pandemic;

CREATE TABLE teams (
    id SERIAL PRIMARY KEY,
    name varchar,
    "Password" text,
    win integer,
    loss integer,
    email varchar
);

CREATE TABLE game (
    id integer REFERENCES teams(id),
    "C1infect" integer,
    "player1Hand" integer [],
    "player2Hand" integer [],
    "player3Hand" integer [],
    "player4Hand" integer [],
    "Cure1" boolean,
    "Cure2" boolean,
    "Cure3" boolean,
    "Cure4" boolean,
    "PlayerDeck" integer[],
    "infectDeck" integer[],
    "player1City" integer,
    "player2City" integer,
    "player3City" integer,
    "player4City" integer
);


CREATE TABLE Score (
    id integer References teams(id),
    winLost integer 
);