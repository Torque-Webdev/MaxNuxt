<template>
    <div>
        <ui-image-upload :image.sync="page.head"></ui-image-upload>
        <mdb-btn color="primary" @click="save">Update image</mdb-btn>
    </div>
</template>

<script>
import { mdbBtn } from "mdbvue"
import { newsPage } from "@/services/firebase";

export default {
    components: {
        mdbBtn
    },
    data() {
        return {
            head: ''
        }
    },
    computed: {
        page() {
          return this.$store.getters["posts/getPage"];
        },
    },
    methods: {
        save() {
            newsPage
                .doc(this.page.id)
                .update({
                    head: this.page.head
                })
        }
    }
}
</script>
