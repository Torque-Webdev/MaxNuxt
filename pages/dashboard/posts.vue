<template>
  <div>
    <div class="custom-control custom-switch text-center">
      <input id="customSwitches" v-model="imgSwitch" type="checkbox" class="custom-control-input">
      <label class="custom-control-label" for="customSwitches" >Change news display image ?</label>
    </div>
    <!-- news page hedline image  -->
    <mdb-container v-if="imgSwitch">
      <UiNewsImage></UiNewsImage>
    </mdb-container>
    <!-- create post  -->
    <mdb-container v-else>
      <mdb-row>
        <mdb-col col="12">
          <form class="pt-2" @submit.prevent="submitForm">
            <div class="row">
              <ui-image-upload :image.sync="post.img"></ui-image-upload>

              <div class="md-form col-md-6 col-lg-4">
                <mdb-input v-model.trim="post.date" type="date" />
              </div>
            </div>

            <div class="md-form">
              <mdb-input v-model.trim="post.title" label="Title" inline />
            </div>

            <div class="md-form">
              <mdb-input v-model.trim="post.excerpt" label="Excerpt" inline />
            </div>

            <h2>Schedule post</h2>

            <helpers-scheduling :publish-date.sync="post.published"></helpers-scheduling>

            <mdb-col>
              <ui-app-editor2 :content.sync="post.content"></ui-app-editor2>
              <mdb-btn color="primary" type="submit">Add Post</mdb-btn>
            </mdb-col>
          </form>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <transition name="fade">
      <ui-message :msg="msg"></ui-message>
    </transition>

    <!-- view posts -->
    <mdb-container fluid class="p-0 pt-5">
      <mdb-row>
        <mdb-col>
          <table class="table">
            <thead class="black text-white">
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in paginatedData" :key="index">
                <th scope="row">{{ post.title }}</th>
                <td>{{ post.date | formatDate }}</td>
                <td>
                  <a class="mr-1" @click="editPost(post)">
                    <mdb-icon icon="edit" />
                  </a>
                  <a class="ml-1" @click="deletePost(post)">
                    <mdb-icon icon="trash-alt" />
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </mdb-col>
        <mdb-col class="col-12 text-center">
          <mdb-btn
            :class="{ 'd-none': pageNumber === 0 }"
            color="primary"
            @click="prevPage"
          >
            <mdb-icon icon="angle-double-left" />
          </mdb-btn>
          <mdb-btn
            :class="{ 'd-none': pageNumber >= pageCount - 1 }"
            color="primary"
            @click="nextPage"
          >
            <mdb-icon icon="angle-double-right" />
          </mdb-btn>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <!-- editModel  -->
    <mdb-modal
      top
      position="top"
      full-height
      direction="top"
      :show="editModal"
      @close="cancelEdit"
    >
      <mdb-modal-header>
        <mdb-modal-title>{{ clickedPost.title }}</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form class="p-2" @submit.prevent>
          <ui-image-upload :image.sync="clickedPost.img"></ui-image-upload>

          <div class="md-form col-md-6 col-lg-4 p-0">
            <mdb-input v-model.trim="clickedPost.date" type="date" inline />
          </div>

          <div class="md-form">
            <mdb-input v-model.trim="clickedPost.title" label="Title" inline />
          </div>

          <div class="md-form">
            <mdb-input
              v-model.trim="clickedPost.excerpt"
              label="Excerpt"
              inline
            />
          </div>

          <h2>Schedule post</h2>

          <helpers-scheduling :publish-date.sync="clickedPost.published"></helpers-scheduling>

          <div class="md-form">
            <ui-app-editor2 :content.sync="clickedPost.content"></ui-app-editor2>
          </div>
        </form>
      </mdb-modal-body>
      <mdb-container>
        <transition name="fade">
          <div
            v-if="editMsg.message != ''"
            :class="`bg-${editMsg.type}`"
            class="pl-5 mt-2 text-white text-center"
          >
            <p>{{ editMsg.message }}</p>
          </div>
        </transition>
      </mdb-container>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelEdit">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveEdit">Save changes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- deleteModal -->
    <mdb-modal
      frame
      position="top"
      direction="top"
      :show="deleteModal"
      @close="deleteModal = false"
    >
      <mdb-modal-body class="text-center">
        <span class="text-danger"
          >Are you sure you want to delete this post</span
        >
        {{ toDeletePost.title }}
        <mdb-btn color="secondary" @click.native="cancelDelete">Close</mdb-btn>
        <mdb-btn color="danger" @click="confirmDelete">Delete</mdb-btn>
      </mdb-modal-body>
    </mdb-modal>

    <!-- existsModal -->
    <mdb-modal size="md" :show="existsModal" @close="existsModal = false">
      <mdb-modal-header>
        <mdb-modal-title>Image exists with that name</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row col-12 col-md-6 col-lg-4 py-3">
          <p>Would you like to use this one ?</p>
        </div>
        <img :src="img.content.url" :alt="img.content.alt" class="img-fluid" />
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="declineUse"
          >No</mdb-btn
        >
        <mdb-btn color="primary" size="sm" @click="confirmUse">Yes</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- uploadImage -->
    <mdb-modal size="md" :show="uploadImage" @close="closeImageUpload">
      <mdb-modal-header>
        <mdb-modal-title>Upload image</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="row">
          <div class="col-12">
            <div class="md-form">
              <mdb-input v-model.trim="img.alt" label="Description" inline />
            </div>
          </div>
          <div class="col-12">
            <div class="input-group">
              <div class="input-group-prepend">
                <span id="imageInput" class="input-group-text">Upload</span>
              </div>
              <div class="custom-file">
                <input
                  id="imageInput"
                  ref="imageInput"
                  type="file"
                  class="custom-file-input"
                  aria-describedby="imageInput"
                  accept="image/jpeg image/png"
                  @change="checkFile($event)"
                />
                <label
                  v-if="file.name"
                  class="custom-file-label"
                  for="inputGroupFile01"
                  >{{ file.name }}</label
                >
                <label v-else class="custom-file-label" for="inputGroupFile01"
                  >Image</label
                >
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" size="sm" @click.native="closeImageUpload"
          >Close</mdb-btn
        >
        <mdb-btn
          color="primary"
          size="sm"
          :disabled="img.alt === ''"
          @click="saveFile(type)"
          >Save</mdb-btn
        >
      </mdb-modal-footer>
      <transition name="fade">
        <div
          v-if="uploadMsg.message != ''"
          :class="`bg-${uploadMsg.type}`"
          class="text-white text-center"
        >
          <p>{{ uploadMsg.message }}</p>
        </div>
      </transition>
    </mdb-modal>
    <mdb-btn color="secondary" size="sm" @click.native="check"
          >Check</mdb-btn>
  </div>
</template>

<script>
import moment from "moment";
import {
  mdbInput,
  mdbBtn,
  mdbContainer,
  mdbIcon,
  mdbModalHeader,
  mdbModalTitle,
  mdbModalBody,
  mdbModalFooter,
  mdbModal,
  mdbRow,
  mdbCol
} from "mdbvue";
import { postsCollection } from "@/services/firebase";

export default {
  components: {
    mdbInput,
    mdbBtn,
    mdbContainer,
    mdbIcon,
    mdbModalHeader,
    mdbModalTitle,
    mdbModalBody,
    mdbModalFooter,
    mdbModal,
    mdbRow,
   mdbCol
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
      default: 10,
    },
  },
  data() {
    return {
      post: {
        img: {
          url: "",
          alt: "",
          id: ""
        },
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        published: "",
      },
      imgSwitch: false,
      pageNumber: 0,
      msg: {
        type: '',
        message: '',
      },
      editMsg: "",
      editModal: false,
      deleteModal: false,
      toDeletePost: {
        id: "",
        title: "",
      },
      clickedPost: {
        img: {
          url: "",
          alt: "",
          id: ""
        },
        id: "",
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        published: ''
      },
      existsModal: false,
      uploadImage: false,
      updatedImage: null,
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
    posts() {
      return this.$store.getters["posts/getPosts"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    pageCount() {
      const l = this.posts.length;
        const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
        const end = start + this.size;
      return this.posts.slice(start, end);
    },
  },
  methods: {
    reset() {
      this.post = {
         img: {
          url: "",
          alt: "",
          id: ""
        },
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        publishDate: ""
      }
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
    },
    addPost() {
      let slugArry = [];
        const newSlug = [];
        let date = "";
      // create slug
      slugArry = this.post.title.split(" ");
      date = this.post.date;
      this.post.year = date.split("-")[0];

      slugArry.forEach((item) => {
        newSlug.push(item.toLowerCase());
      });

      this.post.slug = newSlug.join("-") + "-" + date;

      if (this.post.url === "") {
        this.post.url = this.defaultImage;
        this.post.alt = "Placeholder image";
      }

      postsCollection
        .add({
          title: this.post.title,
          excerpt: this.post.excerpt,
          slug: this.post.slug,
          date: this.post.date,
          content: this.post.content,
          year: this.post.year,
          createdOn: new Date(),
          url: this.post.img.url,
          alt: this.post.img.alt,
          published: this.post.published
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Post added",
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
      if (this.post.date === "" || this.post.title === "") {
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
        this.addPost();
      }
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    deletePost(post) {
      this.deleteModal = true;
      this.toDeletePost.title = post.title;
      this.toDeletePost.id = post.id;
    },
    cancelDelete() {
      this.toDeletePost = {
        id: "",
        title: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      postsCollection
        .doc(this.toDeletePost.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Post deleted",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((error) => {
          this.msg = {
            type: "warning",
            message: error.message,
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
    editPost(post) {
      this.editModal = true;
      this.clickedPost.id = post.id;
      this.clickedPost.title = post.title;
      this.clickedPost.content = post.content;
      this.clickedPost.excerpt = post.excerpt;
      this.clickedPost.slug = post.slug;
      this.clickedPost.date = post.date;
      this.clickedPost.content = post.content;
      this.clickedPost.year = post.year;
      this.clickedPost.img.url = post.url;
      this.clickedPost.img.alt = post.alt;
      this.clickedPost.published = post.published
    },
    cancelEdit() {
      this.clickedPost = {
        img: {
          url: "",
          alt: "",
          id: ""
        },
        id: "",
        title: "",
        excerpt: "",
        slug: "",
        date: "",
        content: "",
        year: "",
        published: ""
      };
      this.editModal = false;
    },
    changeImage() {
      this.uploadImage = true;
      this.type = "edit";
    },
    saveEdit() {
      let slugArry = [];
        const newSlug = [];
        let date = "";
      // create slug
      slugArry = this.clickedPost.title.split(" ");
      date = this.clickedPost.date;
      this.clickedPost.year = date.split("-")[0];

      slugArry.forEach((item) => {
        newSlug.push(item.toLowerCase());
      });

      this.clickedPost.slug = newSlug.join("-") + "-" + date;

      postsCollection
        .doc(this.clickedPost.id)
        .update({
          title: this.clickedPost.title,
          excerpt: this.clickedPost.excerpt,
          slug: this.clickedPost.slug,
          date: this.clickedPost.date,
          content: this.clickedPost.content,
          year: this.clickedPost.year,
          createdOn: new Date(),
          url: this.clickedPost.img.url,
          alt: this.clickedPost.img.alt,
          published: this.clickedPost.published
        })
        .then(() => {
          this.cancelEdit();
          this.msg = {
            type: "success",
            message: "Post updated",
          };
          setTimeout(() => {
            this.msg = {
              type: "",
              message: "",
            };
          }, 2000);
        })
        .catch((err) => {
          this.editMsg = {
            type: "warning",
            message: err.message,
          };
          setTimeout(() => {
            this.editMsg = {
              type: "",
              message: "",
            };
          }, 2000);
        });
    },
  },
};
</script>
