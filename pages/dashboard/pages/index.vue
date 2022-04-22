<template>
  <div>
    <mdb-container>
      <mdb-row>
        <ui-image-upload :image.sync="about.img"></ui-image-upload>
      </mdb-row>

      <form class="pt-2 row" @submit.prevent="submitForm">
        <mdb-col>
          <ui-app-editor2 :content.sync="about.content"></ui-app-editor2>
        </mdb-col>

        <mdb-col>
          <mdb-btn color="primary" type="submit">Update Content</mdb-btn>
        </mdb-col>
      </form>
    </mdb-container>

    <!-- selectModel -->
    <mdb-modal
      top
      position="top"
      full-height
      direction="top"
      :show="selectModel"
      @close="selectModel = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Select image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="container-fluid">
          <div class="row">
            <div v-for="(img, index) in images" :key="index" class="col-4 p-0">
              <div class="custom-control custom-checkbox custom-control-inline">
                <img :src="img.url" :alt="img.alt" class="img-fluid" />
                <input
                  :id="img.id"
                  type="checkbox"
                  class="custom-control-input"
                  @click="selected(img)"
                />
                <label class="custom-control-label" :for="img.id">{{
                  img.alt
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="selectModel = false"
          >Close</mdb-btn
        >
        <mdb-btn color="primary" @click="saveSelection">Confirm</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>
  </div>
</template>

<script>
import {
  mdbBtn,
  mdbContainer,
  mdbCol,
  mdbRow,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal
} from "mdbvue";
import { cloneDeep } from "lodash"
import { fanclubPage } from "@/services/firebase";
export default {
  components: {
    mdbBtn,
    mdbContainer,
    mdbCol,
    mdbRow,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal
  },
  data() {
    return {
      about: {
        img: {
          url: "",
          alt: "",
          id: ""
        },
        content: "",
      },
      msg: {
        message: "",
        type: "",
      },
      existsModal: false,
      uploadImage: false,
      selectModel: false,
      file: "",
      img: {
        id: "",
        content: "",
        alt: "",
      },
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
    };
  },
  computed: {
    aboutContent() {
      return this.$store.getters["fanclub/getContent"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    updatedImage() {
      return this.$store.getters["images/getImage"];
    },
    images() {
      return this.$store.getters["images/getImages"];
    },
  },
  created() {
    setTimeout(() => {
      this.setAbout();
    }, 500);
  },
  methods: {
    setAbout() {
      const contents = cloneDeep(this.aboutContent)
      this.about = {
        img: {
          url: contents.url,
          alt: contents.alt,
        },
        content: contents.content,
      }
    },
    reset() {
      this.setAbout();
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
      this.type = "";
    },
    updateContent() {
      fanclubPage
        .doc(this.about.id)
        .update({
          alt: this.about.img.alt,
          url: this.about.img.url,
          content: this.about.content,
          galleryContent: this.galleryContent,
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Content updated",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.msg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    submitForm() {
      this.updateContent();
    },
    headlineImage() {
      this.uploadImage = true;
      this.type = "headline";
    },
    selectImage() {
      this.selectModel = true;
    },
    saveSelection() {
      this.selectModel = false;
    },
    selected(img) {
      this.galleryContent.push(img);
    },
    removeItem(img) {
      console.log(img);
      for (let i = 0; i < this.galleryContent.length; i++) {
        if (this.galleryContent[i].id === img) {
          this.galleryContent.splice(i, 1);
        }
      }
    },
  },
};
</script>
