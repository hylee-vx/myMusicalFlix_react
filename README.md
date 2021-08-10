# myMusicalFlix - React client

A single page React application connected to the [myMusicalFlix_api](https://github.com/hylee-vx/myMusicalFlix_api) backend. Users can create a user account and get information about musicals, including a movie description, genre description and information about the actors and directors involved. Users can modify their account details, add and delete movies from their favourite movies list, and delete their account.

The application is built with the MERN technology stack (MongoDB, Express.js, React, Node.js) and handles data flow with Redux. It uses React Bootstrap throughout to style UI components.

## Key Features
* Users can register a new account or sign in if already registered
* The main view displays all movies with title, release year, movie poster and a brief description. Users can search for a movie by title and select a movie to see further details
* For each movie, users can:
    * see the movie title, release year, movie poster, full movie description, director(s), key actors and genre
    * click on the genre and each of the director/actor names, which link to a new screen with further information 
    * add or remove the movie from their list of favourites
* Users can view their account details in the profile section, where they can:
    * edit their username, email, date of birth and password
    * remove movies from their list of favourites
    * delete their account

## Technologies
* React
* Redux
* React Bootstrap

## Getting Started
To run this project locally: 
install dependencies
```
npm install
```
build for development
```
parcel [path to index.html]
```
open the application in browser on port 1234 (or port number stated in terminal)
```
https://localhost:1234/
```
