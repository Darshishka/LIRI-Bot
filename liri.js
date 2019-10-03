require("dotenv").config();
var moment = require("moment");
var Spotify = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var axios = require("axios");
//console.log(keys);
var spotify = new Spotify(keys.spotify);

// %20 between spaces
// var spotifyUrl = https://api.spotify.com/v1/search?q= + query + &type=track
// https://accounts.spotify.com/api/token?client_id=960428205f67432a8d94471eb11dd721&search?q=i%20write%20the%20sins&type=track


var input = process.argv;
var action = input[2];
var name = "";
for (var i = 3; i < input.length; i++) {
    name += input[i] + " ";
}
name = name.trim();
//console.log(name);

switch (action) {
    case "concert-this":
        var concertURL = "https://rest.bandsintown.com/artists/" + name + "/events?app_id=codingbootcamp&date=upcoming";
        axios.get(concertURL).then(
            function(response) {
                console.log(response.data);
                for (var i = 0; i < response.data.length; i++) {
                    console.log(response.data[i].venue.name);
                    console.log(response.data[i].venue.city + ", " + response.data[i].venue.country);
                    console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"));
                    console.log("-----------------");
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });

        break;
    
    case "spotify-this-song":
        //console.log("working")
        spotify.search({ type: "track", query: name, }, function(err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            }
            var songs = data.tracks.items[0]
            console.log("Artist(s): " + songs.album.artists[0].name);
            console.log("Song name: " + data.tracks.items[0].name);
            console.log("Preview: " + songs.preview_url);
            console.log("Album: " + songs.album.name);
        });
        break;

    case "movie-this":
        var search = name.replace(/ /g, "+");
        // + replaces spaces
        console.log(search);
        var movieURL = "http://www.omdbapi.com/?t=" + search + "&apikey=ddaf9955"
        axios.get(movieURL).then(
            function(response) {
                console.log(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
        // api key ddaf9955
        // http://www.omdbapi.com/?apikey=ddaf9955&t=

        break;

        case "do-what-it-says":
            fs.readFile("random.txt", "utf8", function(error, data) {
                if (error) {
                  return console.log(error);
                }
                var dataArr = data.split(",");
                action = dataArr[0];
                name = dataArr[1];
                console.log(action + " " + name);
            });
        break;
}