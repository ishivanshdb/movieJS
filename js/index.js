window.onscroll = function () { myFunction() }
var header = document.getElementById("myHeader")
var sticky = header.offsetTop

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky")
    } else {
        header.classList.remove("sticky")
    }
}



const APIKEY = "f8de7043cb304ced961a93743bd0b30d"
const APIURL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${APIKEY}&page=1`
const IMGPATH = "https://image.tmdb.org/t/p/w1280"
const SEARCHURL = `https://api.themoviedb.org/3/search/movie?&api_key=${APIKEY}&query=`

const main = document.getElementById("mainDiv")
const form = document.getElementById("searchForm")
const search = document.getElementById("movieSearch")

function showMovies(movies) {

    main.innerHTML = ""

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement("div")
        movieEl.classList.add("movie")

        movieEl.innerHTML = `
        <img src="${IMGPATH + poster_path}" alt= "${title}">
        <div class="movie-info"> 
            <h3>${title}</h3>
            <span class= "${getClassByRate(vote_average)}">
                ${vote_average}
            </span>
        </div>
        <div class="overview">
            ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if (vote >= 8) {
        return "green"
    }
    else if (vote >= 5 && vote < 8) {
        return "orange"
    }
    else {
        return "red"
    }
}

async function getMovies(url) {
    const res = await fetch(url)
    const respdata = await res.json()
    // console.log(respdata)
    // console.log(respdata.data)
    showMovies(respdata.results)

}

getMovies(APIURL)

form.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm) {
        getMovies(SEARCHURL + searchTerm)
        search.value = ""
    }
})