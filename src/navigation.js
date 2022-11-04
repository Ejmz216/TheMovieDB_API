let maxPage;
let page = 1;
let infiniteScroll;

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search=' + searchFormInput.value;
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends';
});

trendingTVBtn.addEventListener('click', () => {
    location.hash = '#programs';
});

arrowBtn.addEventListener('click', () => {
    history.back();
    // location.hash = '#home';
});

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);

function navigator() {
    console.log({ location });
    if (infiniteScroll) {
        window.removeEventListener('scroll', infiniteScroll, {
            passive:
                false
        });
        infiniteScroll = undefined;
    }
    if (location.hash.startsWith('#trends')) {
        trendsPage();
    }
    else if (location.hash.startsWith('#search=')) {
        searchPage();
    }
    else if (location.hash.startsWith('#movie=')) {
        movieDetailPage();
    }
    else if (location.hash.startsWith('#category')) {
        categoriesPage();
    }
    else if (location.hash.startsWith('#programs')) {
        trendsTVPage();
    }
    else if (location.hash.startsWith('#program=')) {
        TVDetailPage();
    }
    else if (location.hash.startsWith('#catTV')) {
        categoriesTVPage();
    }
    else {
        homePage();
    }

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

    if (infiniteScroll) {
        window.addEventListener('scroll', infiniteScroll, {
            passive:
                false
        });
    }
}
function homePage() {

    footer.classList.remove('inactive');
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
    genericTVSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.remove('inactive');

    TVDetailSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.remove('inactive'); //
    likedTVContainer.classList.remove('inactive');



    getPosterImg();
    getLikedMovies();
    getLikedTV();
    getTrendingMoviesPreview();
    getTrendingTVPreview();
    getCategoriesPreview();
    getCategoriesTVPreview();
    
}
function categoriesPage() {
    console.log('Categories');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.add('inactive');

    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.add('inactive');
    TVDetailSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.add('inactive');

    // ['#category', 'id-name']
    const [_, categoryData] = location.hash.split('=');
    const [categoryId, categoryName] = categoryData.split('-');

    headerCategoryTitle.innerHTML = categoryName;
    getMoviesByCategory(categoryId);
    infiniteScroll = getPaginatedMoviesByCategory(categoryId);
}
function movieDetailPage() {
    console.log('Movie');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    likedContainer.classList.add('inactive');


    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.add('inactive');
    // ['#movie', '234567']
    const [_, movieId] = location.hash.split('=');
    getMovieById(movieId);
    getMovieTrailer(movieId);
}
function searchPage() {
    console.log('Search');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.add('inactive');



    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.add('inactive');
    TVDetailSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.add('inactive');

    // ['#search', 'platzi']
    const [_, query] = location.hash.split('=');
    getMoviesBySearch(query);
    infiniteScroll = getPaginatedMoviesBySearch(query);
}
function trendsPage() {
    console.log('Trends');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.add('inactive');



    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.add('inactive');

    headerCategoryTitle.innerHTML = 'Trending Movies';
    getTrendingMovies();
    infiniteScroll = getPaginatedTrendingMovies;
}
// ____________________________ TV UPDATE _________________________________+

function TVDetailPage() {
    console.log('TV');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
    likedContainer.classList.add('inactive');
    


    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.add('inactive');
    TVDetailSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.add('inactive');
    // ['#movie', '234567']
    const [_, programId] = location.hash.split('=');
    getProgramById(programId);
    getProgramTrailer(programId);
}

function trendsTVPage() {
    console.log('TrendsTV');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.add('inactive');

    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.remove('inactive');
    TVDetailSection.classList.add('inactive');


    headerCategoryTitle.innerHTML = 'Trending on TV';
    getTrendingTV();
    infiniteScroll = getPaginatedTrendingTV;
}

function TVDetailPage() {
    console.log('TV DETAIL');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.add('inactive');


    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.add('inactive');
    TVDetailSection.classList.remove('inactive');
    categoriesTVPreviewSection.classList.add('inactive');


    // ['#movie', '234567']
    const [_, programId] = location.hash.split('=');
    getProgramById(programId);
    getProgramTrailer(programId);
}
function categoriesTVPage() {
    console.log('Categories TV');

    footer.classList.add('inactive');
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
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');
    likedContainer.classList.add('inactive');

    trendingTVPreviewSection.classList.add('inactive');
    genericTVSection.classList.remove('inactive');
    TVDetailSection.classList.add('inactive');
    categoriesTVPreviewSection.classList.add('inactive');

    // ['#category', 'id-name']
    const [_, categoryTVData] = location.hash.split('=');
    const [categoryTVId, categoryTVName] = categoryTVData.split('-');

    headerCategoryTitle.innerHTML = categoryTVName;
    getTVByCategory(categoryTVId);
    infiniteScroll = getPaginatedTVByCategory(categoryTVId);
}