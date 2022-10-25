searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

arrowBtn.addEventListener('click', () => {
    history.back();
    posterImage.innerHTML='';
    // location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();

    } else if (location.hash.startsWith('#search=')) {
        searchPage();
    } else if (location.hash.startsWith('#movie=')) {
        movieDetailPage();
    }
    else if (location.hash.startsWith('#category')) {
        categoriesPage();
    }
    else if (location.hash.startsWith('#program')) {
        TVDetailPage();
    } else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function homePage() {
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = "";
    arrowBtn.classList.add('inactive');
    headerTitle.classList.remove('inactive');
    headerSubTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    imageContainer.classList.remove('inactive');


    trendingPreviewSection.classList.remove('inactive');
    trendingTVPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive'); //
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');



    getPosterImg();
    getTrendingTV();
    getTrendingMoviesPreview();
    getCategoriesPreview();
}
function categoriesPage() {
    console.log('Categories');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerSubTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    imageContainer.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingTVPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);
}
function movieDetailPage() {
    console.log('Movie');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerSubTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    imageContainer.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingTVPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#movie', '234567']
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
    getMovieTrailer(movieId);
}
function TVDetailPage() {
    console.log('Program');

    headerSection.classList.add('header-container--long');
    // headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerSubTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    imageContainer.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingTVPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

    // ['#movie', '234567']
    const [_, movieId] = location.hash.split('=');
    getTVById(movieId);
    getTVTrailer(movieId);
}
function searchPage() {
    console.log('Search');
    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerSubTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    imageContainer.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingTVPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    // ['#search', 'platzi']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
}
function trendsPage() {
    console.log('Trends');

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerSubTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    imageContainer.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    trendingTVPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Trending';
    getTrendingMovies();
}
