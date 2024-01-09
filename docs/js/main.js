const i=document.querySelector(".js__charactersResultUl"),f=document.querySelector(".js__charactersFavoritesUl"),h=document.querySelector(".js__formSearch"),m=document.querySelector(".js__inputSearch");let c=[];const a=JSON.parse(localStorage.getItem("favoritesData"))||[];function _(e){const t=e.imageUrl||"https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";a.findIndex(r=>r._id===parseInt(e._id))===-1?i.innerHTML+=`<li class="characterCard js__characters" data-id="${e._id}">
           <img class="characterCard__image" src="${t}" alt="${e.name}">
           <h3 class="characterCard__name">${e.name}</h3>
       </li>
     `:i.innerHTML+=`<li class="characterCard favorites js__characters " data-id="${e._id}">
      <img class="characterCard__image" src="${t}" alt="${e.name}">
      <h3 class="characterCard__name">${e.name}</h3>
  </li>
`}function l(){i.innerHTML="";for(const t of c)_(t);const e=document.querySelectorAll(".js__characters");for(const t of e)t.addEventListener("click",v)}function u(e){const t=e.imageUrl||"https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";f.innerHTML+=`
    <li class="characterCard js__character favorites">
    <img class="characterCard__image" src="${t}" alt="${e.name}">
    <h3 class="characterCard__name">${e.name}</h3>
    <button class="removeBtn js__removeButtons" data-id= ${e._id}>X</button>
</li>`}function d(){f.innerHTML="";for(const t of a)u(t);document.querySelectorAll(".js__removeButtons").forEach(t=>{t.addEventListener("click",g),console.log(t)})}function v(e){const t=e.currentTarget,s=t.dataset.id,r=c.find(o=>o._id===parseInt(s)),n=a.findIndex(o=>o._id===parseInt(s));n===-1?(a.push(r),localStorage.setItem("favoritesData",JSON.stringify(a))):(a.splice(n,1),localStorage.setItem("favoritesData",JSON.stringify(a))),d(),t.classList.toggle("favorites")}function g(e){const t=e.currentTarget;console.log(e.currentTarget);const s=t.dataset.id,r=a.findIndex(n=>n._id===parseInt(s));r!==-1&&(a.splice(r,1),d(),l())}h.addEventListener("submit",e=>{e.preventDefault(),fetch(`//api.disneyapi.dev/character?name=${m.value}`).then(t=>t.json()).then(t=>{Array.isArray(t.data)?c=t.data:c=[t.data],console.log(c),i.innerHTML="",l()})});fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{c=e.data,l()});d();
//# sourceMappingURL=main.js.map
