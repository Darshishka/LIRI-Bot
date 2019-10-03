# LIRI-Bot

## About
This is an app project that takes what is typed in the consol and returns data depending on what is typed.

## Languages used
*Javascript

## How to mak it work
After downloading these files you will need to create a .env file that looks like the code below, but containing your own spotify API keys.
```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret
```
### Keywords
To actually get the project to run you will need to open command line or terminal in the folder that contains these files. The first thing you type in command line/terminal will always be
```
node liri.js
``` followed by one of 4 things
```
node liri.js concert-this
``` 
When followed by an artist or band name, `concert-this` will give you data about that artists upcoming concerts
```
node liri.js spotify-this-song
```
When followed by a song name, `spotify-this-song` will give you data about the song, artist, and more
```
node liri.js movie-this
```
When followed by a movie name, `movie-ths` will give you IMDB data about that movie