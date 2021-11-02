<template>
    <mdb-container fluid class="my-10">
      <h3>Partners</h3>
      <mdb-row v-for="(item, index) in items" :key="index">
        <mdb-col col="10">
          <mdb-col col="6">
            <ui-image-upload :image.sync="item.image"></ui-image-upload>
          </mdb-col>
          <mdb-col col="12">
            <mdb-input v-model="item.link" label="Partner link" />
          </mdb-col>
          <mdb-col col="12">
            <ui-app-editor2 :content.sync="item.content" />
          </mdb-col>
        </mdb-col>
        <mdb-col col="2" class="my-auto text-center">
          <mdb-icon class="green-text" icon="plus" @click.native="add()"></mdb-icon>
          <mdb-icon v-if="index != 0" class="red-text px-3" icon="minus"
            @click.native="remove(index)"></mdb-icon
          >
        </mdb-col>
      </mdb-row>
    </mdb-container>
</template>

<script>
import {mdbRow,
      mdbCol,
      mdbIcon,
      mdbContainer} from 'mdbvue'
export default {
  components: {
      mdbRow,
      mdbCol,
      mdbIcon,
      mdbContainer,
  },
  props: {
    partners: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    items: {
      get() {
        return this.partners
      },

      set(newVal) {
        this.$emit('update:content', newVal)
      },
    },
  },
  methods: {
    add() {
      this.items.push({ image: {
          id: '',
          alt: '',
          url: ''
      }, content: '', link: ''})
    },
    remove(index) {
      this.items.splice(index, 1)
    },
  },
}
</script>
