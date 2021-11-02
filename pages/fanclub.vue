<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 col-lg-6 p-0">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-12 col-lg-6 p-5 my-auto">
          <div style="max-width:600px;" class="m-auto" v-html="about.content"></div>
        </div>
      </div>
    </div>
    <home-contact id="contact"></home-contact>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      index: 0,
      hooperSettings: {
        itemsToShow: 2,
        centerMode: true,
        breakpoints: {
          800: {
            centerMode: false,
            itemsToShow: 4,
          },
        },
      },
    };
  },
  computed: {
    about() {
      return this.$store.getters["fanclub/getContent"];
    },
    imgs() {
      const urls = [];
      this.about.galleryContent.forEach((img) => {
        urls.push(img.url);
      });
      return urls;
    },
  },
  methods: {
    showImg(index) {
      this.index = index;
      this.visible = true;
    },
    handleHide() {
      this.visible = false;
    },
  },
};
</script>
