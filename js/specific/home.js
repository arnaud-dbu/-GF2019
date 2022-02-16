(() => {

  const app = {

    init() {
      this.cacheElements();
      this.fetchEvents();
      this.fetchNews();
    },
    cacheElements() {
      this.$randomEvents = document.querySelector(".random_events");
      this.$newsArticle = document.querySelector(".news");
    },
    async fetchEvents() {
      this.events = await new fetchData().getEvents();
      this.generateRandomEvents(this.events);
    },
    generateRandomEvents(events) {
      const filterEventsWithImages = events.filter(article => article.image !== null);
      const randomizeEvents = (filterEventsWithImages.sort(() => 0.5 - Math.random())).slice(0, 3);
      const sortRandomEvents = randomizeEvents.sort((a, b) => a.sort_key - b.sort_key);
      this.$randomEvents.innerHTML = sortRandomEvents.map(event => this.generateHTMLForEvents(event)).join("");
    },
    generateHTMLForEvents(event) {
      return `
        <article class="article">
          <a class="article__link" href="events/detail.html?day=${event.day}&slug=${event.slug}">
          <div class="article__img-container">
              <img class="article__img" loading="lazy" src="${event.image.thumb}" alt="${event.title}">
          </div>
          <div class="article__details">
              <figcaption class="article__figcaption--black">${(event.day_of_week).slice(0,2)} ${event.day} Jul <span>${event.start} u.</span></figcaption>
              <h2 class="article__title">${event.title}</h2>
              <p class="article__location">${event.location}</p>
          </div>
          </a>
        </article>`
    },
    async fetchNews() {
      this.news = (await new fetchData().getNews()).splice(0, 3);
      this.generateNews(this.news);
    },
    generateNews(news) {
      this.$newsArticle.innerHTML = news.map(item => this.generateHTMLForNews(item)).join("");
    },
    generateHTMLForNews(item) {
      return `
        <article class="article">
        <a class="article__link">
        <figure class="article__img-container">
            <img class="article__img" loading="lazy" src="https://www.pgm.gent/data/gentsefeesten/${item.picture.large}">
            <figcaption class="article__figcaption--white">${this.generateDateFormat(item.publishedAt)}</figcaption>
        </figure>
        <div class="article__details">
            <h2 class="article__title h2--black h2--large margin-bottom--m link--underline--thick">${item.title}</h2>
            <p class="article__description">${item.synopsis}</p>
            <img class="icon" src="static/media/icons/arrow-right.svg" alt="pijl naar rechts">
        </div>
        </a>
        </article>`
    },
    generateDateFormat(time) {
      const date = new Date(time);
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${day}/${month}`
    }
  };

  app.init();

})();