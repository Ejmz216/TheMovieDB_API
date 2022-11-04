function likedProgramList() {
    const item = JSON.parse(localStorage.getItem('liked_programs'));
    let programs;

    if (item) {
        programs = item;
    } else {
        programs = {};
    }

    return programs;
}

function likeTV(program) {
    const likedTV = likedProgramList();

    console.log(likedTV)

    if (likedTV[program.id]) {
        likedTV[program.id] = undefined;
    } else {
        likedTV[program.id] = program;
    }

    localStorage.setItem('liked_programs', JSON.stringify(likedTV));
}
// ====================== UTILS =====================================

function createTV(
    tv,
    container,
    {
        lazyload = false,
        clean = true,
    } = {},
) {
    if (clean) {
        container.innerHTML = '';
    }

    tv.forEach(program => {
        const programContainer = document.createElement('div');
        programContainer.classList.add('program-container');

        const programImg = document.createElement('img');
        programImg.classList.add('program-img');
        programImg.setAttribute('alt', program.name);
        programImg.setAttribute(
            lazyload ? 'data-img' : 'src',
            'https://image.tmdb.org/t/p/w300/' + program.poster_path
        );
        programImg.addEventListener('click', () => {
            location.hash = '#program=' + program.id;
        });
        programImg.addEventListener('error', () => {
            programImg.setAttribute('src', `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mOMUez6DwAD8AIIOhah/wAAAABJRU5ErkJggg==`)
            const programImgTitleSpan = document.createElement('span');
            const programImgTitle = document.createTextNode(program.name);
            programContainer.appendChild(programImgTitleSpan);
            programImgTitleSpan.appendChild(programImgTitle);
        });

        const TVBtn = document.createElement('button');
        TVBtn.classList.add('TV-btn');
        likedProgramList()[program.id] && TVBtn.classList.add('TV-btn--liked');
        TVBtn.addEventListener('click', () => {
            TVBtn.classList.toggle('TV-btn--liked');
            likeTV(program);
            getLikedTV();
        });
        
        const programTitle = document.createElement('h1');
        programTitle.classList.add('program-titlePreview');
        const programTitleText = document.createTextNode(program.name);
        const programDate= document.createElement('h2');
        programDate.classList.add('program-DatePreview');
        const programDateText = document.createTextNode(program.first_air_date);

        if (lazyload) {
            lazyLoader.observe(programImg);
        }
        programContainer.appendChild(programImg);
        programContainer.appendChild(TVBtn);
        programTitle.appendChild(programTitleText);
        programDate.appendChild(programDateText);
        programContainer.appendChild(programTitle);
        programContainer.appendChild(programDate);
        container.appendChild(programContainer);
    });
}
function createTVCategories(
    categoriesTV,
    container,
    {
        lazyload = false,
        clean = true,
    } = {},
) {
    if (clean) {
        container.innerHTML = '';
    }
    categoriesTV.forEach(categoryTV => {
        const categoryTVContainer = document.createElement('div');
        categoryTVContainer.classList.add('categoryTV-container');

        const categoryTVTitle = document.createElement('h3');
        categoryTVTitle.classList.add('categoryTV-title');
        categoryTVTitle.setAttribute('id', 'id' + categoryTV.id);
        categoryTVTitle.addEventListener('click', () => {
            location.hash = `#catTV=${categoryTV.id}-${categoryTV.name}`;
        });

        
        const categoryTVTitleText = document.createTextNode(categoryTV.name);

        if (lazyload) {
            lazyloader.observe(programImg);
        }
        categoryTVTitle.appendChild(categoryTVTitleText);
        categoryTVContainer.appendChild(categoryTVTitle);
        container.appendChild(categoryTVContainer);
    });
}

// ====================== API CALLS ================================
//----- PREVIEW ---
async function getTrendingTVPreview() {
    const { data } = await api('trending/tv/day');
    const programs = data.results;
    maxPage = data.total_pages;
    console.log(programs);

    createTV(programs, trendingPreviewTVContainer, true);
}

async function getCategoriesTVPreview() {
    const { data } = await api('/genre/tv/list');
    const categories = data.genres;

    createTVCategories(categories, categoriesTVPreviewContainer);
}

//----- TV PRINCIPAL ---
async function getTrendingTV() {
    const { data } = await api('trending/tv/day');
    const programs = data.results;
    maxPage = data.total_pages;

    createTV(programs, genericTVSection,  true);

}

async function getPaginatedTrendingTV() {
    const {
        scrollTop,
        scrollHeight,
        clientHeight } = document.documentElement;

    const scrollIsBottom = (scrollTop + clientHeight) >= (scrollHeight - 50);
    const pageIsNotMax = page < maxPage;
    if (scrollIsBottom && pageIsNotMax) {
        page++;
        const { data } = await api('trending/tv/day', {
            params: {
                page,
            },
        });
        const tv = data.results;

        createTV(
            tv,
            genericTVSection,  { lazyLoad: true, clean: false },
            );
        }

}

async function getProgramById(id) {
    const { data: program } = await api('tv/' + id);

    const programImgUrl = 'https://image.tmdb.org/t/p/original' + program.poster_path;
    headerSection.style.background = `
      linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.35) 19.27%,
        rgba(0, 0, 0, 0) 29.17%
      ),
      url(${programImgUrl})
    `;

   TVDetailTitle.textContent = program.name;
   TVDetailDescription.textContent = program.overview;
   TVDetailScore.textContent = program.vote_average;

    createTVCategories(program.genres, TVDetailCategoriesList);
    getRelatedProgramId(id);
}

async function getRelatedProgramId(id) {
    const { data } = await api(`tv/${id}/recommendations`);
    const relatedPrograms = data.results;


    createTV(relatedPrograms, relatedTVContainer);
}

async function getProgramTrailer(id) {
    const { data } = await api(`/tv/${id}/videos`);
    const links = data.results;
    console.log(links);
    btnWatchTrailerTV.setAttribute('href', `https://www.youtube.com/watch?v=${links[0].key}`);

}

async function getTVByCategory(id) {
    const { data } = await api('discover/tv', {
        params: {
            with_genres: id,
        },
    });
    const tv = data.results;
    maxPage = data.total_pages;
    console.log(data);

    createTV(tv, genericTVSection, { lazyLoad: true });
}

function getPaginatedTVByCategory(id) {
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
            const { data } = await api('discover/tv', {
                params: {
                    with_genres: id,
                    page,
                },
            });
            const tv = data.results;

            createTV(
                tv,
                genericTVSection,
                { lazyLoad: true, clean: false },
            );
        }
    }
}

function getLikedTV() {
    const likedTV = likedProgramList();
    const TVArray = Object.values(likedTV);

    createTV(TVArray, likedTVList, { lazyLoad: true, clean: true });
    console.log(likedTV);
}
