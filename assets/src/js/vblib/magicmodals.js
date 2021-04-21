/****************************************************
*               Class magicModals                   *
*             Modal window generagor                *
*****************************************************/
class magicModals {
  constructor(params) {
      // this.id = document.querySelector(params.id);
      this.container = (params.container === undefined) ? null : document.querySelectorAll(params.container),
      this.openBtn = (params.openBtn === undefined) ? null : document.querySelectorAll(params.openBtn),
      this.closeBtn = (params.closeBtn === undefined) ? null : document.querySelectorAll(params.closeBtn),
      this.scrollbarWidth = parseInt(params.scrollbarWidth); // better use getscrollbarwidth.js to pass a value
      this.speed = (params.speed === undefined) ? 0 : parseInt(params.speed); // ms

      this.smartNavbarInstance = params.smartNavbarInstance;
  }

  modalShow(id) {
      let modalWindowContainer = document.querySelector(`#${id}`);
      document.body.style.display = 'fixed';
      document.body.style.marginLeft = `-${this.scrollbarWidth}px`;
      document.documentElement.style.overflow = 'hidden';
      modalWindowContainer.style.opacity = '1';
      modalWindowContainer.style.visibility = 'visible';
      modalWindowContainer.style.transition = `opacity ${this.speed}ms linear, visibility ${this.speed}ms linear`;
      // console.log('modalShow: ', modalWindowContainer.style.transition);
  }

  modalHide(id) {
      let modalWindowContainer = document.querySelector(`#${id}`);
      modalWindowContainer.style.opacity = '0';
      modalWindowContainer.style.visibility = 'hidden';
      modalWindowContainer.style.transition = `opacity ${this.speed}ms linear, visibility ${this.speed}ms linear`;
      // need to wait a bit for modalWindow to be shut
      setTimeout(() => {
          document.body.style.marginLeft = '0';
          document.documentElement.style.overflow = '';
      }, this.speed);
  }

  launch() {
      for (let el of this.openBtn) {
          el.addEventListener('click', e => {
              e.preventDefault();
              let modalWindowId = e.target.dataset.modalId;
              if(this.smartNavbarInstance) this.smartNavbarInstance.navHide();
              this.modalShow.bind(this)(modalWindowId);
          });
      }

      for (let el of this.closeBtn) {
          el.addEventListener('click', e => {
              e.preventDefault();
              let modalWindowId = e.target.dataset.modalId;
              this.modalHide.bind(this)(modalWindowId);
              // need to wait a bit for the browser scrollbar to be shown
              if(this.smartNavbarInstance) setTimeout(() => this.smartNavbarInstance.navShow(), 300);
          });
      }

      for (let el of this.container) {
          el.addEventListener('click', e => {
              e.preventDefault();
              if (e.target.id) {
                  this.modalHide.bind(this)(e.target.id);
                  // need to wait a bit for the browser scrollbar to be shown
                  if(this.smartNavbarInstance) setTimeout(() => this.smartNavbarInstance.navShow(), 300);
              }
          });
      }
  }

}

export { magicModals };