<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-col class="text-center py-2" col="12">
          <UiImageUpload :image.sync="about.img" />
        </mdb-col>
      </mdb-row>

      <mdb-row>
        <UiPartners :partners.sync='about.partners'></UiPartners>

        <mdb-col col="12">
          <mdb-btn color="primary" @click.native="submitForm()">Update Content</mdb-btn>
        </mdb-col>
      </mdb-row>

    </mdb-container>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-4 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>

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
  mdbModal,
} from "mdbvue";
import { cloneDeep } from "lodash"
import { imageCollection, partnersPage } from "@/services/firebase";
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
          alt: ""
        },
        content: ""
      },
      msg: {
        message: "",
        type: "",
      },
      existsModal: false,
      uploadImage: false,
      selectModel: false,
      galleryContent: [],
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
      return this.$store.getters["partners/getContent"];
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
        partners: contents.partners
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
      partnersPage
        .doc(this.about.id)
        .update({
          alt: this.about.alt,
          url: this.about.url,
          content: this.about.content,
          imgId: this.about.imgId,
          partners: this.about.partners,
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
    newImage() {
      this.uploadImage = true;
      this.type = "new";
    },
    selectImage() {
      this.selectModel = true;
    },
    checkFile(event) {
      this.file = event.target.files[0];
      imageCollection
        .where("name", "==", this.file.name)
        .get()
        .then((docs) => {
          docs.forEach((doc) => {
            if (doc.exists) {
              this.existsModal = true;
              this.uploadImage = false;
              this.img.content = doc.data();
              this.img.id = doc.id;

            }
          });
        });
    },
    saveFile() {
      if (this.type === "headline") {
        const payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.$store.dispatch("images/uploadImage", payload);
        setTimeout(() => {
          this.img.content = this.updatedImage;
          this.about.imgId = this.img.content.id;
          this.about.url = this.img.content.url;
          this.about.alt = this.img.alt;
          this.uploadImage = false;
          this.type = "";
          this.file = "";
        }, 2000);
      } else if (this.type === "new") {
        const payload = {};
        payload.file = this.file;
        payload.alt = this.img.alt;
        this.$store.dispatch("images/uploadImage", payload);
        setTimeout(() => {
          this.img.content = this.updatedImage;
          this.galleryContent.push(this.img.content);
          this.uploadImage = false;
          this.type = "";
          this.file = "";
        }, 2000);
      }
    },
    closeImageUpload() {
      this.uploadImage = false;
      this.type = "";
      this.file = "";
      this.img.alt = "";
    },
    confirmUse() {
      if (this.type === "headline") {
        this.about.imgId = this.img.id;
        this.existsModal = false;
        this.about.url = this.img.content.url;
        this.about.alt = this.img.content.alt;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      } else if (this.type === "new") {
        this.galleryContent.push(this.img.content);
        this.existsModal = false;
        this.type = "";
        this.file = "";
        this.img.alt = "";
      }
    },
    declineUse() {
      this.existsModal = false;
      this.img.content = "";
      this.img.id = "";
      this.type = "";
      this.file = "";
      this.img.alt = "";
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
