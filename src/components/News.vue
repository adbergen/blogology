<template>
  <div class="q-pa-md">
    <q-form @submit.prevent="fetchSearchNews">
      <q-input
        placeholder="Search News"
        class="q-ma-md"
        outlined
        rounded
        dense
        type="text"
        v-model="searchword"
      >
        <template v-slot:prepend> <q-icon name="search" /> </template
      ></q-input>
    </q-form>

    <!-- <div class="search-icons">
      <i v-if="!isBusy" class="fas fa-search" @click="fetchSearchNews"></i>
      <i v-else class="fas fa-spinner fa-spin"></i>
      <i class="fas fa-times" @click="fetchTopNews"></i>
    </div> -->

    <q-list separator padding>
      <q-item class="q-pa-md">
        <q-item-section>
          <article
            v-for="(article, index) in articles"
            :key="index"
            @click="navTo(article.url)"
          >
            <header>
              <img v-if="article.urlToImage" :src="article.urlToImage" alt="" />
              <i v-else class="fas fa-image"></i>
            </header>

            <section class="text-weight-bold" v-html="article.title"></section>

            <footer>
              <i class="fas fa-chevron-right"></i>
            </footer>
          </article>
        </q-item-section>
      </q-item>
    </q-list>

    <div ref="infinitescrolltrigger" id="scroll-trigger">
      <i v-if="showloader" class="fas fa-spinner fa-spin"></i>
    </div>
  </div>
</template>

<script>
export default {
  props: ["apiKey"],
  data: () => {
    return {
      apiUrl: "",
      isBusy: false,
      showloader: false,
      currentPage: 1,
      totalResults: 0,
      maxPerPage: 20,
      searchword: "",
      articles: [],
      country: "us"
    };
  },
  computed: {
    pageCount() {
      return Math.ceil(this.totalResults / this.maxPerPage);
    }
  },
  methods: {
    navTo(url) {
      window.open(url);
    },
    resetData() {
      this.currentPage = 1;
      this.articles = [];
    },
    fetchSearchNews() {
      if (this.searchword !== "") {
        this.apiUrl =
          "https://newsapi.org/v2/everything?q=" +
          this.searchword +
          "&pageSize=" +
          this.maxPerPage +
          "&apiKey=" +
          this.apiKey;
        this.isBusy = true;
        this.resetData();
        this.fetchData();
      } else {
        this.fetchTopNews();
      }
    },
    fetchTopNews() {
      this.apiUrl =
        "https://newsapi.org/v2/top-headlines?country=" +
        this.country +
        "&pageSize=" +
        this.maxPerPage +
        "&apiKey=" +
        this.apiKey;
      this.isBusy = true;
      this.searchword = "";

      this.resetData();
      this.fetchData();
    },
    fetchData() {
      let req = new Request(this.apiUrl + "&page=" + this.currentPage);
      fetch(req)
        .then(resp => resp.json())
        .then(data => {
          this.totalResults = data.totalResults;
          data.articles.forEach(element => {
            this.articles.push(element);
          });
          this.isBusy = false;
          this.showloader = false;
        })
        .catch(error => {
          console.log(error);
        });
    },
    scrollTrigger() {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (
            entry.intersectionRatio > 0 &&
            this.currentPage < this.pageCount
          ) {
            this.showloader = true;
            this.currentPage += 1;
            this.fetchData();
          }
        });
      });
      observer.observe(this.$refs.infinitescrolltrigger);
    }
  },
  created() {
    this.fetchTopNews();
  },
  mounted() {
    this.scrollTrigger();
  }
};
</script>

<style lang="sass">
img
    max-width: 100%
    height: auto
</style>
