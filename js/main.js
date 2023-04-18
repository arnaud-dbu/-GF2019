(() => {

  const app = {

    init() {
      this.cacheElements();
      this.randomizeHeaderBackground();
      this.addEventListenersToHeader();
    },
    cacheElements() {
      this.$header = document.querySelector(".header");
      this.$mobileNavigation = document.querySelector(".header__mobile");
      this.$programEventDays = document.querySelector(".header__mobile-event-days");
      this.$hamburgerOpenBtn = document.querySelector(".header__hamburger-btn");
      this.$hamburgerCloseBtn = document.querySelector(".header__mobile-close-btn");
      this.$languageBtn = document.querySelector(".header__language-btn");
      this.$languageDropdown = document.querySelector(".header__language-dropdown")
      this.$chevronUpProgram = document.querySelector(".program__chevron_up");
      this.$chevronUpLanguage = document.querySelector(".language__chevron_up");
      this.$programBtn = document.querySelector(".header__mobile-program");
    },
    randomizeHeaderBackground() {
      const images = ["gentse-feesten-1", "gentse-feesten-2", "gentse-feesten-3", "gentse-feesten-4", "gentse-feesten-5", "gentse-feesten-6", "gentse-feesten-7", "gentse-feesten-8", "gentse-feesten-9"];
      const randomImage = images[Math.floor(Math.random() * images.length)];
      this.$header.style.backgroundImage = `url(static/media/images/${randomImage}.jpg)`;
    },
    addEventListenersToHeader() {
      this.$languageBtn.addEventListener("click", () => {
        this.$chevronUpLanguage.classList.toggle("rotate");
        setTimeout(() => {
          this.$languageDropdown.classList.toggle("js-expanded");
        }, 150);
      }), false;

      this.$hamburgerOpenBtn.addEventListener("click", () => {
        this.$mobileNavigation.classList.toggle("js-expanded");
      }), false;

      this.$hamburgerCloseBtn.addEventListener("click", () => {
        this.$mobileNavigation.classList.toggle("js-expanded");
      }), false;

      this.$programBtn.addEventListener("click", () => {
        setTimeout(() => {
          this.$programEventDays.classList.toggle("js-expanded");
        }, 200);
        // this.$chevronUpProgram.classList.toggle("rotate");
      }), false;
    },
  }

  app.init();

})();