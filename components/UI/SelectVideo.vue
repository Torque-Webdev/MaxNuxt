<template>
    <div>
        <mdb-btn @click="selectVideo">Select video</mdb-btn>
        <mdb-modal
            top
            position="top"
            full-height
            direction="top"
            :show="selectVideoModel"
            @close="selectVideoModel = false"
        >
        <mdb-modal-header>
            <mdb-modal-title>Select video</mdb-modal-title>
        </mdb-modal-header>
        <mdb-modal-body>
            <div class="container-fluid">
            <div class="row">
                <div v-for="(vid, index) in videoList" :key="index" class="col-4 p-0">
                <div class="custom-control custom-radio custom-control-inline">
                    <video class="video-fluid z-depth-1" autoplay loop muted>
                    <source :src="vid.url" type="video/mp4" />
                    </video>
                    <input
                    :id="vid.id"
                    type="radio"
                    class="custom-control-input"
                    @click="selectedVideo(vid)"
                    />
                    <label class="custom-control-label" :for="vid.id">
                    {{
                    vid.alt
                    }}
                    </label>
                </div>
                </div>
            </div>
            </div>
        </mdb-modal-body>
        <mdb-modal-footer>
            <mdb-btn color="secondary" @click.native="selectVideoModel = false">Close</mdb-btn>
            <mdb-btn color="primary" @click="saveVideoSelection">Confirm</mdb-btn>
        </mdb-modal-footer>
        </mdb-modal>
    </div>
</template>

<script>
import {
    mdbBtn,
    mdbModal,
    mdbModalBody,
    mdbModalFooter,
    mdbModalTitle,
    mdbModalHeader } from 'mdbvue'
export default {
    components:{
        mdbBtn,
        mdbModal,
        mdbModalBody,
        mdbModalFooter,
        mdbModalTitle,
        mdbModalHeader
    },
    model: {
        prop: 'video',
        event: 'change'
    },
    props: ['video'],
    data(){
        return {
            selectVideoModel: false,
            selectVideo: ''
        }
    },
    computed: {
        videoList() {
            return this.$store.getters['videos/getVideos']
        },
    },
    methods: {
        selectedVideo(video){
            this.selectVideo = video
        }
    }
}
</script>
