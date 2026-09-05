(function() {
  function esMovil() {
    return window.matchMedia('(max-width: 980px)').matches;
  }

  function tieneSubmenu(enlace) {
    var liPadre = enlace.closest('li');
    if (!liPadre) return false;

    var tieneUl = liPadre.querySelector('ul') !== null;
    var tieneClaseSub = liPadre.classList.contains('has-sub') || 
                        liPadre.classList.contains('parent') || 
                        liPadre.classList.contains('dropdown');

    // Verifica también si el enlace es un placeholder ficticio (# o javascript:void)
    var href = enlace.getAttribute('href');
    var esEnlaceVacio = !href || href === '#' || href.startsWith('javascript:');

    return tieneUl || tieneClaseSub || esEnlaceVacio;
  }

  function manejarClicMenu(e) {
    var enlace = e.target.closest('#main-menu-nav a, .LinkList a');
    if (!enlace) return;

    // SI TIENE SUBMENÚS O ES BOTÓN DESPLEGABLE: Permite que la plantilla lo abra normalmente
    if (tieneSubmenu(enlace)) {
      return;
    }

    // SI ES UN ENLACE DE DESTINO FINAL:
    if (esMovil()) {
      // Retardo breve para dar tiempo al toque en pantalla táctil antes de cerrar
      setTimeout(function() {
        document.querySelectorAll('.show-menu, .LinkList').forEach(function(el) {
          el.classList.remove('show-menu', 'active', 'open');
        });
        document.body.classList.remove('show-menu', 'menu-active', 'nav-active', 'overlay-active');
        document.documentElement.classList.remove('show-menu', 'menu-active');
      }, 150);
    } else {
      // EN ESCRITORIO: Cierra solo la lista desplegable actual
      var submenu = enlace.closest('ul.sub-menu, ul.dropdown-menu, .mega-menu, li.has-sub > ul');
      if (submenu) {
        submenu.style.display = 'none';
        setTimeout(function() {
          submenu.style.display = '';
        }, 500);
      }
    }
  }

  // Usamos solo 'click' para evitar la hiper-sensibilidad del táctil en móviles
  document.addEventListener('click', manejarClicMenu, false);
})();
