const API_KEY = 'api_key=dc30bc3cd46c397a6f8ba563d9c5120c';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+ API_KEY ;
const IMG_URL = 'https://image.tmdb.org/t/p/w500/';
const SEARCH_URL = BASE_URL +'/search/movie?'+API_KEY+'&query=';

const main = document.getElementById('menu');
const form = document.getElementById('search');
const search = document.getElementById('schBar');

movieApp(API_URL);

function movieApp(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        daftarFilm(data.results);
    })
}

//Menampilkan daftar film
function daftarFilm(data) {
    main.innerHTML = '';
    data.forEach(film => {
        const {title, release_date, vote_average, poster_path, overview} = film;
        const listFilm = document.createElement('div');
        listFilm.classList.add('film');
        listFilm.innerHTML = `
            <img src="${IMG_URL+poster_path}" alt="${title}">
            
            <div class="infoFilm">
                <h2>${title}</h2><span class="rating">${vote_average}</span>
            </div>
            <p class="release">${release_date}</p>     
            <div class="synopsis">
                <h2>Synopsis</h2>
                <p>${overview}</p>                          
            </div>
            `
    
        main.appendChild(listFilm);        
    })
}

//Menampilkan film sesuai dengan Pencarian
form.addEventListener('submit', (e) => {
    e.preventDefault();

    let searchValue = search.value;

    if(searchValue) {
        movieApp(SEARCH_URL+searchValue);
    }else {
        movieApp(API_URL);
    }
})


