(function() {
  function esMovil() {
    return window.matchMedia('(max-width: 980px)').matches;
  }

  function tieneSubmenu(enlace) {
    var liPadre = enlace.closest('li');
    if (!liPadre) return false;

    // Verifica si el <li> contiene un <ul> interno o clases de submóvil
    var tieneUl = liPadre.querySelector('ul') !== null;
    var tieneClaseSub = liPadre.classList.contains('has-sub') || 
                        liPadre.classList.contains('parent') || 
                        liPadre.classList.contains('dropdown');

    return tieneUl || tieneClaseSub;
  }

  function manejarClicMenu(e) {
    var enlace = e.target.closest('#main-menu-nav a, .LinkList a');
    if (!enlace) return;

    // SI TIENE SUBMENÚS DEBAJO: No hace nada (permite abrir/desplegar normalmente)
    if (tieneSubmenu(enlace)) {
      return;
    }

    // SI ES UN ENLACE FINAL (SIN SUBMENÚS DEBAJO):
    if (esMovil()) {
      // EN MÓVIL: Cierra todo el menú desplegable
      document.querySelectorAll('.show-menu, .LinkList').forEach(function(el) {
        el.classList.remove('show-menu', 'active', 'open');
      });
      document.body.classList.remove('show-menu', 'menu-active', 'nav-active', 'overlay-active');
      document.documentElement.classList.remove('show-menu', 'menu-active');
    } else {
      // EN ESCRITORIO: Cierra la lista desplegable actual
      var submenu = enlace.closest('ul.sub-menu, ul.dropdown-menu, .mega-menu, li.has-sub > ul');
      if (submenu) {
        submenu.style.display = 'none';
        setTimeout(function() {
          submenu.style.display = '';
        }, 500);
      }
    }
  }

  document.addEventListener('click', manejarClicMenu, true);
  document.addEventListener('touchstart', manejarClicMenu, { passive: true });
})();
