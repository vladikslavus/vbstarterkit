/********************************************************
*                   smartnavbar.js                      *
********************************************************/

class smartNavbar {
  constructor(params) {
    this.navbar = document.querySelector(params.navbar);
    this.speed = (params.speed === undefined) ? 0 : parseInt(params.speed); // ms
    this.navbarHeight = (params.navbarHeight === undefined || params.navbarHeight === 'auto') ? parseInt(this.navbar.offsetHeight) : params.navbarHeight;
  }

  navHide() {
    this.navbar.style.top = `-${this.navbarHeight}px`;
    this.navbar.style.transition = `all ${this.speed}ms ease-out`;
  }
  navShow() {
    this.navbar.style.top = '0';
    this.navbar.style.transition = `all ${this.speed}ms ease-out`;
  }

  // changing the behavior of the navbar depending on screen orientation
  toggleNavbarOnScreenOrientation() {

    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // when load the page
    if (currentScrollTop > this.navbarHeight) {
      this.navHide();
    }

    // determining whether a device has portrait orientation
    let mql = window.matchMedia("(orientation: portrait)");

    // when change screen orientation
    // listening to the screen orientation change event
    mql.addListener((m) => {
      if (m.matches) {
        // changed to portrait orientation
        this.navShow();        
      } else if (!m.matches && window.screen.height > 500) {
        // changed to landscape orientation
        this.navHide();
      }
    });

  }

  // scroll handler, toggle `navHide/navShow` when scrolling
  toggleNavbarOnScroll() {

    let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    let scrollingDown = (this.initialScrollTop < currentScrollTop);
    let scrollingUp = (this.initialScrollTop > currentScrollTop);

    if (scrollingDown === true) {
      this.navHide();
    } else if (scrollingUp === true && window.screen.height > 500 || currentScrollTop < 10) {
      this.navShow();
    }

    this.initialScrollTop = currentScrollTop;

  }

  start() {
    this.toggleNavbarOnScreenOrientation();

    // use `Function.prototype.bind` not to loose context and to set scrollTop initial value
    document.addEventListener('scroll', this.toggleNavbarOnScroll.bind(this, this.initialScrollTop = 0));
  }

  checkParams() {
    console.log(`
          navbar: ${this.navbar},
          speed: ${this.speed},
          navbarHeight: ${this.navbarHeight}
      `)
  }

}

export { smartNavbar };