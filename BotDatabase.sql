CREATE DATABASE Confession;

USE Confession;

CREATE TABLE Channel(
    guildId VARCHAR(50) PRIMARY KEY,
    channelId VARCHAR(50) NOT NULL
)