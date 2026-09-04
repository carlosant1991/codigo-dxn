(function() {
  function esMovil() {
    return window.matchMedia('(max-width: 980px)').matches;
  }

  function manejarClicMenu(e) {
    var enlace = e.target.closest('#main-menu-nav a, .LinkList a');
    if (!enlace) return;

    if (esMovil()) {
      // EN MÓVIL: Cierra todo el menú desplegable
      document.querySelectorAll('.show-menu, .LinkList').forEach(function(el) {
        el.classList.remove('show-menu', 'active', 'open');
      });
      document.body.classList.remove('show-menu', 'menu-active', 'nav-active', 'overlay-active');
      document.documentElement.classList.remove('show-menu', 'menu-active');
    } else {
      // EN ESCRITORIO: Solo oculta/cierra el submenú o desplegable actual
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
