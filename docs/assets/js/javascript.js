var $ = document.getElementById.bind(document);
function setNav() {
  var top =
    (window.pageYOffset || document.scrollTop) - (document.clientTop || 0);

  if (top > 5) {
    //when scrolling starts
    $("site-title").className = "site-title site-title-collapsed";
    $("site-header-background").className = "site-header-background sh-collapsed";
   
   
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
    let menuIcon = $("menu-icon")
    let menuCloseIcon = $("menu-close-icon")
    if (sideNav.className == "right sn-expand") {
      sideNav.className = "right sn-collapse";
      menuIcon.style.display = "block"
      menuCloseIcon.style.display = "none" 
      
    } else {
      sideNav.className = "right sn-expand";
      menuIcon.style.display = "none"
      menuCloseIcon.style.display = "block"

      //revert open submenus to initial state
      let checks = sideNav.getElementsByTagName("input");
      for(i=0;i<checks.length; i++){
        checks[i].checked = false;
      }
    }
  });

  let contactForm = $('contact-form');
  if(contactForm){
    
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      let senderName, senderEmail, senderPhone, queryMessage, formAlert;
      
      //display a message to let  the user know what's going on
      formAlert = document.getElementsByClassName("form-alert")[0];
      formAlert.textContent = "Sending. Please wait..."
      formAlert.className = "form-alert processing"
      

      senderName = $("sender-name").value
      senderEmail = $("sender-email").value
      senderPhone = $("sender-phone").value
      queryMessage = $("query-message").value
      
      Email.send({
        SecureToken : "ce13e120-37e5-4916-8bc5-4c0ac9a9ec70",
        To : 'lafleurvioletblog@gmail.com',
        From : "sngcasmcf@gmail.com",
        Subject : "Quick query",
        Body : "New query received.<br /> sender: "+senderName + "<br /> email: <a href=\"mailto:"+senderEmail+"\">"+senderEmail+"</a> <br /> Phone: "+senderPhone + "<br /> message: <br /> "+ queryMessage + "<br /> <i>NB: Please do not reply to this email. Only reply to the sender.</i>"
    }).then(
      message => {
        if(message=="OK"){
          formAlert.textContent = "Your message was sent successfully!"
          formAlert.className = "form-alert success"
        } else{
          formAlert.textContent = "Sorry! your message could not be sent."
          formAlert.className = "form-alert error"
        }
      }
    );
    
    })

  }
});
