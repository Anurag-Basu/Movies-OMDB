// fetching elements form html file using querySelector;
//we are using var because the value of variable will be change afer initializatin

var submit = document.querySelector("#submit");
var input = document.querySelector("#search-movies");
// Api key form OMDB site
var apikey = "29a3e83b";
var heading = document.querySelector("#heading");
var form = document.querySelector("#form");
var favouritesBtn = document.querySelector(".fav-btn");
var FavMovieHeading = document.querySelector("#fav-movie-list-heading");
var imgContainer = document.querySelector("#img-container");
var favouriteContainer = document.querySelector("#fav-container");
var searchAgainBtn = document.querySelector("#search-again");

function addToFavouriteList(movie) {
  const moviesList = JSON.parse(localStorage.getItem("movies")) || [];
  const index = moviesList.findIndex((mov) => mov.imdbID === movie.imdbID);
  if (index !== -1) return;
  moviesList.push(movie);
  localStorage.setItem("movies", JSON.stringify(moviesList));
}

function removeFromFavouriteList(movie) {
  const moviesList = JSON.parse(localStorage.getItem("movies")) || [];
  const index = moviesList.findIndex((mov) => mov.imdbID === movie.imdbID);
  moviesList.splice(index, 1);
  localStorage.setItem("movies", JSON.stringify(moviesList));
  ShowFavouritepPage();
}

// this function is used to fetch movie from you given text.
function fetchMovie(e) {
  // prevent default value of submit button
  e.preventDefault();

  // collecting the value of movie name that we searched
  let searchText = input.value;
  fetch(`https://www.omdbapi.com/?s=${input.value}&apikey=${apikey}`)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      imgContainer.innerHTML = " ";
      // getting the data from OMDB movies api
      var info = data.Search;
      // collection all movies data that is related to your searched text
      info.forEach(function (movie) {
        // set a default image of movie is movie poster is unavilable
        if (movie.Poster == "N/A") {
          movie.Poster = "./images/nope.jpg";
        }
        const newMovie = document.createElement("div");
        newMovie.classList.add("movie");

        // set some html elements as a result to output
        newMovie.innerHTML += `
                <img class='movie-img' src = "${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title} (${movie.Year})</h2>
                <button class="fav-movie-btn"> Add to Favourite</button>
                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank"><button class='btn-grad'>  View IMDB </button></a>
                `;
        // set innerText of image-container
        imgContainer.append(newMovie);
        const movieFavBtn = newMovie.querySelector(".fav-movie-btn");
        movieFavBtn.addEventListener("click", () => addToFavouriteList(movie));
      });
    })
    //  if their is any error to fetching the data form OMDB  API
    .catch((err) => {
      console.log(err);
    });
}

// this function is used to show favourites movie list
function ShowFavouritepPage() {
  imgContainer.style.display = "none";
  favouriteContainer.style.display = "flex";
  form.style.display = "none";
  FavMovieHeading.style.display = "flex";
  favouritesBtn.style.display = "none";
  favouriteContainer.innerHTML = "";

  const moviesList = JSON.parse(localStorage.getItem("movies")) || [];
  moviesList.forEach(function (movie) {
    // set a default image of movie is movie poster is unavilable
    if (movie.Poster == "N/A") {
      movie.Poster = "./images/nope.jpg";
    }
    const newMovie = document.createElement("div");
    newMovie.classList.add("movie");

    // set some html elements as a result to output
    newMovie.innerHTML += `
                <img class='movie-img' src = "${movie.Poster}" alt="${movie.Title}">
                <h2>${movie.Title} (${movie.Year})</h2>
                <button class="fav-movie-btn"> Remove</button>
                <a href="https://imdb.com/title/${movie.imdbID}" target="_blank"><button class='btn-grad'>  View IMDB </button></a>
                `;
    // set innerText of image-container
    favouriteContainer.append(newMovie);
    const movieFavBtn = newMovie.querySelector(".fav-movie-btn");
    movieFavBtn.addEventListener("click", () => removeFromFavouriteList(movie));
  });
}

//this function is used to show home page
function showHomePage() {
  form.style.display = "block";
  FavMovieHeading.style.display = "none";
  favouritesBtn.style.display = "block";
  imgContainer.style.display = "flex";
  favouriteContainer.style.display = "none";
  imgContainer.innerHTML = "";
}

// add eventlistener to submit button
submit.addEventListener("click", fetchMovie);

// add eventListener to Favourite's Button
favouritesBtn.addEventListener("click", ShowFavouritepPage);

//add event listener to searchAgainBtn
searchAgainBtn.addEventListener("click", showHomePage);
