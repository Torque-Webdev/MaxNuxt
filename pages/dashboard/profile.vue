<template>
  <div>
    <div class="custom-control custom-switch text-center">
      <input id="customSwitches" v-model="imgSwitch" type="checkbox" class="custom-control-input">
      <label class="custom-control-label" for="customSwitches" >Change front page display image ?</label>
    </div>
    <mdb-container v-if="imgSwitch">
      <UiProfileImage></UiProfileImage>
    </mdb-container>
    <mdb-container v-else>
    <form class="pt-2 d-flex flex-column" @submit.prevent="submitForm">
      <mdb-container>
        <mdb-row>
          <mdb-col class="col-12 text-center pb-3 pt-2">
            <h3 class="pb-3">Driver Images</h3>
            <mdb-container fluid>
              <mdb-row>
                <mdb-col>
                  <UiImageUpload  :image.sync="headline"></UiImageUpload>
                </mdb-col>
              </mdb-row>
            </mdb-container>
          </mdb-col>

          <mdb-col class="col-12">
            <div class="row">
              <div class="md-form col-6">
                <mdb-input v-model.trim="firstName" label="First Name" inline />
              </div>
              <div class="md-form col-6">
                <mdb-input v-model.trim="lastName" label="Last Name" inline />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input v-model.trim="lives" label="Lives" inline />
              </div>
              <div class="md-form col-6">
                <mdb-input v-model.trim="dob" label="DOB" inline />
              </div>
            </div>

            <div class="row">
              <div class="md-form col-6">
                <mdb-input
                  v-model.trim="raceNumber"
                  label="Race number"
                  inline
                />
              </div>
              <div class="md-form col-6">
                <mdb-input v-model.trim="sponsors" label="Sponsors" inline />
              </div>
            </div>
          </mdb-col>

          <mdb-col class="col-12 text-center pb-4">
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Facebook link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.facebook"
                label="Facebook link"
              ></mdb-input>
              <mdb-btn slot="reference">Facebook</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">insta link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.insta"
                label="insta link"
              ></mdb-input>
              <mdb-btn slot="reference">insta</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Twitter link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.twitter"
                label="Twitter link"
              ></mdb-input>
              <mdb-btn slot="reference">Twitter</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Google+ link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.gplus"
                label="Gplus link"
              ></mdb-input>
              <mdb-btn slot="reference">Google+</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Twitch link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.twitch"
                label="Twitch link"
              ></mdb-input>
              <mdb-btn slot="reference">Twitch</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Pinterest link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.pinterest"
                label="Pinterest link"
              ></mdb-input>
              <mdb-btn slot="reference">Pinterest</mdb-btn>
            </mdb-popover>
            <mdb-popover trigger="click" :options="{ placement: 'bottom' }">
              <span slot="header">Youtube link</span>
              <mdb-input
                slot="body"
                v-model="social.platforms.youtube"
                label="Youtube link"
              ></mdb-input>
              <mdb-btn slot="reference">Youtube</mdb-btn>
            </mdb-popover>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Career Highlights</h3>
            <app-editor2 :content.sync="career.content"></app-editor2>
          </mdb-col>

          <mdb-col class="col-6">
            <h3 class="text-center">Max Facts</h3>
            <app-editor2 :content.sync="bio.content"></app-editor2>
          </mdb-col>
        </mdb-row>

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

        <mdb-col class="col-12 pt-3">
          <mdb-btn type="submit">Update Driver</mdb-btn>
        </mdb-col>
      </mdb-container>
    </form>

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
                <label class="custom-control-label" :for="img.id">
                  {{ img.alt }}
                </label>
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
    </mdb-container>
  </div>
</template>

<script>
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbRow,
  mdbCol,
  mdbPopover,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
} from "mdbvue";
import { cloneDeep } from 'lodash';
import { profileCollection } from "@/services/firebase";

export default {
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbRow,
    mdbCol,
    mdbPopover,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal
  },
  data() {
    return {
      bio: {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      },
      imgSwitch: false,
      firstName: "",
      lastName: "",
      lives: "",
      dob: "",
      raceNumber: "",
      sponsors: "",
      headline: {
        url: "",
        alt: "",
        id: "",
      },
      career: {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      },
      social: {
        url: "",
        alt: "",
        imgId: "",
        platforms: {
          facebook: "",
          website: "",
          twitter: "",
          gplus: "",
          insta: "",
          twitch: "",
          pinterest: "",
          youtube: "",
        },
      },
      galleryContent: [],
      selectedImages: [],
      updatedImage: null,
      img: {
        id: "",
        content: "",
        alt: "",
      },
      hover: false,
      msg: "",
      edit: false,
      pageNumber: 0,
      file: "",
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
      existsModal: false,
      selectModel: false,
      uploadImage: false,
    };
  },
  computed: {
    profile() {
      return cloneDeep(this.$store.getters["profile/getProfile"]);
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    images() {
      return this.$store.getters["images/getImages"];
    },
  },
  mounted() {
    setTimeout(() => {
      this.setData();
    }, 1500);
  },
  methods: {
    setData() {
      this.bio = this.profile.bio;
      this.firstName = this.profile.firstName;
      this.lastName = this.profile.lastName;
      this.lives = this.profile.lives;
      this.dob = this.profile.dob;
      this.raceNumber = this.profile.raceNumber;
      this.sponsors = this.profile.sponsors;
      this.headline = this.profile.headline;
      this.career = this.profile.career;
      this.social = this.profile.social;
      this.galleryContent = this.profile.galleryContent;
    },
    reset() {
      this.bio = {
        url: "",
        alt: "",
        content: "",
      };
      this.firstName = "";
      this.lastName = "";
      this.lives = "";
      this.dob = "";
      this.raceNumber = "";
      this.sponsors = "";
      this.headline = {
        url: "",
        alt: "",
        id: "",
      };
      this.career = {
        url: "",
        alt: "",
        content: "",
        imgId: "",
      };
      this.social = {
        url: "",
        alt: "",
        imgId: "",
      };
      this.social.platforms = {
        facebook: "",
        website: "",
        twitter: "",
        gplus: "",
        insta: "",
        twitch: "",
        pinterest: "",
        youtube: "",
      };
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    updateDriver() {
      if (this.headline.url === "") {
        this.headline.url = this.defaultImage;
        this.headline.alt = "Placeholder image";
        this.headline.id = "";
      }
      profileCollection
        .doc(this.profile.id)
        .update({
          bio: this.bio,
          firstName: this.firstName,
          lastName: this.lastName,
          lives: this.lives,
          dob: this.dob,
          raceNumber: this.raceNumber,
          sponsors: this.sponsors,
          headline: this.headline,
          career: this.career,
          social: this.social,
          galleryContent: this.galleryContent,
        })
        .then(() => {
          this.reset();
          this.setData();
          this.msg = {
            type: "success",
            message: "Profile updated",
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
      if (this.dob === "" || this.firstName === "" || this.lastName === "") {
        this.msg = {
          type: "warning",
          message: "Missing information check the form is completely filled",
        };
        setTimeout(() => {
          this.msg = {
            type: "",
            message: "",
          };
        }, 2000);
      } else {
        this.updateDriver();
      }
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
