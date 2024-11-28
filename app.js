var slideIndex = 0;
var autoSlideTimeout;

// Automatic slideshow function
function slideshow() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > x.length) { slideIndex = 1 }
  x[slideIndex - 1].style.display = "block";
  autoSlideTimeout = setTimeout(slideshow, 2000); // Change every 2 seconds
}

slideshow();

