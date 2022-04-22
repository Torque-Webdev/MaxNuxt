<template>
  <div>
    <mdb-container>
      <mdb-row>
        <mdb-col class="text-center pt-2">
          <ui-image-upload :image.sync="marketing.img"></ui-image-upload>
        </mdb-col>
      </mdb-row>
      <form class="pt-2 row" @submit.prevent="submitForm">
        <mdb-col>
          <ui-app-editor2 :content.sync="marketing.content"></ui-app-editor2>
        </mdb-col>

        <mdb-col>
          <ui-app-editor2 :content.sync="marketing.content2"></ui-app-editor2>
        </mdb-col>

        <mdb-row>
          <mdb-col>
            <h3>Gallery content</h3>
            <div class="d-flex flex-row">
              <mdb-btn @click="selectImage">Select image</mdb-btn>
            </div>
            <mdb-row>
              <mdb-col
                v-for="(img, index) in galleryContent"
                :key="index"
                class="col-6 col-md-4"
              >
                <img :src="img.url" :alt="img.alt" class="img-fluid" />

                <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
                  <span slot="body">
                    <mdb-input
                      v-model.lazy="img.link"
                      label="Url"
                      @change="linkItem(img.id, img.link)"
                    >
                    </mdb-input>
                  </span>
                  <mdb-btn slot="reference" class="btn-sm" color="primary">
                    Link
                  </mdb-btn>
                </mdb-popover>
                <button
                  class="btn btn-danger btn-sm"
                  @click="removeItem(img.id)"
                >
                  Delete
                </button>
              </mdb-col>
            </mdb-row>
          </mdb-col>
        </mdb-row>

        <mdb-col>
          <mdb-btn color="primary" type="submit">Update Content</mdb-btn>
        </mdb-col>
      </form>
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
  mdbPopover,
  mdbInput,
} from "mdbvue";
import { cloneDeep } from "lodash"
import { marketingPage } from "@/services/firebase";

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
    mdbModal,
    mdbInput,
    mdbPopover,
  },
  data() {
    return {
      marketing: {
        img: {
          url: "",
          alt: ""
        },
        content: "",
        content2: ""
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
    marketingContent() {
      return this.$store.getters["marketing/getContent"];
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
      this.setMarketing();
      this.galleryContent = this.marketing.galleryContent;
    }, 500);
  },
  methods: {
    setMarketing() {
      const contents = cloneDeep(this.marketingContent);
      this.marketing = {
        img: {
          url: contents.url,
          alt: contents.alt,
        },
        content: contents.content,
      }
    },
    reset() {
      this.setMarketing();
      this.galleryContent = this.marketing.galleryContent;
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
      this.type = "";
    },
    updateContent() {
      marketingPage
        .doc(this.marketing.id)
        .update({
          alt: this.marketing.img.alt,
          url: this.marketing.img.url,
          content: this.marketing.content,
          content2: this.marketing.content2,
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
    linkItem(img, value) {
      console.log(img);
      console.log(value);
      // for (var i = 0; i < this.galleryContent.length; i++) {
      //   if (this.galleryContent[i].id === img) {
      //     this.galleryContent[i].link = value;
      //   }
      // }
    },
  },
};
</script>
