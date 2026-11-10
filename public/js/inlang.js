(function(){
  var T={
    en:{nav_home:'Home',nav_catalog:'Catalog',nav_contact:'Contact Us',h1:'Close-by care for every pet',hero_p:'Find care centers, products and adoption events in one place.',hero_cta:'Browse the catalog',c1_h:'Find your nearest pet care center',c1_p:'Vets, groomers and daycares near you, with hours and available services.',c1_btn:'Find centers',c2_h:'Events & Adoption Specials',c2_p:'Explore upcoming adoption days and pet activities in your area.',c2_btn:'See all events',f_h:'Follow Livingcare Pets!',f_p:'Care tips, adoption stories and news every week.',pin_alt:'Location pin with a paw print',cat_alt:'Sitting white cat with gray patches'},
    es:{nav_home:'Inicio',nav_catalog:'Catálogo',nav_contact:'Contáctanos',h1:'Cuidado cercano para cada mascota',hero_p:'Encuentra centros de cuidado, productos y eventos de adopción en un solo lugar.',hero_cta:'Explorar el catálogo',c1_h:'Encuentra tu centro de cuidado más cercano',c1_p:'Veterinarias, peluquerías y guarderías cerca de ti, con horarios y servicios disponibles.',c1_btn:'Buscar centros',c2_h:'Eventos y adopciones especiales',c2_p:'Conoce las próximas jornadas de adopción y actividades para mascotas en tu zona.',c2_btn:'Ver todos los eventos',f_h:'¡Síguenos en Livingcare Pets!',f_p:'Consejos de cuidado, historias de adopción y novedades cada semana.',pin_alt:'Pin de ubicación con una huella',cat_alt:'Gato blanco con manchas grises sentado'}
  };
  function apply(l){
    document.documentElement.lang=l;
    document.querySelectorAll('[data-i18n]').forEach(function(e){e.textContent=T[l][e.getAttribute('data-i18n')]});
    document.querySelectorAll('[data-i18n-label]').forEach(function(e){e.setAttribute('aria-label',T[l][e.getAttribute('data-i18n-label')])});
    document.querySelectorAll('.nav-item').forEach(function(a){var t=a.querySelector('.tip');if(t)a.setAttribute('aria-label',t.textContent)});
    document.querySelectorAll('.lang button').forEach(function(b){b.setAttribute('aria-pressed',String(b.dataset.lang===l))});
  }
  var saved='en';
  try{saved=localStorage.getItem('lcp-lang')||'en'}catch(e){}
  if(!T[saved])saved='en';
  apply(saved);
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click',function(){
      apply(b.dataset.lang);
      try{localStorage.setItem('lcp-lang',b.dataset.lang)}catch(e){}
    });
  });
})();