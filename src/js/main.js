'use strict';

//QUERY SELECTORS
const charactersResultUl = document.querySelector('.js__charactersResultUl');
const charactersFavoritesUl = document.querySelector('.js__charactersFavoritesUl');

const formSearch = document.querySelector('.js__formSearch');
const inputSearch = document.querySelector('.js__inputSearch');

//VARIABLES DE DATOS

let charactersData = [];
let favoritesData = [];

//FUNCIONES
//Funciones para pintar los personajes: 
function renderOne( oneCharacterData ) {
    const imageUrl = oneCharacterData.imageUrl || 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';

         charactersResultUl.innerHTML += `<li class="characterCard js__characters" data-id="${oneCharacterData._id}">
           <img class="characterCard__image" src="${imageUrl}" alt="${oneCharacterData.name}">
           <h3 class="characterCard__name">${oneCharacterData.name}</h3>
       </li>
     `;
   };

function renderAll (){
    for (const eachCharacter of charactersData ){
        renderOne(eachCharacter);
    }

const allCharactersLi = document.querySelectorAll('.js__characters');

  for( const characterLi of allCharactersLi ) {
    characterLi.addEventListener( 'click', handleClickfavorites);
  }
};


//Funciones para pintar personajes favoritos

function renderOneFavorite( favoriteData ) {
    const imageUrl = favoriteData.imageUrl || 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
    charactersFavoritesUl.innerHTML += `
    <li class="characterCard js__character">
    <img class="characterCard__image" src="${imageUrl}" alt="${favoriteData.name}">
    <h3 class="characterCard__name">${favoriteData.name}</h3>
</li>`;
  };
  
  function renderFavorites() {
    charactersFavoritesUl.innerHTML = '';

    for( const onefavorite of favoritesData ) {
       renderOneFavorite(onefavorite) ;
      }
  };


//FUNCIONES DE EVENTOS (HANDLER)
function handleClickfavorites (event){
    const clickedCharacterLi = event.currentTarget;
    
    const clickedCharacterId = clickedCharacterLi.dataset.id;
 

    const selectedCharacterData = charactersData.find((oneCharacter) => oneCharacter._id === parseInt(clickedCharacterId ));
    const favoritesCharacterIndex = favoritesData.findIndex((onefavorite) => onefavorite._id === parseInt(clickedCharacterId));

    if( favoritesCharacterIndex === -1) {
        //No esta en el array de favoritos. Lo pongo!

        favoritesData.push (selectedCharacterData);
    } else {
        // La quito!!

        favoritesData.splice(favoritesCharacterIndex, 1);
    }

    renderFavorites();

    clickedCharacterLi.classList.toggle('favorites');

};

//EVENTOS

// Filtrar por el personaje buscado 

formSearch.addEventListener('submit', (event) => {
  event.preventDefault();
  console.log(inputSearch.value);
  
    fetch(`//api.disneyapi.dev/character?name=${inputSearch.value}`)
      .then((response) => response.json())
      .then((data => {
        charactersData = data.data;

    renderAll();
  }));

});


//CÓDIGO CUANDO CARGA LA PÁGINA

fetch('//api.disneyapi.dev/character?pageSize=50')
  .then( response => response.json() )
  .then( data => {
    charactersData = data.data;

    renderAll();
  });

  

  

