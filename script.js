console.log("page loaded");

const apiKey = "0e79938c7b4f5732f4719af0e2ca605c";
const loadButton = document.querySelector(".hidden");
const movieResults = document.querySelector("#movie-results");
let currentPage = 0;
const limit = 9;
let offset = currentPage*limit;

//loadButton.addEventListener("click", showMore);


async function getMovies(){
    const apiUrl = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + apiKey;

    const response = await fetch(apiUrl);
    const responseData = await response.json();
    const data = responseData.results
    console.log("It works", data);
    data.forEach(element => displayMovies(element));
}
getMovies()

function displayMovies(movies) {
    console.log(movies);
    movieResults.innerHTML+=`
    <img src="https://image.tmdb.org/t/p/w500${movies.poster_path} "alt=${movies.title} width="200" height="300"/>"
    <p style="color: white"> ${movies.title}</p>
    `
} 
