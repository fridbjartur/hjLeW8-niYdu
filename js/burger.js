if (window.innerWidth < 991) {
  //		nav-menu-mobile - eventlisterns

  document.addEventListener("DOMContentLoaded", function(event) {
    navMenu();
  });

  //	viser & skjuler navigationsmenu

  function navMenu() {
    console.log("navMenu");

    function toggleMenu() {
      console.log("toggleMenu");
      document.querySelector(".burger").classList.toggle("change");
      document.querySelector("nav").classList.toggle("show");
      document.querySelector("header").classList.toggle("show");
    }

    function closeMenu() {
      console.log("closeMenu");
      document.querySelector(".burger").classList.remove("change");
      document.querySelector("nav").classList.remove("show");
      document.querySelector("header").classList.remove("show");
    }

    document.querySelector(".burger").addEventListener("click", toggleMenu);
    document.querySelector("nav ul").addEventListener("click", closeMenu);
  }
}
