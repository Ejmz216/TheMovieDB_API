// ====================== AXIOS ====================================
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        'api_key': API_KEY,
    },
});
// ====================== UTIL =====================================
const lazyloader = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const url = entry.target.getAttribute('data-img');
            entry.target.setAttribute('src', url);
        }
    })
});

function createMovies(movies,
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
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute(lazyload ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

        movieImg.addEventListener('error', () => {
            movieImg.setAttribute('src', `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMUez6DwAD8AIIOhah/wAAAABJRU5ErkJggg==`)
            const movieImgTitleSpan = document.createElement('span');
            const movieImgTitle = document.createTextNode(movie.title);
            movieContainer.appendChild(movieImgTitleSpan);
            movieImgTitleSpan.appendChild(movieImgTitle);
        })
        const movieTitle = document.createElement('h1');
        movieTitle.classList.add('movie-titlePreview');
        const movieTitleText = document.createTextNode(movie.title);

        /* observer.observe(movieImg); */
        if (lazyload) {
            lazyloader.observe(movieImg);
        }
        movieContainer.appendChild(movieImg);
        movieTitle.appendChild(movieTitleText);
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

function createTV(tv, container, lazyload = false) {
    container.innerHTML = '';
    tv.forEach(program => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('program-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#program=' + program.id;
        });

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute(lazyload ? 'data-img' : 'src', 'https://image.tmdb.org/t/p/w300/' + program.poster_path);
        /* movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + program.poster_path); */

        const movieTitle = document.createElement('h1');
        movieTitle.classList.add('program-titlePreview');
        const movieTitleText = document.createTextNode(program.original_name);

        if (lazyload) {
            lazyloader.observe(movieImg);
        }
        movieContainer.appendChild(movieImg);
        movieTitle.appendChild(movieTitleText);
        movieContainer.appendChild(movieTitle);
        container.appendChild(movieContainer);
    });
}

// ====================== API CALLS ================================

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
const n = getRandomInt(20);
//--------------
async function getPosterImg() {

    /*     posterContainer.innerHTML = ''; */

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

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    maxPage = data.total_pages;

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
    createMovies(movies, genericSection, { lazyLoad: true, clean: false });
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
    console.log(maxPage);

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

//----- TV ---

async function getTrendingTV() {
    const { data } = await api('trending/tv/week');

    const tv = data.results;

    createTV(tv, trendingTVPreviewContainer, true);
}

async function getTVTrailer(id) {
    const { data } = await api(`/tv/${id}/videos`);
    const links = data.results;
    console.log(links);
    btnWatchTrailer.setAttribute('href', `https://www.youtube.com/watch?v=${links[2].key}`);

}

async function getTVById(id) {
    const { data: tv } = await api('tv/' + id);

    const movieImgUrl = 'https://image.tmdb.org/t/p/original' + tv.poster_path;
    headerSection.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${movieImgUrl})
    `;

    movieDetailTitle.textContent = tv.name;
    movieDetailDescription.textContent = tv.overview;
    movieDetailScore.textContent = tv.vote_average;

    createCategories(tv.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
}
