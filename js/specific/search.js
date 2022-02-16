(() => {

  const app = {

    init() {
      this.cacheElements();
      this.fetchEvents();
    },
    cacheElements() {
      this.$search = document.querySelector(".search__body");
      this.$headerSearch = document.querySelector(".header__search");
    },
    async fetchEvents() {
      this.events = await new fetchData().getEvents();
      this.generateParams(this.events);
    },
    generateParams(events) {
      const params = new URLSearchParams(window.location.search);
      if (params.has("search")) {
        this.currentSearch = params.get("search").toLowerCase();
        this.filterEvents = events.filter(item => item.title.toLowerCase().includes(this.currentSearch));
        this.sortEvents = this.filterEvents.sort((a, b) => a.sort_key - b.sort_key);
        this.amountEvents = this.sortEvents.length;
        this.$search.innerHTML = this.generateHTMLForSearch(this.sortEvents);
        this.$headerSearch.innerHTML = this.generateHTMLForHeaderSearch(this.sortEvents);
        this.toggleView();
      } else {
        this.$events.innerHTML = `
        <div class="wrapper padding center">
          <h1>Ja santé mijn ratsje, da es nie van mijn geweunte</h1>
          <p>De pagina die je probeerde te vinden is verplaatst of bestaat niet meer</p>
        </div>`
      }
    },
    generateHTMLForSearch(events) {
      if (events.length === 0) {
        return `
        <form class="search-bar" action="events/search.html">
          <input id="search-bar__input" type="search" placeholder="${this.currentSearch}" autocomplete="off" name="search" value="" size="30" maxlength="128">           
          <button id="search-bar__btn" type="submit"><svg class="svg-loop" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>search</title><path d="M19.371 17.952l1.997 1.997c0.272-0.11 0.587-0.174 0.917-0.174 0.693 0 1.321 0.281 1.776 0.736l3.704 3.704c0.454 0.454 0.735 1.082 0.735 1.775 0 1.386-1.124 2.51-2.51 2.51-0.693 0-1.321-0.281-1.775-0.735v0l-3.705-3.705c-0.455-0.454-0.736-1.082-0.736-1.776 0-0.33 0.064-0.645 0.179-0.933l-0.006 0.017-2.053-2.053c-1.474 1.098-3.332 1.758-5.343 1.758-0.005 0-0.010 0-0.015 0h0.001c-4.991 0-9.037-4.046-9.037-9.037s4.046-9.037 9.037-9.037v0c0 0 0 0 0.001 0 4.991 0 9.037 4.046 9.037 9.037 0 2.267-0.835 4.339-2.214 5.926l0.009-0.011zM12.538 18.062c3.328 0 6.025-2.697 6.025-6.025s-2.697-6.025-6.025-6.025v0c-3.328 0-6.025 2.697-6.025 6.025s2.697 6.025 6.025 6.025v0z"></path></svg></button>
        </form> 
        <div class="search_results">
          <h2><span class="h2--black">${this.amountEvents} resultaten </span>voor "${this.currentSearch}"</h2>        
        </div>
        
        <p>Geen resultaten gevonden. Probeer het opnieuw met een andere zoekterm.</p>`
      } else {
        return `
      <form class="search-bar" action="events/search.html">
        <input id="search-bar__input" type="search" placeholder="${this.currentSearch}" autocomplete="off" name="search" value="" size="30" maxlength="128">           
        <button id="search-bar__btn" type="submit"><svg class="svg-loop" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>search</title><path d="M19.371 17.952l1.997 1.997c0.272-0.11 0.587-0.174 0.917-0.174 0.693 0 1.321 0.281 1.776 0.736l3.704 3.704c0.454 0.454 0.735 1.082 0.735 1.775 0 1.386-1.124 2.51-2.51 2.51-0.693 0-1.321-0.281-1.775-0.735v0l-3.705-3.705c-0.455-0.454-0.736-1.082-0.736-1.776 0-0.33 0.064-0.645 0.179-0.933l-0.006 0.017-2.053-2.053c-1.474 1.098-3.332 1.758-5.343 1.758-0.005 0-0.010 0-0.015 0h0.001c-4.991 0-9.037-4.046-9.037-9.037s4.046-9.037 9.037-9.037v0c0 0 0 0 0.001 0 4.991 0 9.037 4.046 9.037 9.037 0 2.267-0.835 4.339-2.214 5.926l0.009-0.011zM12.538 18.062c3.328 0 6.025-2.697 6.025-6.025s-2.697-6.025-6.025-6.025v0c-3.328 0-6.025 2.697-6.025 6.025s2.697 6.025 6.025 6.025v0z"></path></svg></button>
      </form>           

      <div class="search_results margin-bottom--l">
          <h2><span class="h2--black">${this.amountEvents} resultaten </span>voor "${this.currentSearch}"</h2>        
      </div>

      <section>
        <div class="toggle_view">
            <button class="toggle toggle_raster toggle--fixed" href=""><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>raster</title><path d="M7.2 9.6c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM16 9.6c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM24.8 9.6c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM7.2 18.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM7.2 27.2c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM16 18.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM16 27.2c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM24.8 18.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM24.8 27.2c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0z"></path></svg></button>
            <button class="toggle toggle_list" href=""><svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>list</title><path d="M7.2 9.6c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM7.2 18.4c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM7.2 27.2c-1.325 0-2.4-1.075-2.4-2.4s1.075-2.4 2.4-2.4v0c1.325 0 2.4 1.075 2.4 2.4s-1.075 2.4-2.4 2.4v0zM14 8.4c-0.663 0-1.2-0.537-1.2-1.2s0.537-1.2 1.2-1.2v0h12c0.663 0 1.2 0.537 1.2 1.2s-0.537 1.2-1.2 1.2v0h-12zM14 17.2c-0.663 0-1.2-0.537-1.2-1.2s0.537-1.2 1.2-1.2v0h12c0.663 0 1.2 0.537 1.2 1.2s-0.537 1.2-1.2 1.2v0h-12zM14 26c-0.663 0-1.2-0.537-1.2-1.2s0.537-1.2 1.2-1.2v0h12c0.663 0 1.2 0.537 1.2 1.2s-0.537 1.2-1.2 1.2v0h-12z"></path></svg></button>
        </div>
      </section>

      <section class="day-events wrapper">
        <div class="day-events__container">
          <div class="events" margin-bottom--l">
          ${events.map(event => this.generateHTMLForResults(event)).join("")}
          </div>
        </div> 
      </section>`
      }
    },
    generateHTMLForResults(event) {
      return `    
        <article class="article">
          <a class="article__link" href="events/detail.html?day=${event.day}&slug=${event.slug}">
            <div class="article__img-container">
                <img class="article__img" loading="lazy" src=${event.image === null ? "static/media/logo/background_gf19.svg" : event.image.thumb} alt="${event.title}">
            </div>
            <div class="article__details">
              <figcaption class="article__figcaption--black">${(event.day_of_week).slice(0,2)} ${event.day} Jul <span>${event.start} u.</span></figcaption>
              <h2 class="article__title">${event.title}</h2>
              <p class="article__location">${event.location}</p>
            </div>
          </a>
        </article>`
    },
    generateHTMLForHeaderSearch() {
      return `
      <input id="header__search-input" type="search" placeholder="${this.currentSearch}" autocomplete="off" name="search" value="" size="30" maxlength="128">           
      <button id="header__search-btn" type="submit"><svg class="svg-loop" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>search</title><path d="M19.371 17.952l1.997 1.997c0.272-0.11 0.587-0.174 0.917-0.174 0.693 0 1.321 0.281 1.776 0.736l3.704 3.704c0.454 0.454 0.735 1.082 0.735 1.775 0 1.386-1.124 2.51-2.51 2.51-0.693 0-1.321-0.281-1.775-0.735v0l-3.705-3.705c-0.455-0.454-0.736-1.082-0.736-1.776 0-0.33 0.064-0.645 0.179-0.933l-0.006 0.017-2.053-2.053c-1.474 1.098-3.332 1.758-5.343 1.758-0.005 0-0.010 0-0.015 0h0.001c-4.991 0-9.037-4.046-9.037-9.037s4.046-9.037 9.037-9.037v0c0 0 0 0 0.001 0 4.991 0 9.037 4.046 9.037 9.037 0 2.267-0.835 4.339-2.214 5.926l0.009-0.011zM12.538 18.062c3.328 0 6.025-2.697 6.025-6.025s-2.697-6.025-6.025-6.025v0c-3.328 0-6.025 2.697-6.025 6.025s2.697 6.025 6.025 6.025v0z"></path></svg></button>`
    },
    toggleView() {
      this.$toggleList = document.querySelector(".toggle_list");
      this.$toggleRaster = document.querySelector(".toggle_raster");
      const $viewContainer = document.querySelector(".day-events");

      this.$toggleRaster.addEventListener("click", () => {
        $viewContainer.classList.replace("raster", "day-events");
        this.$toggleList.classList.remove("toggle--fixed");
        this.$toggleRaster.classList.add("toggle--fixed");
      }), false;

      this.$toggleList.addEventListener("click", () => {
        $viewContainer.classList.replace("day-events", "raster");
        this.$toggleRaster.classList.remove("toggle--fixed");
        this.$toggleList.classList.add("toggle--fixed");
      }), false;
    }
  };

  app.init();

})();