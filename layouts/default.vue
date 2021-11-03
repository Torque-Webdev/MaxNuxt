<template>
<div>
  <head-header></head-header>
  <Nuxt/>
  <head-footer></head-footer>
</div>
</template>

<script>
export default {
  async fetch ({ store }) {
    await store.dispatch("videoSection/setVideo");
    await store.dispatch("videos/setVideos");
    await store.dispatch("posts/setPosts");
    await store.dispatch("profile/setProfile");
    await store.dispatch("media/setMedia");
    await store.dispatch("calendar/setFixtures");
    await store.dispatch("circuits/setCircuits");
    await store.dispatch("images/setImages");
    await store.dispatch("fanclub/setContent");
    await store.dispatch("partners/setContent");
    await store.dispatch("marketing/setContent");
  },
   created() {
    this.$store.dispatch("videoSection/setVideo");
    this.$store.dispatch("videos/setVideos");
    this.$store.dispatch("posts/setPosts");
    this.$store.dispatch("profile/setProfile");
    this.$store.dispatch("media/setMedia");
    this.$store.dispatch("calendar/setFixtures");
    this.$store.dispatch("circuits/setCircuits");
    this.$store.dispatch("images/setImages");
    this.$store.dispatch("fanclub/setContent");
    this.$store.dispatch("partners/setContent");
    this.$store.dispatch("marketing/setContent");
  },
}
</script>
