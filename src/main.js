
async function getTrendingMoviesPreview() {
    // Realizo la petición fetch a la API y la guardo en una variable res (respuesta)
    const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + API_KEY);

    // El método json() de la interfaz de respuesta toma un flujo de respuesta y lo lee hasta completarlo.
    // Devuelve una promesa que se resuelve a un objeto de JavaScript. Lo guardamos en "data" 
    const data = await res.json();

    // Se toma la caracteristica results del objeto Data y se guarda en Movies 
    const movies = data.results;
    //Luego tomamos la lista de peliculas y para cada una de ellas creamos un div en HTML
    //con ello lograremos hacer el DOM  
    movies.forEach((movie) => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList');
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        trendingPreviewMoviesContainer.appendChild(movieContainer);

    });


}

async function getCategoriesPreview() {
    const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + API_KEY);
    const data = await res.json();

    const categories = data.genres;
   
    categories.forEach((category) => {
        const categoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list');
        
        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');7

        categoryTitle.setAttribute('id', 'id' + category.id);
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        categoriesPreviewContainer.appendChild(categoryContainer);

    });
}

getTrendingMoviesPreview();
getCategoriesPreview();