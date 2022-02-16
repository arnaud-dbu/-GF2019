function fetchData() {

  this.getEvents = async () => {
      try {
        const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/events.json`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  this.getNews = async () => {
      try {
        const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/news.json`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  this.getCategories = async () => {
    try {
      const response = await fetch(`https://www.pgm.gent/data/gentsefeesten/categories.json`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}