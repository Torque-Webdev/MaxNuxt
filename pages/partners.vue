<template>
  <div>
    <Header></Header>

    <div id="about" class="container-fluid">
      <div class="row">
        <div class="col-12 p-0">
          <img :src="about.url" class="img-fluid" :alt="about.alt" />
        </div>
        <div class="col-12">
          <div class="container">
            <div class="row py-2">
              <div v-for="(item, index) in about.partners" :key="index" class="col-12 p-0">
                <div class="row flex-center">
                  <div class="col-md-6">
                    <a :href="item.link" target="_blank">
                     <img :src="item.image.url" class="img-fluid" :alt="item.image.url" />
                    </a>
                  </div>
                  <div class="col-md-6 text-center text-md-left link" v-html="item.content"></div>
                </div>
              </div>
            </div>
          </div>
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
      return this.$store.getters["partners/getContent"];
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
