<template>
  <div>
    <mdb-container>
      <h3 class="pb-3 text-center">Calendar</h3>
      <mdb-row>
        <mdb-col class="pt-2">
          <mdb-btn color="primary" class="ml-0" @click="addCircuitModel = true"
            >Add circuit</mdb-btn
          >
          <mdb-btn color="secondary" @click="selCircuitModel = true"
            >Select circuit</mdb-btn
          >
        </mdb-col>
      </mdb-row>
      <mdb-row>
        <mdb-col>
          <form class="pt-2" @submit.prevent="submitForm">
            <div class="row">
              <div
                v-if="circuit.title"
                class="md-form col-12 col-md-6 col-lg-4"
              >
                <img :src="circuit.url" :alt="circuit.alt" />
                <p class="text-center pt-3">{{ circuit.title }}</p>
              </div>
            </div>
            <div class="row">
              <div class="md-form col-12 col-md-6 col-lg-4">
                Start date:
                <mdb-input v-model.trim="fixture.date" type="date" inline />
              </div>
              <div class="md-form col-12 col-md-6 col-lg-4">
                End date:
                <mdb-input v-model.trim="fixture.date2" type="date" inline />
              </div>
            </div>
            <mdb-btn color="primary" type="submit" class="ml-0"
              >Add Fixture</mdb-btn
            >
          </form>
        </mdb-col>
      </mdb-row>
    </mdb-container>

    <transition name="fade">
      <div
        v-if="msg.message != ''"
        :class="`bg-${msg.type}`"
        class="pl-5 mt-2 text-white text-center"
      >
        <p>{{ msg.message }}</p>
      </div>
    </transition>

    <mdb-container v-if="paginatedData" fluid class="pt-5">
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
              <tr v-for="(fixture, index) in paginatedData" :key="index">
                <th scope="row">{{ fixture.circuit.title }}</th>
                <td>
                  {{ fixture.date | formatDate }} -
                  {{ fixture.date2 | formatDate }}
                </td>
                <td>
                  <a class="mr-1" @click="editFixture(fixture)">
                    <mdb-icon icon="edit" />
                  </a>
                  <a class="ml-1" @click="deleteFixture(fixture)">
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

    <!-- addCircuitModel  -->
    <mdb-modal
      top
      position="top"
      full-height
      direction="top"
      :show="addCircuitModel"
      @close="cancelAdd"
    >
      <mdb-modal-header>
        <mdb-modal-title>Add circuit</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form class="p-2" @submit.prevent>
          <mdb-col class="text-center pt-2">
            <ui-image-upload :image.sync="circuit.img"></ui-image-upload>
          </mdb-col>

          <div class="md-form">
            <mdb-input v-model.trim="circuit.title" label="Title" inline />
          </div>
        </form>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="cancelAdd">Close</mdb-btn>
        <mdb-btn color="primary" @click="saveCircuit">Save</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

    <!-- selCircuitModel -->
    <mdb-modal
      top
      position="top"
      full-height
      direction="top"
      :show="selCircuitModel"
      @close="selCircuitModel = false"
    >
      <mdb-modal-header>
        <mdb-modal-title>Select circuit</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <div class="container-fluid">
          <div class="row">
            <div
              v-for="(circuit, index) in circuits"
              :key="index"
              class="col-4 p-0"
            >
              <div class="custom-control custom-radio custom-control-inline">
                <img :src="circuit.url" :alt="circuit.alt" class="img-fluid" />
                <input
                  :id="circuit.id"
                  type="radio"
                  name="circuits"
                  class="custom-control-input"
                  @click="selected(circuit)"
                />
                <label class="custom-control-label" :for="circuit.id">{{
                  circuit.title
                }}</label>
              </div>
            </div>
          </div>
        </div>
      </mdb-modal-body>
      <mdb-modal-footer>
        <mdb-btn color="secondary" @click.native="selCircuitModel = false"
          >Close</mdb-btn
        >
        <mdb-btn color="primary" @click="saveSel">Confirm</mdb-btn>
      </mdb-modal-footer>
    </mdb-modal>

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
        <mdb-modal-title>Edit fixture</mdb-modal-title>
      </mdb-modal-header>
      <mdb-modal-body>
        <form class="p-2" @submit.prevent>
          <mdb-col class="text-center pt-2">
            <img
              :src="clickedFixture.circuit.url"
              :alt="clickedFixture.circuit.alt"
              class="img-fluid"
            />
            <p class="text-center">{{ clickedFixture.circuit.title }}</p>
          </mdb-col>

          <mdb-col class="pt-2">
            <mdb-btn color="primary" class="ml-0" @click="addCircuitEdit"
              >Add new circuit</mdb-btn
            >
            <mdb-btn color="secondary" @click="selCircuitEdit"
              >Select new circuit</mdb-btn
            >
          </mdb-col>

          <div class="md-form col-12 col-md-6 col-lg-4">
            Start date:
            <mdb-input v-model.trim="clickedFixture.date" type="date" inline />
            End date:
            <mdb-input v-model.trim="clickedFixture.date2" type="date" inline />
          </div>
        </form>
      </mdb-modal-body>
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
          >Are you sure you want to delete this fixture</span
        >
        {{ toDeleteFixture.title }}, {{ toDeleteFixture.date }}
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
                  >Headline image</label
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
  mdbCol,
  mdbRow,
} from "mdbvue";
import {
  calendarCollection,
  circuitsCollection,
} from "@/services/firebase";

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
    mdbCol,
    mdbRow,
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
      fixture: {
        id: "",
        date: "",
        date2: "",
        circuit: {},
      },
      circuit: {
        img: {
          url: "",
          alt: "",
        },
        id: "",
        title: ""
      },
      clickedFixture: {
        id: "",
        date: "",
        date2: "",
        circuit: {},
      },
      addCircuitModel: false,
      selCircuitModel: false,
      pageNumber: 0,
      msg: "",
      editModal: false,
      existsModal: false,
      deleteModal: false,
      toDeleteFixture: {
        id: "",
        date: "",
        date2: "",
        circuit: {},
      },
      updatedImage: null,
      uploadImage: false,
      file: "",
      img: {
        id: "",
        content: "",
        alt: "",
      },
      confirmUpdate: false,
      type: "",
      defaultImage:
        "https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7",
    };
  },
  computed: {
    fixtures() {
      return this.$store.getters["calendar/getFixtures"];
    },
    updatedCircuit() {
      return this.$store.getters["circuits/getCircuit"];
    },
    circuits() {
      return this.$store.getters["circuits/getCircuits"];
    },
    uploadMsg() {
      return this.$store.getters["images/getMsg"];
    },
    pageCount() {
      const l = this.fixtures.length;
        const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
        const end = start + this.size;
      return this.fixtures.slice(start, end);
    },
  },
  methods: {
    reset() {
      this.fixture = {
        id: "",
        date: "",
        date2: "",
        circuit: {},
      };
      this.file = "";
      this.img = {
        id: "",
        content: "",
        alt: "",
      };
      this.circuit = {
        id: "",
        imgId: "",
        url: "",
        title: "",
        alt: "",
      };
    },
    addFixture() {
      calendarCollection
        .add({
          date: this.fixture.date,
          date2: this.fixture.date2,
          circuit: this.fixture.circuit,
          createdOn: new Date(),
        })
        .then(() => {
          this.reset();
          this.msg = {
            type: "success",
            message: "Fixture added",
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
    addCircuit() {
      circuitsCollection
        .add({
          url: this.circuit.img.url,
          alt: this.circuit.img.alt,
          title: this.circuit.title,
          createdOn: new Date(),
        })
        .then((doc) => {
          circuitsCollection
            .doc(doc.id)
            .get()
            .then((doc) => {
              this.circuit = {
                id: doc.id,
                url: doc.data().url,
                title: doc.data().title,
                alt: doc.data().alt,
              };
              console.log(this.circuit);
            });
        })
        .then(() => {
          this.fixture.circuit = this.circuit;
          this.msg = {
            type: "success",
            message: "Circuit added",
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
    saveCircuit() {
      this.addCircuit();
      this.addCircuitModel = false;
      if (this.type === "edit") {
        this.editModal = true;
        this.clickedFixture.circuit.title = this.circuit.title;
      }
    },
    cancelAdd() {
      this.addCircuitModel = false;
      this.reset();
    },
    submitForm() {
      if (this.fixture.date === "" || this.circuit.title === "") {
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
        this.addFixture();
      }
    },
    nextPage() {
      this.pageNumber++;
    },
    prevPage() {
      this.pageNumber--;
    },
    deleteFixture(fixture) {
      this.deleteModal = true;
      this.toDeleteFixture.title = fixture.circuit.title;
      this.toDeleteFixture.date = fixture.date;
      this.toDeleteFixture.date2 = fixture.date2;
      this.toDeleteFixture.id = fixture.id;
    },
    cancelDelete() {
      this.toDeleteFixture = {
        id: "",
        title: "",
        date: "",
      };
      this.deleteModal = false;
    },
    confirmDelete() {
      calendarCollection
        .doc(this.toDeleteFixture.id)
        .delete()
        .then(() => {
          this.deleteModal = false;
          this.msg = {
            type: "danger",
            message: "Fixture deleted",
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
    editFixture(fixture) {
      this.editModal = true;
      this.clickedFixture.id = fixture.id;
      this.clickedFixture.date = fixture.date;
      this.clickedFixture.date2 = fixture.date2;
      this.clickedFixture.circuit.title = fixture.circuit.title;
      this.clickedFixture.circuit.id = fixture.circuit.id;
      this.clickedFixture.circuit.imgId = fixture.circuit.imgId;
      this.clickedFixture.circuit.url = fixture.circuit.url;
      this.clickedFixture.circuit.alt = fixture.circuit.alt;
    },
    cancelEdit() {
      this.clickedFixture = {
        id: "",
        date: "",
        circuit: {
          id: "",
          url: "",
          title: "",
          alt: "",
        },
      };
      this.reset();
      this.editModal = false;
    },
    addCircuitEdit() {
      this.addCircuitModel = true;
      this.type = "edit";
      this.editModal = false;
    },
    selCircuitEdit() {
      this.selCircuitModel = true;
      this.type = "edit";
      this.editModal = false;
    },
    saveEdit() {
      if (this.circuit.title !== "") {
        this.clickedFixture.circuit.title = this.circuit.title;
      }
      calendarCollection
        .doc(this.clickedFixture.id)
        .update({
          date: this.clickedFixture.date,
          date2: this.clickedFixture.date2,
          circuit: {
            title: this.clickedFixture.circuit.title,
            id: this.clickedFixture.circuit.id,
            imgId: this.clickedFixture.circuit.imgId,
            url: this.clickedFixture.circuit.url,
            alt: this.clickedFixture.circuit.alt,
          },
          createdOn: new Date(),
        })
        .then(() => {
          this.cancelEdit();
          this.msg = {
            type: "success",
            message: "Fixture updated",
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
    selected(circuit) {
      this.circuit = circuit;
      this.fixture.circuit.title = circuit.title;
      this.fixture.circuit = circuit;
      if (this.type === "edit") {
        this.clickedFixture.circuit.title = circuit.title;
        this.clickedFixture.circuit = circuit;
      }
    },
    saveSel() {
      this.selCircuitModel = false;
      if (this.type === "edit") {
        this.editModal = true;
      }
    },
  },
};
</script>
