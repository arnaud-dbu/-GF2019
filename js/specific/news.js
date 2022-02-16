(() => {

  const app = {

    init() {
      this.cacheElements();
      this.fetchNews();
    },
    cacheElements() {
      this.$newsArticle = document.querySelector(".news");
    },
    async fetchNews() {
      this.news = await new fetchData().getNews();
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
                <h2 class="article__title h2--black h2--large margin-bottom--m link--underline link--underline">${item.title}</h2>
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