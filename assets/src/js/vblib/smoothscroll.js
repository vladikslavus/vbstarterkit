/***************************************************
*	    Smooth Scrolling with Vanilla JavaScript     *
***************************************************/
function smoothScroll(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
 
  document.querySelector(href).scrollIntoView({
    behavior: "smooth"
  });
}

export { smoothScroll };