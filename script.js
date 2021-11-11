// fetching elements form html file using querySelector;
//we are using var because the value of variable will be change afer initializatin

var submit = document.querySelector('#submit');
var input = document.querySelector('#search-movies');
// Api key form OMDB site
var apikey = '29a3e83b';
var heading = document.querySelector('#heading');
var form = document.querySelector('#form')
var FavMovieHeading = document.querySelector('#fav-movie-list-heading');
var imgContainer = document.querySelector('#img-container')
var favouriteBtn = document.querySelector('.fav-btn');
var favouriteContainer = document.querySelector('#fav-container');
var searchAgainBtn = document.querySelector('#search-again');

// this function is used to fetch movie from you given text.
function fetchMovie(e){
    // prevent default value of submit button
    e.preventDefault();
    
    // collecting the value of movie name that we searched
    let searchText = input.value;
    fetch(`http://www.omdbapi.com/?s=${input.value}&apikey=${apikey}`)
    .then((res) =>
    { 
        return res.json()

    })    
    .then((data) => {
        document.querySelector('#img-container').innerHTML =' ';
        // getting the data from OMDB movies api
        var info = data.Search;
        var output ='';
        // collection all movies data that is related to your searched text
        info.forEach(function(value){
            // set a default image of movie is movie poster is unavilable
            if(value.Poster == 'N/A'){
                value.Poster = './images/nope.jpg';
            }
            // set some html elements as a result to output
            output += `
        <img id="img-container" src = "${value.Poster}" alt="${value.Title}">
        <h2>${value.Title} (${value.Year})</h2>
        <button id="fav-btn"> Add to Favourite</button>
        <a href="http://imdb.com/title/${value.imdbID}" target="_blank"><button class='btn-grad'>  View IMDB </button></a>
        `;
        })
        
        
        // set innerText of image-container 
        document.querySelector('#img-container').insertAdjacentHTML('beforeEnd', output);       
        
    })
    //  if their is any error to fetching the data form OMDB  API
    .catch((err) => {
        console.log(err);
    })
}

// this function is used to show favourites movie list 
function ShowFavouritepPage(){
    // imgContainer.style.display ='none';
    // favouriteContainer.style.display = 'block';
    form.style.display = 'none';
    FavMovieHeading.style.display = 'flex';

}

// add eventlistener to submit button
submit.addEventListener('click', fetchMovie);

// add eventListener to Favourite's Button
favouriteBtn.addEventListener('click' , ShowFavouritepPage);

// add eventListener to ADD TO FAVOURITE movie button
// document.querySelector('#fav-btn').addEventListener('click', addFavourites);