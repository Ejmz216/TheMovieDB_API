// ====================== AXIOS AND DATA ====================================
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        'api_key': API_KEY,
    },
});

function likedMoviesList() {
    const item = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;

    if (item) {
        movies = item;
    } else {
        movies = {};
    }

    return movies;
}

function likeMovie(movie) {
    // movie.id
    const likedMovies = likedMoviesList();

    console.log(likedMovies)

    if (likedMovies[movie.id]) {
        likedMovies[movie.id] = undefined;
    } else {
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
}
// ====================== UTILS =====================================
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img')
            entry.target.setAttribute('src', url);
        }
    });
});
function createMovies(
    movies,
    container,
    {
        lazyload = false,
        clean = true,
    } = {},
) {
    if (clean) {
        container.innerHTML = '';
    }

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(
            lazyload ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300/' + movie.poster_path
        );
        movieImg.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });
        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMUez6DwAD8AIIOhah/wAAAABJRU5ErkJggg==`)
            const movieImgTitleSpan = document.createElement('span');
            const movieImgTitle = document.createTextNode(movie.title);
            movieContainer.appendChild(movieImgTitleSpan);
            movieImgTitleSpan.appendChild(movieImgTitle);
        });

        const movieBtn = document.createElement('button');
        movieBtn.classList.add('movie-btn');
        likedMoviesList()[movie.id] && movieBtn.classList.add('movie-btn--liked');
        movieBtn.addEventListener('click', () => {
            movieBtn.classList.toggle('movie-btn--liked');
            likeMovie(movie);
            getLikedMovies();
        });

        const movieTitle = document.createElement('h1');
        movieTitle.classList.add('movie-titlePreview');
        const movieTitleText = document.createTextNode(movie.title);
        const movieDate= document.createElement('h2');
        movieDate.classList.add('movie-DatePreview');
        const movieDateText = document.createTextNode(movie.release_date);

        if (lazyload) {
            lazyLoader.observe(movieImg);
        }
        movieContainer.appendChild(movieImg);
        movieContainer.appendChild(movieBtn);
        movieTitle.appendChild(movieTitleText);
        movieDate.appendChild(movieDateText);
        movieContainer.appendChild(movieDate);
        movieContainer.appendChild(movieTitle);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories,
    container,
    {
        lazyload = false,
        clean = true,
    } = {},
) {
    if (clean) {
        container.innerHTML = '';
    }
    categories.forEach(category => {
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        if (lazyload) {
            lazyloader.observe(movieImg);
        }
        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

// ====================== API CALLS ================================

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const n = getRandomInt(20);

async function getPosterImg() {

    const { data } = await api('discover/movie');
    const collections = data.results;
    const movieImgUrl = 'https://image.tmdb.org/t/p/original' + collections[n].backdrop_path;
    /* const posterImage = document.createElement('img');
    posterImage.classList.add('poster-img');
    posterImage.setAttribute('id', 'pImage');
    posterImage.setAttribute('src', 'https://image.tmdb.org/t/p/original' + collections[n].backdrop_path);
    imageContainer.insertBefore(posterContainer, darktheme);
    posterContainer.appendChild(posterContainer);*/

    imageContainer.style.background = `url(${movieImgUrl})`;
    imageContainer.style.objectFit = 'cover';
    imageContainer.style.width = '100%';
    imageContainer.style.height = '600px';
}
//--------------

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(data);
    createMovies(movies, trendingPreviewMoviesContainer, true);
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewContainer);
}
//----- MOVIES ---

async function getTrendingMovies() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, { lazyload: true, clean: true });

    /* const btnLoadMore = document.createElement('button');
    btnLoadMore.innerText = 'Cargar más';
    btnLoadMore.addEventListener('click', getPaginatedTrendingMovies);
    genericSection.appendChild(btnLoadMore); */
}

async function getPaginatedTrendingMovies() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 50);
    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('trending/movie/day', {
            params: {
                page,
            },
        });
        const movies = data.results;

        createMovies(
            movies,
            genericSection,
            { lazyLoad: true, clean: false },
        );
    }

}

async function getMoviesByCategory(id) {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;

    createMovies(movies, genericSection, { lazyLoad: true });
}

function getPaginatedMoviesByCategory(id) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 50);
        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('discover/movie', {
                params: {
                    with_genres: id,
                    page,
                },
            });
            const movies = data.results;

            createMovies(
                movies,
                genericSection,
                { lazyLoad: true, clean: false },
            );
        }
    }
}

async function getMoviesBySearch(query) {
    const { data } = await api('search/movie', {
        params: {
            query,
        },
    });
    const movies = data.results;
    maxPage = data.total_pages;
    console.log(movies);

    decodeURI(genericSection);
    createMovies(movies, genericSection);
}

function getPaginatedMoviesBySearch(query) {
    return async function () {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 50);
        const pageIsNotMax = page < maxPage;

        if (scrollIsBottom && pageIsNotMax) {
            page++;
            const { data } = await api('search/movie', {
                params: {
                    query,
                    page,
                },
            });
            const movies = data.results;

            createMovies(
                movies,
                genericSection,
                { lazyLoad: true, clean: false },
            );
        }
    }
}

async function getMovieById(id) {
    const { data: movie } = await api('movie/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/original' + movie.poster_path;
    headerSection.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = movie.title;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;

    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;


    createMovies(relatedMovies, relatedMoviesContainer);
}

async function getMovieTrailer(id) {
    const { data } = await api(`/movie/${id}/videos`);
    const links = data.results;
    console.log(links);
    btnWatchTrailer.setAttribute('href', `https://www.youtube.com/watch?v=${links[0].key}`);

}

function getLikedMovies() {
    const likedMovies = likedMoviesList();
    const moviesArray = Object.values(likedMovies);

    createMovies(moviesArray, likedList, { lazyLoad: true, clean: true });
    console.log(likedMovies);
}
