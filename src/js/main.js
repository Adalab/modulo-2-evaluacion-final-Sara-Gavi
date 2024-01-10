"use strict";

//QUERY SELECTORS
const charactersResultUl = document.querySelector(".js__charactersResultUl");
const charactersFavoritesUl = document.querySelector(
  ".js__charactersFavoritesUl"
);

const formSearch = document.querySelector(".js__formSearch");
const inputSearch = document.querySelector(".js__inputSearch");

//VARIABLES DE DATOS

let charactersData = [];
const favoritesData = JSON.parse(localStorage.getItem("favoritesData")) || [];

//FUNCIONES
//Funciones para pintar a los personajes:

function renderOne(oneCharacterData) {
  // Obtener la URL de la imagen o utilizamos por defecto la siguiente:
  const imageUrl =
    oneCharacterData.imageUrl ||
    "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";

  // Comprobar si el personaje está en la lista de favoritos
  const favoritesCharacterIndex = favoritesData.findIndex(
    (onefavorite) => onefavorite._id === parseInt(oneCharacterData._id)
  );

  if (favoritesCharacterIndex === -1) {
    // renderizar un personaje que no está en favoritos
    charactersResultUl.innerHTML += `<li class="characterCard js__characters" data-id="${oneCharacterData._id}">
           <img class="characterCard__image" src="${imageUrl}" alt="${oneCharacterData.name}">
           <h3 class="characterCard__name">${oneCharacterData.name}</h3>
       </li>
     `;
  } else {
    //renderizar un personaje que está en favoritos
    charactersResultUl.innerHTML += `<li class="characterCard favorites js__characters " data-id="${oneCharacterData._id}">
      <img class="characterCard__image" src="${imageUrl}" alt="${oneCharacterData.name}">
      <h3 class="characterCard__name">${oneCharacterData.name}</h3>
  </li>
`;
  }
}

function renderAll() {
  //limpiar el contenedor de personajes antes de renderizar
  charactersResultUl.innerHTML = "";

  //Renderizar todos los personajes en charactersData
  for (const eachCharacter of charactersData) {
    renderOne(eachCharacter);
  }

  // Agregar eventos de clic a cada personaje renderizado
  const allCharactersLi = document.querySelectorAll(".js__characters");
  for (const characterLi of allCharactersLi) {
    characterLi.addEventListener("click", handleClickfavorites);
  }
}

//Funciones para pintar personajes favoritos

function renderOneFavorite(favoriteData) {
  // Obtener la URl de la imagen o utilizamos una por defecto
  const imageUrl =
    favoriteData.imageUrl ||
    "https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";

  //Renderizar un personaje favorito
  charactersFavoritesUl.innerHTML += `
    <li class="characterCard js__character favorites">
    <img class="characterCard__image" src="${imageUrl}" alt="${favoriteData.name}">
    <h3 class="characterCard__name">${favoriteData.name}</h3>
    <button class="removeBtn js__removeButtons" data-id= ${favoriteData._id}>X</button>
</li>`;
}

function renderFavorites() {
  //Limpiar el contenedor de favoritos antes de renderizar
  charactersFavoritesUl.innerHTML = "";
  // Reenderizar todos los favoritos en favoritesData
  for (const onefavorite of favoritesData) {
    renderOneFavorite(onefavorite);
  }

  //Agregar eventos clic a cada botón de eliminar favorito
  const removeButtons = document.querySelectorAll(".js__removeButtons");
  removeButtons.forEach((removebutton) => {
    removebutton.addEventListener("click", handleRemoveFavorite);
    console.log(removebutton);
  });
}

//FUNCIONES DE EVENTOS (HANDLER)
function handleClickfavorites(event) {
  //Manejar el clic en un personaje
  const clickedCharacterLi = event.currentTarget;
  const clickedCharacterId = clickedCharacterLi.dataset.id;
  //Encontrar el personaje en charactersData
  const selectedCharacterData = charactersData.find(
    (oneCharacter) => oneCharacter._id === parseInt(clickedCharacterId)
  );
  //Encontrar el indice del personaje en favoritesData
  const favoritesCharacterIndex = favoritesData.findIndex(
    (onefavorite) => onefavorite._id === parseInt(clickedCharacterId)
  );

  if (favoritesCharacterIndex === -1) {
    //No está en el array de favoritos. ¡Lo agrego!
    favoritesData.push(selectedCharacterData);
    localStorage.setItem("favoritesData", JSON.stringify(favoritesData));
  } else {
    // Esta en la lista de favoritos. ¡Lo elimino!
    favoritesData.splice(favoritesCharacterIndex, 1);
    localStorage.setItem("favoritesData", JSON.stringify(favoritesData));
  }

  //Actualizar la visualización de favoritos
  renderFavorites();
  //Alternar la clase favorites en el elemento clicado
  clickedCharacterLi.classList.toggle("favorites");
}

// Función para manejar la eliminación de favoritos

function handleRemoveFavorite(event) {
  //Manejar el clic en el botón de eliminar favorito
  const clickedRemoveButton = event.currentTarget;
  const clickedRemoveId = clickedRemoveButton.dataset.id;

  //Encontrar el índice del personaje en favoritesData
  const favoritesCharacterIndex = favoritesData.findIndex(
    (onefavorite) => onefavorite._id === parseInt(clickedRemoveId)
  );

  if (favoritesCharacterIndex !== -1) {
    //Eliminar el favorito y actualizar la visualización
    favoritesData.splice(favoritesCharacterIndex, 1);
    localStorage.setItem("favoritesData", JSON.stringify(favoritesData));

    renderFavorites();
    renderAll();
  }
}

//EVENTOS
// Filtrar por el personaje buscado

formSearch.addEventListener("submit", (event) => {
  event.preventDefault();
  //Obtener datos del servidor con el nombre buscado
  fetch(`//api.disneyapi.dev/character?name=${inputSearch.value}`)
    .then((response) => response.json())
    .then((data) => {
      if (Array.isArray(data.data)) {
        //Si es un array, asignar a charactersData
        charactersData = data.data;
      } else {
        //Si no es un array, asignar a charactersData como un array con un solo elemento
        charactersData = [data.data];
      }
      //Limpiar el contenedor de personajes y renderizar
      charactersResultUl.innerHTML = "";
      renderAll();
    });
});

//CÓDIGO CUANDO CARGA LA PÁGINA
//Obtener datos del servidor cuando la página carga por primera vez
fetch("//api.disneyapi.dev/character?pageSize=50")
  .then((response) => response.json())
  .then((data) => {
    //Asignar datos a charactersData y renderizar
    charactersData = data.data;
    renderAll(charactersData);
  });

//Renderizar favoritos cuando la página carga por primera vez
renderFavorites();
