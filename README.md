<h1 align="center">Consumo de API REST - The screen<img width="40" alt="image" src="https://user-images.githubusercontent.com/67802793/197900321-b4dce53e-4cb6-4a7e-a249-756584c65162.png"></h1> 

<h3 align= "justify">
En esta práctica se realiza el consumo de una API llamada “The Movie Data Base” (TMDB) con JavaScript.
Buscando realizar una Single Page Application con hash navigation, así como también la creación de un buscador de películas. En este espacio se documentarán los commits realizados en el proyecto, donde se añaden funcionalidades o layouts nuevos hasta el estado más reciente. 
</h3>
Nota final* Este proyecto, se enfoca principalmente en el consumo de API REST. Otras partes como responsividad para soporte en diferentes dispositivos, optimización y mejoramiento UI (Layout) se actualizará a futuro.
<h3>
👀 → Ver en Netlify: <a href="https://thescreenejmz216.netlify.app/">The screen  <img width="20" alt="image" src="https://user-images.githubusercontent.com/67802793/197900321-b4dce53e-4cb6-4a7e-a249-756584c65162.png"></a>
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



<h1 align="center">Actual Layout:</h1> 
<br>
<img width="612" alt="image" src="https://user-images.githubusercontent.com/67802793/197844017-48cde177-5ea3-44a7-8473-e7b302f0b901.png">
