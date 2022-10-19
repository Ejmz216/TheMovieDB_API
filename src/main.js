const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers: {
        'Content-Type': 'application/json',
    },
    params: {
        'api_key': API_KEY,
    },
});
async function getPosterImg() {
    const { data } = await api('collection/9735/images');
    const collections = data.backdrops;
    console.log(collections)

        const headerImageContainer = document.querySelector('#header .header-image-container');
        const headertitleP = document.querySelector('#header .header-title--principal');
        const posterImage = document.createElement('img');
        posterImage.classList.add('poster-img');
        posterImage.setAttribute('src', 'https://image.tmdb.org/t/p/original' + collections[4].file_path);        

        headerImageContainer.insertBefore(posterImage, headertitleP);
}

async function getTrendingMoviesPreview() {
    const { data } = await api('trending/movie/day');
    const movies = data.results;

    movies.forEach((movie) => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        const movieTitle = document.createElement('h1');
        movieTitle.classList.add('movie-titlePreview');
        const movieTitleText = document.createTextNode(movie.title);

        movieContainer.appendChild(movieImg);
        movieTitle.appendChild(movieTitleText);
        movieContainer.appendChild(movieTitle);
        trendingPreviewMoviesContainer.appendChild(movieContainer);
    });
}

async function getCategoriesPreview() {
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    categories.forEach((category) => {
        const categoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');

        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewContainer.appendChild(categoryContainer);
    });
}

getPosterImg();
getTrendingMoviesPreview();
getCategoriesPreview();