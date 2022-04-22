<template>
  <div>
    <div id="news">
      <div class="container-fluid">
        <div class="row d-none">
          <div class="col-12 d-flex flex-row py-5">
            <button class="btn" :class="{ active: isActive == 'all' }" @click="filter('all')">All</button>
            <button
              v-for="(year, index) in years"
              :key="index"
              class="btn"
              :class="{ active: isActive == year }"
              @click="filter(year)"
            >{{year}}</button>
          </div>
        </div>
        <transition name="fade">
          <div v-if="transition">
            <div class="row bg-dark">
              <div
                v-for="(item, index) in paginatedData"
                :key="index"
                class="col-12 col-md-6 col-lg-4 p-0 m-auto"
              >
                  <div class="view overlay zoom">
                <nuxt-link :to="{ name: 'post-slug', params: { slug: item.slug } }" class="text-danger">
                    <img :src="item.url" :alt="item.alt" class="image-dim m-auto text-center" @load="getImage(item.imgId)" />
                    <div
                      class="mask rgba-black-strong d-flex flex-column justify-content-end pb-4 pl-4"
                    >
                      <h2 class="text-white">{{ item.title }}</h2>
                      <p class="text-white">{{ item.date | formatDate }}</p>
                      <nuxt-link :to="{ name: 'post-slug', params: { slug: item.slug } }" class="text-danger">More info</nuxt-link>
                    </div>
                </nuxt-link>
                  </div>
              </div>
            </div>
            <div class="col-12 text-center">
              <mdb-btn :class="{ 'd-none': pageNumber == 0 }" color="dark" @click="prevPage">
                <mdb-icon icon="angle-double-left" />
              </mdb-btn>
              <mdb-btn
                :class="{ 'd-none': pageNumber >= pageCount - 1 }"
                color="dark"
                @click="nextPage"
              >
                <mdb-icon icon="angle-double-right" />
              </mdb-btn>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mdbIcon, mdbBtn } from "mdbvue";
import moment from "moment";
import { imageCollection } from "@/services/firebase";

export default {
  name: "News",
  components: {
    mdbIcon,
    mdbBtn,
  },
  filters: {
    formatDate(val) {
      if (!val) {
        return "-";
      }
      const date = val;
      return moment(date).format("Do MMM YYYY");
    },
  },
  props: {
    size: {
      type: Number,
      required: false,
      default: 6,
    },
  },
  data() {
    return {
      isActive: 'all',
      pageNumber: 0,
      postsVw: [],
      transition: false,
      post: {
        img: "",
        alt: "",
      },
    };
  },
  computed: {
    posts: {
      get () {
        return this.postsVw;
      },
      set (newValue) {
        return newValue;
      },
    },
    years() {
      const allPosts = this.$store.getters["posts/getPublishedPosts"];
      const years = [...new Set(allPosts.map((item) => item.year))];
      return years;
    },
    pageCount() {
      const l = this.posts.length;
        const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
        const end = start + this.size;
      return this.posts.slice(start, end);
    },
  },
  mounted() {
    setTimeout(() => {
      this.postsVw = this.$store.getters["posts/getPublishedPosts"];
      this.transition = true;
    }, 500);
  },
  methods: {
    filter(value) {
      if (value === "all") {
        this.isActive = "all";
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.postsVw = this.$store.getters["posts/getPublishedPosts"];
          this.transition = true;
        }, 500);
      } else {
        this.isActive = value;
        this.$store.dispatch("posts/setPostsByYear", value);
        this.transition = false;
        this.pageNumber = 0;
        setTimeout(() => {
          this.postsVw = this.$store.getters["posts/getPostsByYear"];
          this.transition = true;
        }, 500);
        console.log(this.posts);
      }
    },
    getImage(id) {
      imageCollection
        .doc(id)
        .get()
        .then((doc) => {
          this.post.img = doc.data().url;
          this.post.alt = doc.data().alt;
        });
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
  },
};
</script>

<style scoped>
.active {
  background-color: black;
  color: white;
}
</style>
