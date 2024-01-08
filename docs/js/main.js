const n=document.querySelector(".js__charactersResultUl"),o=document.querySelector(".js__charactersFavoritesUl"),h=document.querySelector(".js__formSearch"),_=document.querySelector(".js__inputSearch");let c=[];const t=JSON.parse(localStorage.getItem("favoritesData"))||[];function m(e){const a=e.imageUrl||"https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";t.findIndex(s=>s._id===parseInt(e._id))===-1?n.innerHTML+=`<li class="characterCard js__characters" data-id="${e._id}">
           <img class="characterCard__image" src="${a}" alt="${e.name}">
           <h3 class="characterCard__name">${e.name}</h3>
       </li>
     `:n.innerHTML+=`<li class="characterCard favorites js__characters " data-id="${e._id}">
      <img class="characterCard__image" src="${a}" alt="${e.name}">
      <h3 class="characterCard__name">${e.name}</h3>
  </li>
`}function d(e){for(const r of c)m(r);const a=document.querySelectorAll(".js__characters");for(const r of a)r.addEventListener("click",v)}function u(e){const a=e.imageUrl||"https://via.placeholder.com/210x295/ffffff/555555/?text=Disney";o.innerHTML+=`
    <li class="characterCard js__character favorites">
    <img class="characterCard__image" src="${a}" alt="${e.name}">
    <h3 class="characterCard__name">${e.name}</h3>
</li>`}function f(){o.innerHTML="";for(const e of t)u(e)}function v(e){const a=e.currentTarget,r=a.dataset.id,s=c.find(i=>i._id===parseInt(r)),l=t.findIndex(i=>i._id===parseInt(r));l===-1?(t.push(s),localStorage.setItem("favoritesData",JSON.stringify(t))):(t.splice(l,1),localStorage.setItem("favoritesData",JSON.stringify(t))),f(),a.classList.toggle("favorites")}h.addEventListener("submit",e=>{e.preventDefault(),fetch(`//api.disneyapi.dev/character?name=${_.value}`).then(a=>a.json()).then(a=>{Array.isArray(a.data)?c=a.data:c=[a.data],console.log(c),n.innerHTML="",d()})});fetch("//api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{c=e.data,d()});f();
//# sourceMappingURL=main.js.map
