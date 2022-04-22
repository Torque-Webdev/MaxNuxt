(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{677:function(t,e,o){"use strict";o.r(e);o(84),o(62),o(12),o(18);var d=o(4),n=o.n(d),l=o(122),c=o(19),r={components:{mdbInput:l.mdbInput,mdbBtn:l.mdbBtn,mdbContainer:l.mdbContainer,mdbModalHeader:l.mdbModalHeader,mdbModalTitle:l.mdbModalTitle,mdbModalBody:l.mdbModalBody,mdbModalFooter:l.mdbModalFooter,mdbModal:l.mdbModal,mdbCol:l.mdbCol,mdbRow:l.mdbRow},filters:{formatDate:function(t){if(!t)return"-";var e=t;return n()(e).format("Do MMM YYYY")}},data:function(){return{section:{alt:"",url:"",videoId:"",id:"",name:""},msg:{message:"",type:""},existsModal:!1,uploadVideo:!1,updatedVideo:null,selectVideoModel:!1,file:"",video:{id:"",content:"",alt:""},type:"",defaultImage:"https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7"}},computed:{videoContent:function(){return this.$store.getters["videoSection/getVideo"][0]},videoList:function(){return this.$store.getters["videos/getVideos"]},uploadMsg:function(){return this.$store.getters["videos/getMsg"]}},created:function(){var t=this;setTimeout((function(){t.section={id:t.videoContent.id,url:t.videoContent.url,alt:t.videoContent.alt,videoId:t.videoContent.videoId}}),1500)},methods:{reset:function(){this.section={id:this.videoContent.id,url:this.videoContent.url,alt:this.videoContent.alt,videoId:this.videoContent.videoId},this.file="",this.video={id:"",content:"",alt:""},this.type=""},updateContent:function(){var t=this;c.o.doc(this.section.id).update({videoId:this.section.videoId,url:this.section.url,alt:this.section.alt,createdOn:new Date}).then((function(){t.reset(),t.msg={type:"success",message:"Video updated"},setTimeout((function(){t.msg={type:"",message:""}}),2e3)})).catch((function(e){t.msg={type:"warning",message:e.message},setTimeout((function(){t.msg={type:"",message:""}}),2e3)}))},newVideo:function(){this.uploadVideo=!0},checkFile:function(t){var e=this;this.file=t.target.files[0],c.n.where("name","==",this.file.name).get().then((function(t){t.forEach((function(t){t.exists&&(e.existsModal=!0,e.uploadVideo=!1,e.video.content=t.data(),e.video.id=t.id)}))}))},saveFile:function(){var t=this,e={};e.file=this.file,e.alt=this.video.alt,this.$store.dispatch("videos/uploadVideo",e).then((function(video){t.video.content=video,t.section.videoId=t.video.content.id,t.section.url=t.video.content.url,t.section.alt=t.video.alt})).then((function(){t.$store.dispatch("global/setLoading",!1),t.file="",t.video.alt="",setTimeout((function(){t.uploadVideo=!1}),2e3)}))},closeVideoUpload:function(){this.uploadVideo=!1,this.type="",this.file="",this.video.alt=""},confirmUse:function(){this.section.videoId=this.video.id,this.existsModal=!1,this.section.url=this.video.content.url,this.section.alt=this.video.content.alt,this.type="",this.file="",this.video.alt=""},declineUse:function(){this.existsModal=!1,this.video.content="",this.video.id="",this.type="",this.file="",this.video.alt=""},submitForm:function(){this.updateContent()},selectVideo:function(){this.selectVideoModel=!0},selectedVideo:function(video){this.section.videoId=video.id,this.section.url=video.url,this.section.alt=video.alt},saveSelection:function(){this.selectVideoModel=!1,this.updateContent()}}},m=r,v=o(75),component=Object(v.a)(m,(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("mdb-container",[o("mdb-row",[o("form",{on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[o("mdb-col",{staticClass:"text-center pt-2"},[t.section.videoId?o("video",{staticClass:"video-fluid z-depth-1",attrs:{autoplay:"",loop:"",muted:""},domProps:{muted:!0}},[o("source",{attrs:{src:t.section.url,type:"video/mp4"}})]):t._e()]),t._v(" "),o("mdb-btn",{staticClass:"ml-3",attrs:{color:"primary",inline:""},on:{click:t.newVideo}},[t._v("Change video")]),t._v(" "),o("mdb-btn",{nativeOn:{click:function(e){return t.selectVideo.apply(null,arguments)}}},[t._v("Select video")]),t._v(" "),o("mdb-btn",{attrs:{color:"primary",type:"submit"}},[t._v("Confirm")])],1)])],1),t._v(" "),o("transition",{attrs:{name:"fade"}},[""!=t.msg.message?o("div",{staticClass:"pl-5 mt-4 text-white text-center",class:"bg-"+t.msg.type},[o("p",[t._v(t._s(t.msg.message))])]):t._e()]),t._v(" "),o("mdb-modal",{attrs:{size:"md",show:t.existsModal},on:{close:function(e){t.existsModal=!1}}},[o("mdb-modal-header",[o("mdb-modal-title",[t._v("Video exists with that name")])],1),t._v(" "),o("mdb-modal-body",[o("div",{staticClass:"row col-12 col-md-6 col-lg-4 py-3"},[o("p",[t._v("Would you like to use this one ?")])]),t._v(" "),t.video.content.url?o("video",{staticClass:"video-fluid z-depth-1",attrs:{autoplay:"",loop:"",muted:""},domProps:{muted:!0}},[o("source",{attrs:{src:t.video.content.url,type:"video/mp4"}})]):t._e()]),t._v(" "),o("mdb-modal-footer",[o("mdb-btn",{attrs:{color:"secondary",size:"sm"},nativeOn:{click:function(e){return t.declineUse.apply(null,arguments)}}},[t._v("No")]),t._v(" "),o("mdb-btn",{attrs:{color:"primary",size:"sm"},on:{click:t.confirmUse}},[t._v("Yes")])],1)],1),t._v(" "),o("mdb-modal",{attrs:{size:"md",show:t.uploadVideo},on:{close:t.closeVideoUpload}},[o("mdb-modal-header",[o("mdb-modal-title",[t._v("Upload Video")])],1),t._v(" "),o("mdb-modal-body",[o("div",{staticClass:"row"},[o("div",{staticClass:"col-12"},[o("div",{staticClass:"md-form"},[o("mdb-input",{attrs:{label:"Description",inline:""},model:{value:t.video.alt,callback:function(e){t.$set(t.video,"alt","string"==typeof e?e.trim():e)},expression:"video.alt"}})],1)]),t._v(" "),o("div",{staticClass:"col-12"},[o("div",{staticClass:"input-group"},[o("div",{staticClass:"input-group-prepend"},[o("span",{staticClass:"input-group-text",attrs:{id:"videoInput"}},[t._v("Upload")])]),t._v(" "),o("div",{staticClass:"custom-file"},[o("input",{ref:"VideoInput",staticClass:"custom-file-input",attrs:{id:"VideoInput",type:"file","aria-describedby":"VideoInput",accept:"Video/jpeg Video/png"},on:{change:function(e){return t.checkFile(e)}}}),t._v(" "),t.file.name?o("label",{staticClass:"custom-file-label",attrs:{for:"inputGroupFile01"}},[t._v(t._s(t.file.name))]):o("label",{staticClass:"custom-file-label",attrs:{for:"inputGroupFile01"}},[t._v("Video")])])])])])]),t._v(" "),o("mdb-modal-footer",[o("mdb-btn",{attrs:{color:"secondary",size:"sm"},nativeOn:{click:function(e){return t.closeVideoUpload.apply(null,arguments)}}},[t._v("Close")]),t._v(" "),o("mdb-btn",{attrs:{color:"primary",size:"sm",disabled:""==t.video.alt},on:{click:function(e){return t.saveFile(t.type)}}},[t._v("Save")])],1),t._v(" "),o("transition",{attrs:{name:"fade"}},[""!=t.uploadMsg.message?o("div",{staticClass:"text-white text-center",class:"bg-"+t.uploadMsg.type},[o("p",[t._v(t._s(t.uploadMsg.message))])]):t._e()])],1),t._v(" "),o("mdb-modal",{attrs:{top:"",position:"top","full-height":"",direction:"top",show:t.selectVideoModel},on:{close:function(e){t.selectVideoModel=!1}}},[o("mdb-modal-header",[o("mdb-modal-title",[t._v("Select video")])],1),t._v(" "),o("mdb-modal-body",[o("div",{staticClass:"container-fluid"},[o("div",{staticClass:"row"},t._l(t.videoList,(function(e,d){return o("div",{key:d,staticClass:"col-4 p-0"},[o("div",{staticClass:"custom-control custom-radio d-flex flex-center flex-column py-3"},[o("video",{staticClass:"video-fluid z-depth-1",attrs:{autoplay:"",loop:"",muted:""},domProps:{muted:!0}},[o("source",{attrs:{src:e.url,type:"video/mp4"}})]),t._v(" "),o("input",{staticClass:"custom-control-input",attrs:{id:e.id,type:"radio"},on:{click:function(o){return t.selectedVideo(e)}}}),t._v(" "),o("label",{staticClass:"custom-control-label",attrs:{for:e.id}},[t._v("\n                  "+t._s(e.alt)+"\n                  ")])])])})),0)])]),t._v(" "),o("mdb-modal-footer",[o("mdb-btn",{attrs:{color:"secondary"},nativeOn:{click:function(e){t.selectVideoModel=!1}}},[t._v("Close")]),t._v(" "),o("mdb-btn",{attrs:{color:"primary"},on:{click:t.saveSelection}},[t._v("Confirm")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);