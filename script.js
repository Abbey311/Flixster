console.log("page loaded");

const apiKey = "0e79938c7b4f5732f4719af0e2ca605c";
const loadMovies= document.querySelector(".load");
const movieResults = document.querySelector("#movie-results");
const movieArea = document.getElementById('movie-area');
const searchInput = document.getElementById('search-input');
const searchForm = document.getElementById('search-form');
let currentPage = 1;
const limit = 24;
const offset = currentPage*limit;
var currentSearchTerm = '';


async function searchMovies(searchQuery) {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`);
    const jsonResponse = await response.json();
    let movies = jsonResponse.results.map(result => ({
        id: result.id,
        title: result.title,
        posterPath: result.poster_path,
        voteAvg: result.vote_average,
    }))

    return movies;
}

async function getMovies(){
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?&api_key=" + apiKey + "&q=" + currentSearchTerm + "&limit=" + limit + "&offset="+ offset + "&language=en-US&page=" + currentPage;
    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.results
    console.log("It works", data);
    data.forEach(element => displayMovies(element));
}

function displayMovies(movies) {
    console.log(movies);
    movieResults.innerHTML+=`
    <div class="individualMovie">
    <img src="https://image.tmdb.org/t/p/w500${movies.poster_path} "alt=${movies.title} width="200" />
    <div class="tr"
        <p class="movTitle" style="color: white; "> ${movies.title}</p>
        <p class="movVote" id="rating" style="color: darkgrey; ">${movies.vote_average}⭐️</p>
    </div>
    </div>

    `
}
function showMore(event){
    event.preventDefault();
    currentPage++;
    getMovies();
} 
loadMovies.addEventListener("click", showMore);
getMovies()

async function handleFormSubmit(event) {
    event.preventDefault();
    movieArea.innerHTML = '';
    currentSearchTerm = searchInput.value;
    const results = await searchMovies(currentSearchTerm);
    getMovies(results);
    searchInput.value = '';
    currentPage++;

}
searchForm.addEventListener('submit', handleFormSubmit);


// async function handleFormSubmit(event) {
//     event.preventDefault();
//     gifAreaDiv.innerHTML = '';
//     currentSearchTerm = searchInput.value;
//     const results = await getResults(currentSearchTerm);
//     displayResults(results);
//     searchInput.value = '';
//     currentApiPage++;
//     showMeMoreBtn.classList.remove('hidden');
// }