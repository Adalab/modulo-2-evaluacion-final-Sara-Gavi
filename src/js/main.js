'use strict';

//QUERY SELECTORS
const charactersResultUl = document.querySelector('.js__charactersResultUl');

//VARIABLES DE DATOS

let charactersData = [];
//FUNCIONES
//Funciones para pintar los personajes: 
function renderOne( oneCharacterData ) {
    const imageUrl = oneCharacterData.imageUrl || 'https://via.placeholder.com/210x295/ffffff/555555/?text=Disney';
         charactersResultUl.innerHTML += `
         <li class="characterCard js__character" data-id="${oneCharacterData.id}">
         <img class="characterCard__image" src="${oneCharacterData.imageUrl}" alt="${oneCharacterData.name}">
         <h3 class="characterCard__name">${oneCharacterData.name}</h3>
       </li>
     `;
   };

function renderAll (){
    for (const eachCharacter of charactersData ){
        renderOne(eachCharacter);
    }
};

 
//FUNCIONES DE EVENTOS
//EVENTOS
//CÓDIGO CUANDO CARGA LA PÁGINA

fetch('//api.disneyapi.dev/character?pageSize=50')
  .then( response => response.json() )
  .then( data => {
    charactersData = data.data;

    renderAll();
  });

  

  

