(() => {
  const app = {
    init() {
      this.cacheElements();
      this.fetchEvents();
    },
    cacheElements() {
      this.$calendarContainer = document.querySelector(".calendar__container--day");
      this.$detailEventContainer = document.querySelector(".details");
      this.$otherEventsContainer = document.querySelector(".events");
    },
    async fetchEvents() {
      this.events = await new fetchData().getEvents();
      this.getParams(this.events);
      this.getDays(this.events);
    },
    getParams(events) {
      const params = new URLSearchParams(window.location.search);

      if (params.has("slug") && (params.has("day"))) {
        this.slug = params.get("slug");
        this.day = params.get("day");
        this.event = events.find(event => event.slug === this.slug && event.day === this.day);
        
        this.$detailEventContainer.innerHTML = this.generateHTMLForDetail(this.event);
        this.generateOtherEventsFromOrganizer(this.event.organizer);
      } else {
        this.$detailEventContainer.innerHTML = `
        <div class="wrapper padding center">
          <h1>Ja santé mijn ratsje, da es nie van mijn geweunte</h1>
          <p>De pagina die je probeerde te vinden is verplaatst of bestaat niet meer</p>
        </div>`
      }
    },
    getDays(events) {
      const array = events.map(({day, day_of_week}) => ({day, day_of_week}));
      const uniqueCalendarDays = [...new Map(array.map(event => [event['day'], event])).values()];
      this.calendarDays = (uniqueCalendarDays.sort((a, b) => a.day - b.day));
      this.generateCalendar(this.calendarDays);
    },
    generateCalendar(days) {
      this.$calendarContainer.innerHTML = days.map(day => this.generateHTMLForCalendar(day)).join("");
    },
    generateHTMLForCalendar(item) {
      return `
      <li class="calendar__day ${item.day === this.day ? 'calendar__day--active' : ''}"><a class="calendar__date" href="events/day.html?day=${item.day}">
      <span class="day_short ${item.day === this.day ? 'day_short--active' : ''}">${(item.day_of_week).slice(0, 2)}</span>
      <p class="day_long ${item.day === this.day ? 'day_long--active' : ''}">${item.day} Jul</p>
      </a></li>`
    },
    generateHTMLForDetail(event) {
      return `
      <div class="details__header">
        <h1>${event.title}</h1>
        <div class="details__location">
        <img src="static/media/icons/marker.svg">        
        <h2>${event.location}</h2>
        </div>
        <h2>${event.day_of_week} ${event.day} juli - ${event.start} u. > ${event.end} u.</h2>
      </div>

      <div class="details__container">
        <img class="details__img" src="${event.image === null ? "static/media/logo/background_gf19.svg" : event.image.full}" alt="${event.title} }" alt="">
        <div class="details__body">
            <div class="details__synopsis">
                <p>${event.description !== undefined ? event.description : ""}</p>
            </div>
            ${this.isWebsiteExisting(event.url)}
            <div class="details__info details__organizer">
                <span class="item">Organisator:</span>
                <div class="block">
                  <a class="link--grey" href="">${event.organizer}</a>                
                </div>
            </div>
            <div class="details__info details__categories">
                <span class="item">Categorieën:</span>
                <div class="block">
                  <a class="link--grey" href="">${event.category.map(category => `${category}`).join("<br>")}</a>
                </div>
            </div>
            ${this.isAccessible(event.wheelchair_accessible)}
            <div class="details__socials">
                <a class="link--white" href=""><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M21.37 7.277c.014.21.014.419.014.628 0 6.391-4.864 13.755-13.755 13.755-2.739 0-5.283-.793-7.424-2.17.39.045.764.06 1.168.06 2.26 0 4.34-.763 6.002-2.066a4.843 4.843 0 01-4.52-3.352c.299.045.598.074.913.074.434 0 .868-.06 1.272-.164a4.835 4.835 0 01-3.877-4.745v-.06c.644.36 1.392.584 2.185.614a4.831 4.831 0 01-2.155-4.026c0-.898.24-1.721.659-2.44a13.742 13.742 0 009.968 5.059 5.46 5.46 0 01-.12-1.108 4.832 4.832 0 014.835-4.834c1.392 0 2.649.584 3.532 1.527a9.518 9.518 0 003.068-1.168 4.821 4.821 0 01-2.125 2.664 9.692 9.692 0 002.784-.748 10.391 10.391 0 01-2.425 2.5z" fill="#000" fill-rule="nonzero"/></svg></a>
                <a class="link--white" href=""><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.072 13.474l.655-4.269h-4.096v-2.77c0-1.168.572-2.306 2.407-2.306H17.9V.494S16.21.206 14.594.206c-3.373 0-5.578 2.044-5.578 5.746v3.253h-3.75v4.27h3.75v10.32h4.615v-10.32h3.441z" fill="#000" fill-rule="nonzero"/></svg></a>
                <a class="link--white" href=""><svg class="pinterest" version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><title>pinterest</title><path d="M8.625 13.486c0 1.396 0.614 3.464 2.234 3.911 0.057 0 0.112 0.057 0.224 0.057 0.392 0 0.615-1.006 0.615-1.286 0-0.335-0.895-1.062-0.895-2.402 0-2.906 2.347-4.917 5.42-4.917 2.627 0 4.582 1.397 4.582 3.911 0 1.9-0.838 5.475-3.464 5.475-0.95 0-1.788-0.67-1.788-1.563 0-1.341 1.006-2.682 1.006-4.079 0-0.838-0.503-1.564-1.509-1.564-1.341 0-2.124 1.396-2.124 2.458 0 0.614 0.057 1.285 0.392 1.844-0.559 2.124-1.62 5.308-1.62 7.487 0 0.671 0.111 1.341 0.167 2.012v0.112l0.168-0.056c1.956-2.459 1.844-2.962 2.738-6.203 0.447 0.838 1.676 1.285 2.682 1.285 4.079 0 5.923-3.688 5.923-7.040 0-3.52-3.297-5.867-6.929-5.867-3.911-0.001-7.822 2.458-7.822 6.425z"></path></svg></a>
            </div>
        </div>
      </div>`
    },
    isAccessible(property) {
      if (property !== false) {
        return `<svg class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><title>wheelchair</title><path d="M12.646 15.008l0.47 2.993c-0.034-0.001-0.074-0.001-0.115-0.001-2.485 0-4.5 2.015-4.5 4.5s2.015 4.5 4.5 4.5c2.485 0 4.5-2.015 4.5-4.5 0-0.687-0.154-1.338-0.429-1.92l0.012 0.027 3.332 0.766c0.054 0.338 0.085 0.728 0.085 1.125 0 4.142-3.358 7.5-7.5 7.5s-7.5-3.358-7.5-7.5c0-2.932 1.682-5.471 4.134-6.704l0.043-0.020-0.813-2.274h-1.865c-0.552 0-1-0.448-1-1s0.448-1 1-1v0h2.57c0.431 0.001 0.798 0.274 0.938 0.656l0.002 0.007 1.064 2.972c0.35-0.067 0.707-0.11 1.072-0.127zM13.142 8.482c-1.772-0.188-3.141-1.675-3.141-3.482 0-1.933 1.567-3.5 3.5-3.5s3.5 1.567 3.5 3.5c0 1.346-0.76 2.515-1.874 3.1l-0.019 0.009 0.722 4.606c0.087-0.015 0.177-0.018 0.269-0.010l6 0.597c0.514 0.046 0.914 0.474 0.914 0.996 0 0.552-0.448 1-1 1-0.040 0-0.078-0.002-0.117-0.007l0.005 0-5.757-0.572 0.338 2.157 6.392 1.468c0.375 0.088 0.665 0.379 0.751 0.747l0.001 0.007 1.855 8.182 2.277-0.567c0.066-0.015 0.142-0.024 0.22-0.024 0.552 0 1 0.448 1 1 0 0.458-0.308 0.844-0.729 0.963l-0.007 0.002-3.268 0.815c-0.073 0.019-0.156 0.030-0.242 0.030-0.474 0-0.871-0.33-0.974-0.772l-0.001-0.007-1.943-8.566-6.439-1.48c-0.397-0.093-0.698-0.414-0.763-0.813l-0.001-0.006-1.47-9.374zM13.5 6.5c0.828 0 1.5-0.672 1.5-1.5s-0.672-1.5-1.5-1.5v0c-0.828 0-1.5 0.672-1.5 1.5s0.672 1.5 1.5 1.5v0zM13 24.5c-1.105 0-2-0.895-2-2s0.895-2 2-2v0c1.105 0 2 0.895 2 2s-0.895 2-2 2v0z"></path></svg>`
      } else {
        return ``
      }
    },
    isWebsiteExisting(url) {
      if (url !== null) {
        return `
        <div class="details__info details__website">
          <span class="item">Website:</span>
          <div class="block">
            <a class="link--grey" target="_blank" href="${url}">${url}</a>
          </div>
        </div>`
      } else {
        return ``
      }
    },
    async generateOtherEventsFromOrganizer(organizer) {
      const filterEvents = this.events.filter(event => event.organizer === organizer);
      const eventsFromOrganizer = filterEvents.sort((a, b) => a.day - b.day)
      this.$otherEventsContainer.innerHTML = `
      ${eventsFromOrganizer < 0 ? `<h2 class="details__other">Geen andere evenementen van ${organizer}</h2>` : `<h2 class="details__other">Andere evenementen van ${organizer}</h2>` }
      ${eventsFromOrganizer.map(event => this.generateHTMLForEventsFromOrganizer(event)).join("")}`
    },
    generateHTMLForEventsFromOrganizer(event) {
      return `  
        <article class="article">
        <a class="article__link" href="events/detail.html?day=${event.day}&slug=${event.slug}">
        <div class="article__img-container">
            <img class="article__img" loading="lazy" src="src="" alt="${event.title}">
        </div>
        <div class="article__details">
            <figcaption class="article__figcaption--black">${(event.day_of_week).slice(0,2)} ${event.day} Jul <span>${event.start} u.</span></figcaption>
            <h2 class="article__title">${event.title}</h2>
            <p class="article__location">${event.location}</p>
        </div>
        </a>
        </article>`
    }
  };
  
  app.init()

})();