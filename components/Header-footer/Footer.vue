<template>
  <div>
    <footer class="bg-primary bottom">
      <div class="footer-copyright py-4 px-md-5 bg-white">
        <mdb-container class="d-flex flex-center flex-column flex-row">
          <mdb-row
            class="pb-4 pt-2"
          >Photos courtesy of: VPM International, Alex Davis of Felix Brown Photo &amp; Jakob Ebrey Photography</mdb-row>
          <mdb-row class="d-flex flex-center flex-column text-center justify-content-around">
            <div class="col-12 text-dark">
              &copy; 2020 Copyright:
              <a
                href="http://www.torquetogether.com/"
                class="text-danger"
                target="_blank"
              >Torque Motorsport Ltd</a>
              <p class="my-auto px-md-2">Powered by</p>
            </div>
            <div class="col-12 text-dark text-center">
              <a href="http://www.torquetogether.com/" target="_blank">
                <img :src="require('../../assets/Torquelogo.png')" alt="Torque motorsport logo" />
              </a>
            </div>
          </mdb-row>
        </mdb-container>
      </div>
    </footer>
  </div>
</template>

<script>
import { mdbContainer, mdbRow } from "mdbvue";
export default {
  name: "Footer",
  components: {
    mdbContainer,
    mdbRow,
  },
};
</script>

<style scoped>
.d-flex img {
  transition: all 0.5s ease-in-out;
}

.d-flex img:hover {
  transform: scale(1.1);
}

.d-flex .links img:hover {
  background-color: red;
}

p {
  line-height: 2rem;
}

a:hover {
  color: red !important;
}
</style>
