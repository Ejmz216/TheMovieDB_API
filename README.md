<h1 align="center">API REST Consumption - The screen<img width="40" alt="image" src="https://user-images.githubusercontent.com/67802793/197900321-b4dce53e-4cb6-4a7e-a249-756584c65162.png"></h1> 

<h3 align= "justify">
This practice involves consuming an API called "The Movie Data Base" (TMDB) with JavaScript. The goal is to create a Single Page Application with hash navigation, as well as a movie search engine. In this space, the commits made to the project will be documented, where new functionalities or layouts are added until the most recent state. 
</h3>
Final Note* This project focuses primarily on consuming REST APIs/optimization. Other features such as responsiveness with mediaQuery for support on different devices and UI improvement (Layout) will be updated in the future. Therefore, (and for now) the best way to view this project is on a PC.
The rest of this documentation is going to remain in panish for now
<h3>
👀 → View on Gh-Pages <a href="https://ejmz216.github.io/TheMovieDB_API/">The screen  <img width="20" alt="image" src="https://user-images.githubusercontent.com/67802793/197900321-b4dce53e-4cb6-4a7e-a249-756584c65162.png"></a>
</br>
</br>
</br>

<h1 align="center">Commits</h1> 
<details>
  <summary><h2>Initial Commit: Configuración del entorno de desarrollo.</h2></summary>
  <ol type="1">
    <li> Creamos el repositorio en GitHub
    <li>Clonamos el repositorio
    <li>En VSCode creamos package.json (npm init)
    <li>Creamos las carpetas para js y css y el index.html
    <li>Para más facilidad temporal y sin usar variables globales, creamos archivo para la api-key de TMDB en js 
    <li>Finalmente, agregamos el archivo al .gitignore
  </ol>
</details>


<details>
  <summary><h2>Commit 1: Maquetacíon del proyecto: HTML y CSS.</h2></summary>
  <ol type="1">
    <li> Crear un body con los componentes de Header, Trending Movies, Categories, trending TV, 
      Genereic List, Movie Details y Footer. Esto se detalla mejor en el código del repositorio.
    <li>Agregamos la clase inactive para luego manipular el DOM desde js
  </ol>
</details>


<details>
  <summary><h2>Commit 2: Layout 1.</h2></summary>
  <ol type="1">
    <li> Finalizamos la definción del primer Layout. La cual se aprecia acontinuación:
      <img width="612" alt="image" src="https://user-images.githubusercontent.com/67802793/197905999-b07fe6ea-917d-49f8-8f64-aaadfb98bee6.png">
  </ol>
</details>

## → Commit 3: Layout 2.

## → Commit 4: Trending movies.

## → Commit 5: Categories List.

## → Commit 6: Implementación de Axios.

## → Commit 7: Layout 3.

## → Commit 8: Sections and nodes.

## → Commit 9: Details and Recomended movies.

## → Commit 10: Layout 4 y TV update 1.

## → Commit 11: Loading Skeletons.

<details>
  <summary><h2>Commit 12: Intersection Observer</h2></summary>
  <ol type="1", align= "justify">
    <li> La Intersection Observer API es la herramienta que nos va a permitir observar cambios a medida que distintos elementos vayan apareciendo o desapareciendo de nuestro documento 
        <ul>    
          <li> Se crea el intersection observer llamando a su constructor y pasándole una función callback para que se ejecute cuando se cruce un umbral (threshold) en             una u otra dirección:
            
            ```js
                  let options = {
                  root: document.querySelector('#scrollArea'),
                  rootMargin: '0px',
                  threshold: 1.0
                  }
                  let observer = new IntersectionObserver(callback, options);
            
            ```
<li>Un umbral de 1.0 significa que cuando el 100% del elemento target está visible dentro del elemento especificado por la opción root, la función callback es invocada.   
      </ul>      

<li> En este caso se implementa un IntersectionObserver que cubra toda la pagina, por ende no necesitamos la propiedad “options” que especifica el “root” donde queremos aplicar nuestro observador. Solo se necesita la función callback que en este caso la represento con una arrow function, si el movieImg en main.js se esta viendo en pantalla (entry.isIntersecting) la mostrará en pantall asignandole “setAttribute('src', url)” (se podría hacer también para cada container y mejorando un poco el rendimiento) de la siguiente manera:
  
              ```js
                const lazyloader = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        const url = entry.target.getAttribute('data-img');
                        if (entry.isIntersecting) {
                            entry.target.setAttribute('src', url);
                        }
                    })
                });
                /* en la función create movies, cambiamos el atributo donde pondremos la imagen como 'data-img'*/
                movieImg.setAttribute('data-img', 'https://image.tmdb.org/t/p/w300/' + movie.poster_path);

                /* y por medio de nuestro lazy loader observamos todas las imagenes de la página*/
                lazyloader.observe(movieImg);
              ```
      
</ol>
</details>


<details>
  <summary><h2>Commit 13: Infinite scrolling</h2></summary>
  En esta parte se  busca implementar la funcionalidad de “Infinite scrollling” que es bastante adecuada a este proyecto al momento de buscar más información o peliculas. Como su nombre lo dice en inglés, la idea es que en cada módulo de busqueda de información como “search”, “get trending movies” o “get movies by category” se pueda bajar la vista de pagina y cada vez que se llegue al máximo de la pagina, se carguen cada vez más peliculas o series hasta el límite máximo que nos de la API (1000 páginas de peliculas). 

Para ello hacemos uso de:
<ol type="1">
    <li> scrollTop.document.documentElement: Que nos indica la medida de la distancia desde el límite superior de un elemento al límite superior de su contenido visible.
    <li> scrollHeight.document.documentElement: Es igual a la altura mínima que necesitaría el elemento para que quepa todo el contenido en la ventana gráfica sin usar una barra de desplazamiento vertical.
    <li> clientHeight.document.documentElement: Es igual a la altura a la que se encuentra observando el usuario de la pagina.
  </ol>

Por tanto se crea una función que llame a estas caracteristicas y calcule si se ha llegado al máximo de la página. En caso de llegar al máximo, se carga el parametro “page” de data proveniente de la API y se le hace un acumulador, resultando así en la carga de aquellas peliculas que se encuentran en la page=2, page=3 y así sucesivamente. Como se muestra acontinuación:
  
    ```js
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
              ```
                                           
 Este caso solo aplica para la sección de “ver más” en trending movies, pero debe ser implementado de manera general en todas las secciónes de “ver más” que lo requieran, como se muestra a contuniación:
</details>





<h1 align="center">Actual Layout:</h1> 
<br>
<img align="center" width="612" alt="image" src="https://user-images.githubusercontent.com/67802793/200092517-d6417bba-ad67-487e-ae5f-6d56eccc69b7.png">
