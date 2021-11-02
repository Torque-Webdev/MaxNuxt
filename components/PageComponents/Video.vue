<template>
  <mdb-container fluid>
    <mdb-row v-if="video" class="videoContainer">
      <video class="video-fluid z-depth-1" autoplay loop muted>
        <source :src="video.url" type="video/mp4" />
      </video>
    </mdb-row>
  </mdb-container>
</template>

<script>
import { mdbContainer, mdbRow } from "mdbvue";
export default {
  name: "Video",
  components: {
    mdbContainer,
    mdbRow,
  },
  props: {
    msg: {
      type: String,
      default: ""
    },
  },
  async fetch ({ store }) {
    await store.dispatch("videoSection/setVideo");
  },
  computed: {
    video() {
      return this.$store.getters["videoSection/getVideo"][0]
    },
  },
};
</script>

<style lang="scss" scoped>
.video-fluid {
  width: 100%;
  max-width: none;
}
.videoContainer:fullscreen,
.videoContainer:-ms-fullscreen,
.videoContainer:-moz-full-screen,
.videoContainer:-webkit-full-screen {
  width: 100%;
  height: 100%;
}
</style>
