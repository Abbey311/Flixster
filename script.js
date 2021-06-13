console.log("page loaded");

const apiKey = "0e79938c7b4f5732f4719af0e2ca605c";
const loadMovies= document.querySelector(".load");
const movieResults = document.querySelector("#movie-results");
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
let currentPage = 1;
const limit = 24;
const offset = currentPage*limit;
var currentSearchTerm = '';
const clearButton = document.querySelector('.clear');


async function searchMovies(searchQuery) {
    console.log("search");
    const response = await fetch("https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&query=" + searchQuery + "&page=" + currentPage);
    const responseData = await response.json();
    const data = responseData.results
    data.forEach(element => displayMovies(element));
}

function clearMovies(){
    movieResults.innerHTML = ''
    currentPage = 1
    getMovies();
    searchInput.value = '';
}
clearButton.addEventListener('click', clearMovies);

async function getMovies(){
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?&api_key=" + apiKey + "&q=" + currentSearchTerm + "&language=en-US&page=" + currentPage;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.results
    // console.log("It works", data);
    data.forEach(element => displayMovies(element));
}

function displayMovies(movies) {
    // console.log("here", movies);

    movieResults.innerHTML+= `
    <div class="individualMovie">
    <img src="https://image.tmdb.org/t/p/w500${movies.poster_path} "alt=${movies.title} width="200"/>
    <div class="tr"
        <p style="color: white; "> ${movies.title}</p>
        <p id="rating" style="color: darkgrey; ">${movies.vote_average}⭐️</p>
    </div>
    </div>
    `
}

function showMore(event){
    event.preventDefault();
    currentPage++;
    if (searchInput.value == ''){
        getMovies();
    }
    else {
        currentPage++;
        searchMovies(searchInput.value);
    }
} 

loadMovies.addEventListener("click", showMore);

async function handleFormSubmit(event) {
    event.preventDefault();
    movieResults.innerHTML = '';
    searchTerm = searchInput.value;
    const results = await searchMovies(searchTerm);
    displayMovies(results);
    searchInput.value = '';

}
searchForm.addEventListener('submit', handleFormSubmit);
getMovies()