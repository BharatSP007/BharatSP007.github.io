var $ = document.getElementById.bind(document);
function setNav() {
  var top =
    (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

  if (top > 5) {
    //when scrolling starts
    $("site-title").className = "site-title site-title-collapsed";
    $("site-header-background").className =
      "site-header-background sh-collapsed";
  } else {
    //User has scrolled back to the top
    $("site-title").className = "site-title site-title-expanded";
    $("site-header-background").className =
      "site-header-background sh-expanded";
  }
}
document.addEventListener("scroll", function () {
  setNav();
});
document.addEventListener("DOMContentLoaded", function () {
  $("nav-button").addEventListener("click", function () {
    let sideNav = $("right");
    let menuIcon = $("menu-icon");
    let menuCloseIcon = $("menu-close-icon");
    if (sideNav.className == "right sn-expand") {
      sideNav.className = "right sn-collapse";
      menuIcon.style.display = "block";
      menuCloseIcon.style.display = "none";
    } else {
      sideNav.className = "right sn-expand";
      menuIcon.style.display = "none";
      menuCloseIcon.style.display = "block";

      //revert open submenus to initial state
      let checks = sideNav.getElementsByTagName("input");
      for (i = 0; i < checks.length; i++) {
        checks[i].checked = false;
      }
    }
  });

  let contactForm = $("contact-form");
  if (contactForm) {
    (function () {
      emailjs.init("yWdEXaM6q5Ee6QJ1p");
    })();
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      let formAlert;

      //display a message to let  the user know what's going on
      formAlert = document.getElementsByClassName("form-alert")[0];
      formAlert.textContent = "Sending. Please wait...";
      formAlert.className = "form-alert processing";

      emailjs
        .sendForm("service_3pu4qtm", "template_z0vx11r", "#contact-form")
        .then(
          function (response) {
            formAlert.textContent = "Your message was sent successfully!";
            formAlert.className = "form-alert success";
          },
          function (error) {
            formAlert.textContent = "Sorry! your message could not be sent.";
            formAlert.className = "form-alert error";
          }
        );
    });
  }
});
