<template>
  <div>
    <Header></Header>
    <div id="news">
      <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex flex-row py-5">
            <button class="btn" :class="{ active: isActive == 'all' }" @click="filter('all')">All</button>
            <button
              class="btn"
              :class="{ active: isActive == 'images' }"
              @click="filter('images')"
            >Images</button>
            <button
              class="btn"
              :class="{ active: isActive == 'videos' }"
              @click="filter('videos')"
            >Videos</button>
          </div>
        </div>
        <transition name="fade">
          <div v-if="transition">
            <div class="row bg-dark">
              <div
                v-for="(item, index) in paginatedData"
                :key="index"
                class="col-12 col-md-6 col-lg-4 p-0 m-auto text-center"
              >
                <img
                  v-if="item.imgId"
                  :src="item.url"
                  :alt="item.alt"
                  class="image-dim"
                  @click="showImg(index)"
                />

                <video v-if="item.videoId" class="image-dim" controls >
                  <source :src="item.url" type="video/mp4" :alt="item.alt"/>
                </video>

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

export default {
  name: "Media",
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
      default:9,
    },
  },
  data() {
    return {
      isActive: null,
      pageNumber: 0,
      itemsVw: [],
      transition: false,
      visible: false,
      index: 0,
    };
  },
  computed: {
    items() {
      return this.itemsVw;
    },
    pageCount() {
      const l = this.items.length;
        const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
        const end = start + this.size;
      return this.items.slice(start, end);
    },
  },
  created() {
    this.isActive = "all";
  },
  mounted() {
    setTimeout(() => {
      this.itemsVw = this.$store.getters["media/getMedia"].galleryContent.reverse();
      this.transition = true;
    }, 500);
  },
  methods: {
    filter(value) {
      this.transition = false;
      this.pageNumber = 0;
      this.itemsVw = this.$store.getters["media/getMedia"].galleryContent
      if (value === "all") {
        this.isActive = "all";
        setTimeout(() => {
          this.itemsVw = ''
          this.transition = true;
        }, 500);
      } else if (value === "images") {
        this.isActive = "images";
        setTimeout(() => {
          this.itemsVw = this.itemsVw.filter((item) => {
          return item.imgId;
        });
          this.transition = true;
        }, 500);
      } else if (value === "videos") {
        this.isActive = "videos";
        setTimeout(() => {
          this.itemsVw = this.itemsVw.filter((item) => {
          return item.videoId;
        });
          this.transition = true;
        }, 500);
      }
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
