document.addEventListener("DOMContentLoaded", function () {
  let zoom = 1;
  let currentIndex = 0;
  let imagesArray = [];

  let close = $("lightbox-hide"),
    zoomIn = $("lightbox-zoom-in"),
    zoomOut = $("lightbox-zoom-out"),
    next = $("lightbox-next"),
    previous = $("lightbox-previous"),
    resetImage = $("lightbox-reset-zoom"),
    lightboxImage = $("lightbox-image"),
    thumbnailNext = $("thumb-next"),
    thumbnailPrev = $("thumb-prev"),
    thumbContainer = $("thumb-list"),
    lightbox = $("lightbox"),
    imageSpinner = $("image-spinner");
  //Make the DIV element draggable:
  dragElement(lightboxImage);

  let thumbNailImgs = document.getElementsByClassName("lb-thumb"),
    albumThumbs = document.getElementsByClassName("album-thumb");
  for (let i = 0; i < albumThumbs.length; i++) {
    let element = albumThumbs[i];

    element.addEventListener("click", function () {
      console.log("attempting to show light box");
      showLightBox(element.getAttribute("data-full-size"));
    });
  }

  for (let i = 0; i < thumbNailImgs.length; i++) {
    let element = thumbNailImgs[i];
    let id = i;
    imagesArray.push(element.getAttribute("data-full-size"));
    element.addEventListener("click", function (e) {
      thumbNailImgs[currentIndex].classList.remove("active");
      loadAndSetImage(e.target.getAttribute("data-full-size"));
      currentIndex = id;
      setCurrentThumb(e.target)
      resetImageProperties();
    });
  }
  close.addEventListener("click",function(){
    thumbNailImgs[currentIndex].classList.remove("active");
    lightbox.classList.remove("visible")
    resetImageProperties();
  })
  next.addEventListener("click", function () {
    thumbNailImgs[currentIndex].classList.remove("active");
    if (currentIndex < imagesArray.length - 1) {
      currentIndex++;
      loadAndSetImage( imagesArray[currentIndex]);
      setCurrentThumb(thumbNailImgs[currentIndex])
    }
    resetImageProperties();
  });
  previous.addEventListener("click", function () {
    thumbNailImgs[currentIndex].classList.remove("active");
    if (currentIndex > 0) {
      currentIndex--;
      loadAndSetImage(imagesArray[currentIndex])
      setCurrentThumb(thumbNailImgs[currentIndex]);
    }
    resetImageProperties();
  });
  zoomIn.addEventListener("click", function () {
    zoom += 0.2;
    applyZoom();
  });
  zoomOut.addEventListener("click", function () {
    zoom -= 0.2;
    applyZoom();
  });
  resetImage.addEventListener("click", function () {
    resetImageProperties()
  });
  lightboxImage.addEventListener("wheel", function (event) {
    event.preventDefault();

    zoom += event.deltaY * -0.01;
    applyZoom();
  });

  thumbnailNext.addEventListener("click", function () {
    thumbContainer.scrollBy(400, 0);
  });
  thumbnailPrev.addEventListener("click", function () {
    thumbContainer.scrollBy(-400, 0);
  });
  //Code by W3Schools
  function dragElement(elmnt) {
    let pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    let t2pos1 = 0,
      t2pos2 = 0,
      t2pos3 = 0,
      t2pos4 = 0;

    let initialDist = 0;
    let dist = 0;
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchstart = dragMouseDown;
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();

      // get the mouse cursor position at startup:
      let clientX, clientY;
      if (e.clientX) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      pos3 = clientX;
      pos4 = clientY;
      console.log(e.touches);
      if (e.touches && e.touches.length == 2) {
        //this is a multitouch event
        t2pos3 = e.touches[1].clientX;
        t2pos4 = e.touches[1].clientY;
        let difX = pos3 - t2pos3,
          difY = pos4 - t2pos4;
        initialDist = Math.sqrt(difX * difX + difY * difY);
      }
      document.onmouseup = closeDragElement;
      document.ontouchend = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
      document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      let clientX, clientY;
      if (e.clientX) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
      // calculate the new cursor position:
      pos1 = pos3 - clientX;
      pos2 = pos4 - clientY;
      pos3 = clientX;
      pos4 = clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
      //  console.log("translate(" + (elmnt.offsetTop - pos2) + "px," + (elmnt.offsetLeft - pos1) + "px);")
      //elmnt.style.transform = "translate(" + (elmnt.offsetTop - pos2) + "," + (elmnt.offsetLeft - pos1) + ");";

      if (e.touches && e.touches.length == 2) {
        elmnt.style.transition = "scale 0s";
        t2pos1 = e.touches[0].clientX;
        t2pos2 = e.touches[0].clientY;
        t2pos3 = e.touches[1].clientX;
        t2pos4 = e.touches[1].clientY;
        let difX = t2pos1 - t2pos3,
          difY = t2pos2 - t2pos4;

        dist = Math.sqrt(difX * difX + difY * difY);
        zoom += (dist - initialDist) * 0.005;

        applyZoom();
      }
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
      document.ontouchend = null;
      document.ontouchmove = null;
      initialDist = 0;
      dist = 0;
    }
  }

  function showLightBox(url) {
    lightbox.classList.add("visible")
    if (url) {
      loadAndSetImage(url);
      currentIndex = imagesArray.indexOf(url);
    } else {
      loadAndSetImage(imagesArray[currentIndex])
    }
    
    setCurrentThumb(thumbNailImgs[currentIndex])
   
  }

  function applyZoom() {
    // Restrict scale
    zoom = Math.min(Math.max(1, zoom), 10);
    lightboxImage.style.transform = "translate(-50%, -50%) scale(" + zoom + ")";
  }

  function setCurrentThumb(thumbNailElement){
    thumbNailElement.classList.add("active");
    thumbNailElement.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }

  function resetImageProperties(){
    zoom = 1;
    applyZoom();
    lightboxImage.style.top = "50%";
    lightboxImage.style.left = "50%";
  }

  function loadAndSetImage(url){
    imageSpinner.style.opacity = 1;
    lightboxImage.style.opacity = 0;
  var downloadingImage = new Image();

    downloadingImage.onload = function(){
      imageSpinner.style.opacity = 0;
        lightboxImage.src = this.src;
        lightboxImage.style.opacity = 1;
    };
    downloadingImage.src = url;
  }
});
