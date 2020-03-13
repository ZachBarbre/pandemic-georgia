CREATE DATABASE pandemic;

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
    "daltoninfect" integer,
    "blairsvilleinfect" integer,
    "atlantainfect" integer,
    "athensinfect" integer,
    "augustainfect" integer,
    "columbusinfect" integer,
    "maconinfect" integer,
    "savannahinfect" integer,
    "albanyinfect" integer,
    "valdostainfect" integer,
    "player1hand" integer [],
    "player2hand" integer [],
    "player3hand" integer [],
    "player4hand" integer [],
    "cure1" boolean,
    "cure2" boolean,
    "cure3" boolean,
    "cure4" boolean,
    "playerdeck" integer[],
    "infectdeck" integer[],
    "player1city" integer,
    "player2city" integer,
    "player3city" integer,
    "player4city" integer,
    "infectrate" integer,
    "playeractions" integer,
    "outbreak" integer
    
);


CREATE TABLE Score (
    id integer References teams(id),
    winLost integer 
);

