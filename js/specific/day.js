(() => {

  const app = {
    init() {
      this.cacheElements();
      this.fetchEvents();
    },
    cacheElements() {
      this.$calendarContainer = document.querySelector(".calendar__container--day");
      this.$events = document.querySelector(".random_events");
      this.$dayEventsContainer = document.querySelector('.day-events');
      this.$filterCategories = document.querySelector(".filter__categories");
      this.$scrollToTopBtn = document.querySelectorAll(".scroll-btn");
      this.$toggleList = document.querySelector(".toggle_list");
      this.$toggleRaster = document.querySelector(".toggle_raster");
      this.$viewContainer = document.querySelectorAll(".day-events");
      this.$randomEvents = document.querySelector(".random_events");
    },
    async fetchEvents() {
      this.events = await new fetchData().getEvents();
      await this.fetchCategories();
      this.generateParams(this.events);
    },
    async fetchCategories() {
      this.categories = await new fetchData().getCategories();
    },
    generateParams(events) {
      const params = new URLSearchParams(window.location.search);

      if (params.has("day")) {
        this.currentDay = params.get("day");
        this.filteredEvents = events.filter(event => event.day === this.currentDay);
        this.sortedEvents = this.filteredEvents.sort((a, b) => a.sort_key - b.sort_key);
      } else {
        this.$events.innerHTML = `
        <div class="wrapper padding center">
          <h1>Ja santé mijn ratsje, da es nie van mijn geweunte</h1>
          <p>De pagina die je probeerde te vinden is verplaatst of bestaat niet meer</p>
        </div>`
      }
      this.generateRandomEvents(this.sortedEvents);
      this.getCalendarDays(this.events);
      this.generateCategoryFilter(this.categories);
      this.generateCategoryHeaders(this.categories);
    },
    getCalendarDays(events) {
      const array = events.map(({day, day_of_week}) => ({day, day_of_week}));
      const uniqueDays = [...new Map(array.map(event => [event['day'], event])).values()];
      this.calendarDays = uniqueDays.sort((a, b) => a.day - b.day);
      this.generateCalendar(this.calendarDays);
    },
    generateCalendar(days) {
      this.$calendarContainer.innerHTML = days.map(day => this.generateHTMLForCalendar(day)).join("");
    },
    generateHTMLForCalendar(item) {
      return `
      <li class="calendar__day ${item.day === this.currentDay ? 'calendar__day--active' : ''}"><a class="calendar__date" href="events/day.html?day=${item.day}">
      <span class="day_short ${item.day === this.currentDay ? 'day_short--active' : ''}">${(item.day_of_week).slice(0, 2)}</span>
      <p class="day_long ${item.day === this.currentDay ? 'day_long--active' : ''}">${item.day} Jul</p>
      </a></li>`
    },
    generateCategoryFilter(categories) {
      const arr = [];
      for (const category of categories) {
        this.dayEvents = this.sortedEvents.filter(article => article.category == category);
        const x = (this.dayEvents.map(event => event.category));
        arr.push(x);
      }
      this.filterCategories = [...new Set(arr.flat(2))]
      this.$filterCategories.innerHTML = this.filterCategories.map(category => this.generateHTMLForCategoryFilter(category)).join("");
    },
    generateHTMLForCategoryFilter(category) {
      return `<li><a class="filter__item link--underline--thin" href="events/day.html?day=${this.sortedEvents[0].day}#${category}">${category}</a></li>`
    },
    generateCategoryHeaders(categories) {
      this.$dayEventsContainer.innerHTML = categories.map(category => this.generateHTMLForCategoryHeaders(category)).join("");
      this.scrollToTop();
      this.toggleView();
    },
    generateHTMLForCategoryHeaders(category) {
      this.dayEvents = this.sortedEvents.filter(article => article.category == category);

      if (this.dayEvents.length > 0) {
        return `
          <div class="day-events__container">
            <div class="day-events__title">
              <h2 id="${category}" class="h2--black">${category}</h2>
              <button class="scroll-btn"><img class="icon" src="static/media/icons/arrow-up.svg" alt="Pijl naar boven"></button>
            </div>
              <div class="events" margin-bottom--l">
              ${this.generateHTMLForEvents(this.dayEvents)}
            </div>
          </div> 
        `
      } else {
        return "";
      }
    },
    generateRandomEvents(events) {
      const filterEvents = events.filter(article => article.image !== null);
      const shuffleEvents = filterEvents.sort(() => 0.5 - Math.random());
      const sliceEvents = shuffleEvents.slice(0, 3);
      const sortEvents = sliceEvents.sort((a, b) => a.sort_key - b.sort_key);
      this.$randomEvents.innerHTML = this.generateHTMLForEvents(sortEvents);
    },
    generateHTMLForEvents(events) {
      return events.map(event =>
        `<article class="article">
        <a class="article__link" href="events/detail.html?day=${event.day}&slug=${event.slug}">
        <div class="article__img-container">
            <img class="article__img" loading="lazy" src=${event.image === null ? "static/media/logo/background_gf19.svg" : event.image.thumb} alt="${event.title}">
        </div>
        <div class="article__details">
            <figcaption class="article__figcaption--black">${event.start} u.</figcaption>
            <h2 class="article__title">${event.title}</h2>
            <p class="article__location">${event.location}</p>
        </div>
        </a>
        </article>`).join("");
    },
    scrollToTop() {
      const $scrollToTopBtn = document.querySelectorAll(".scroll-btn");

      for (const btn of $scrollToTopBtn) {
        btn.addEventListener("click", () => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }), false;
      }
    },
    toggleView() {
      this.$toggleRaster.addEventListener("click", () => {
        for (const container of this.$viewContainer) {
          container.classList.replace("raster", "day-events");
          this.$toggleList.classList.remove("toggle--fixed");
          this.$toggleRaster.classList.add("toggle--fixed");
        }
      }), false;

      this.$toggleList.addEventListener("click", () => {
        for (const container of this.$viewContainer) {
          container.classList.replace("day-events", "raster");
          this.$toggleRaster.classList.remove("toggle--fixed");
          this.$toggleList.classList.add("toggle--fixed");
        }
      }), false;
    }
  };
  
  app.init();

})();