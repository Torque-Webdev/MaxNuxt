(window.webpackJsonp=window.webpackJsonp||[]).push([[29,11],{569:function(t,e,l){"use strict";l.r(e);var n;n=l(575);var o={components:{ckeditor:l(576).component},props:{content:{type:String,required:!0,default:"Enter text here"}},data:function(){return{editor:n,editorConfig:{fontFamily:{options:["default","Ubuntu, Arial, sans-serif","Ubuntu Mono, Courier New, Courier, monospace"],supportAllValues:!0},fontSize:{options:[9,11,13,"default",17,19,21]},fontColor:{colors:[{color:"hsl(0, 0%, 0%)",label:"Black"},{color:"#010e5c",label:"Blue"},{color:"#cba052",label:"Yellow"},{color:"hsl(0, 0%, 30%)",label:"Dim grey"},{color:"hsl(0, 0%, 60%)",label:"Grey"},{color:"hsl(0, 0%, 90%)",label:"Light grey"},{color:"hsl(0, 0%, 100%)",label:"White",hasBorder:!0}]},heading:{options:[{model:"paragraph",title:"Paragraph",class:"ck-heading_paragraph"},{model:"heading1",view:"h1",title:"Heading 1",class:"ck-heading_heading1"},{model:"heading2",view:"h2",title:"Heading 2",class:"ck-heading_heading2"},{model:"heading3",view:"h3",title:"Heading 3",class:"ck-heading_heading3"},{model:"heading4",view:"h4",title:"Heading 4",class:"ck-heading_heading4"},{model:"heading5",view:"h5",title:"Heading 5",class:"ck-heading_heading5"}]},link:{addTargetToExternalLinks:!0,decorators:[{mode:"manual",label:"Downloadable",attributes:{download:"download"}}]},toolbar:["heading","|","fontSize","fontFamily","fontColor","fontBackgroundColor","|","bold","italic","underline","strikethrough","|","imageUpload","insertTable","|","alignment","outdent","indent","|","link","undo","redo"],language:"en",image:{toolbar:["imageTextAlternative","|","imageStyle:full","imageStyle:side","|","imageStyle:alignLeft","imageStyle:alignRight","imageStyle:alignCenter"],styles:["full","alignLeft","alignRight","side","alignCenter"]},alignment:{options:["left","right"]},tableProperties:{borderColors:[{color:"hsl(0, 0%, 0%)",label:"Black"},{color:"#010e5c",label:"Blue"},{color:"#cba052",label:"Yellow"},{color:"hsl(0, 0%, 30%)",label:"Dim grey"},{color:"hsl(0, 0%, 60%)",label:"Grey"},{color:"hsl(0, 0%, 90%)",label:"Light grey"},{color:"hsl(0, 0%, 100%)",label:"White"}],backgroundColors:[{color:"hsl(0, 0%, 0%)",label:"Black"},{color:"#010e5c",label:"Blue"},{color:"#cba052",label:"Yellow"},{color:"hsl(0, 0%, 30%)",label:"Dim grey"},{color:"hsl(0, 0%, 60%)",label:"Grey"},{color:"hsl(0, 0%, 90%)",label:"Light grey"},{color:"hsl(0, 0%, 100%)",label:"White"}]},table:{contentToolbar:["tableColumn","tableRow","mergeTableCells","tableProperties","tableCellProperties"]}}}}},r=l(77),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("ckeditor",{attrs:{editor:t.editor,config:t.editorConfig,value:t.content},on:{input:function(content){return t.$emit("update:content",content)}}})],1)}),[],!1,null,null,null);e.default=component.exports},674:function(t,e,l){"use strict";l.r(e);l(85),l(63),l(13),l(18),l(284);var n=l(123),o=l(20),r={components:{mdbBtn:n.mdbBtn,mdbContainer:n.mdbContainer,mdbCol:n.mdbCol,mdbRow:n.mdbRow,mdbModalHeader:n.mdbModalHeader,mdbModalTitle:n.mdbModalTitle,mdbModalBody:n.mdbModalBody,mdbModalFooter:n.mdbModalFooter,mdbModal:n.mdbModal,mdbInput:n.mdbInput,mdbPopover:n.mdbPopover},data:function(){return{marketing:{url:"",content:"",content2:"",alt:"",imgId:""},msg:{message:"",type:""},existsModal:!1,uploadImage:!1,selectModel:!1,galleryContent:[],file:"",img:{id:"",content:"",alt:""},type:"",defaultImage:"https://firebasestorage.googleapis.com/v0/b/jhr-developments-c5bba.appspot.com/o/images%2Fimg-placeholder.png?alt=media&token=7d9c5978-d45d-4049-91d9-ceb235823db7"}},computed:{marketingContent:function(){return this.$store.getters["marketing/getContent"]},uploadMsg:function(){return this.$store.getters["images/getMsg"]},updatedImage:function(){return this.$store.getters["images/getImage"]},images:function(){return this.$store.getters["images/getImages"]}},created:function(){var t=this;setTimeout((function(){t.marketing=t.marketingContent,t.galleryContent=t.marketingContent.galleryContent}),2e3)},methods:{reset:function(){this.marketing=this.marketingContent,this.galleryContent=this.marketingContent.galleryContent,this.file="",this.img={id:"",content:"",alt:""},this.type=""},updateContent:function(){var t=this;o.f.doc(this.marketing.id).update({alt:this.marketing.alt,url:this.marketing.url,content:this.marketing.content,content2:this.marketing.content2,imgId:this.marketing.imgId,galleryContent:this.galleryContent}).then((function(){t.reset(),t.msg={type:"success",message:"Content updated"},setTimeout((function(){t.msg={type:"",message:""}}),2e3)})).catch((function(e){t.msg={type:"warning",message:e.message},setTimeout((function(){t.msg={type:"",message:""}}),2e3)}))},submitForm:function(){this.updateContent()},headlineImage:function(){this.uploadImage=!0,this.type="headline"},newImage:function(){this.uploadImage=!0,this.type="new"},selectImage:function(){this.selectModel=!0},checkFile:function(t){var e=this;this.file=t.target.files[0],o.e.where("name","==",this.file.name).get().then((function(t){t.forEach((function(t){t.exists&&(e.existsModal=!0,e.uploadImage=!1,e.img.content=t.data(),e.img.id=t.id)}))}))},saveFile:function(){var t=this;if("headline"===this.type){var e={};e.file=this.file,e.alt=this.img.alt,this.$store.dispatch("images/uploadImage",e),setTimeout((function(){t.img.content=t.updatedImage,t.marketing.imgId=t.img.content.id,t.marketing.url=t.img.content.url,t.marketing.alt=t.img.alt,t.uploadImage=!1,t.type="",t.file="",t.img.alt=""}),2e3)}else if("new"===this.type){var l={};l.file=this.file,l.alt=this.img.alt,this.$store.dispatch("images/uploadImage",l),setTimeout((function(){t.img.content=t.updatedImage,t.galleryContent.push(t.img.content),t.uploadImage=!1,t.type="",t.file=""}),2e3)}},closeImageUpload:function(){this.uploadImage=!1,this.type="",this.file="",this.img.alt=""},confirmUse:function(){"headline"===this.type?(this.marketing.imgId=this.img.id,this.existsModal=!1,this.marketing.url=this.img.content.url,this.marketing.alt=this.img.content.alt,this.type="",this.file="",this.img.alt=""):"new"===this.type&&(this.galleryContent.push(this.img.content),this.existsModal=!1,this.type="",this.file="",this.img.alt="")},declineUse:function(){this.existsModal=!1,this.img.content="",this.img.id="",this.type="",this.file="",this.img.alt=""},saveSelection:function(){this.selectModel=!1},selected:function(img){this.galleryContent.push(img)},removeItem:function(img){console.log(img);for(var i=0;i<this.galleryContent.length;i++)this.galleryContent[i].id===img&&this.galleryContent.splice(i,1)},linkItem:function(img,t){console.log(img),console.log(t)}}},c=l(77),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",[l("mdb-container",[l("mdb-row",[l("mdb-col",{staticClass:"text-center pt-2"},[t.marketing.url?l("img",{staticClass:"img-fluid",attrs:{src:t.marketing.url,alt:t.marketing.alt}}):l("img",{staticClass:"img-fluid",attrs:{src:t.defaultImage,alt:"Placeholder image"}})])],1),t._v(" "),l("form",{staticClass:"pt-2 row",on:{submit:function(e){return e.preventDefault(),t.submitForm.apply(null,arguments)}}},[l("div",{staticClass:"md-form col-12 p-0 text-center"},[l("mdb-btn",{staticClass:"ml-3",attrs:{color:"primary",inline:""},on:{click:t.headlineImage}},[t._v("Cover image")])],1),t._v(" "),l("mdb-col",[l("ui-app-editor2",{attrs:{content:t.marketing.content},on:{"update:content":function(e){return t.$set(t.marketing,"content",e)}}})],1),t._v(" "),l("mdb-col",[l("ui-app-editor2",{attrs:{content:t.marketing.content2},on:{"update:content":function(e){return t.$set(t.marketing,"content2",e)}}})],1),t._v(" "),l("mdb-row",[l("mdb-col",[l("h3",[t._v("Gallery content")]),t._v(" "),l("div",{staticClass:"d-flex flex-row"},[l("mdb-btn",{on:{click:t.newImage}},[t._v("New image")]),t._v(" "),l("mdb-btn",{on:{click:t.selectImage}},[t._v("Select image")])],1),t._v(" "),l("mdb-row",t._l(t.galleryContent,(function(img,e){return l("mdb-col",{key:e,staticClass:"col-6 col-md-4"},[l("img",{staticClass:"img-fluid",attrs:{src:img.url,alt:img.alt}}),t._v(" "),l("mdb-popover",{attrs:{trigger:"click",options:{placement:"bottom"}}},[l("span",{attrs:{slot:"body"},slot:"body"},[l("mdb-input",{attrs:{label:"Url"},on:{change:function(e){return t.linkItem(img.id,img.link)}},model:{value:img.link,callback:function(e){t.$set(img,"link",e)},expression:"img.link"}})],1),t._v(" "),l("mdb-btn",{staticClass:"btn-sm",attrs:{slot:"reference",color:"primary"},slot:"reference"},[t._v("\n                  Link\n                ")])],1),t._v(" "),l("button",{staticClass:"btn btn-danger btn-sm",on:{click:function(e){return t.removeItem(img.id)}}},[t._v("\n                Delete\n              ")])],1)})),1)],1)],1),t._v(" "),l("mdb-col",[l("mdb-btn",{attrs:{color:"primary",type:"submit"}},[t._v("Update Content")])],1)],1)],1),t._v(" "),l("transition",{attrs:{name:"fade"}},[""!=t.msg.message?l("div",{staticClass:"pl-5 mt-4 text-white text-center",class:"bg-"+t.msg.type},[l("p",[t._v(t._s(t.msg.message))])]):t._e()]),t._v(" "),l("mdb-modal",{attrs:{size:"md",show:t.existsModal},on:{close:function(e){t.existsModal=!1}}},[l("mdb-modal-header",[l("mdb-modal-title",[t._v("Image exists with that name")])],1),t._v(" "),l("mdb-modal-body",[l("div",{staticClass:"row col-12 col-md-6 col-lg-4 py-3"},[l("p",[t._v("Would you like to use this one ?")])]),t._v(" "),l("img",{staticClass:"img-fluid",attrs:{src:t.img.content.url,alt:t.img.content.alt}})]),t._v(" "),l("mdb-modal-footer",[l("mdb-btn",{attrs:{color:"secondary",size:"sm"},nativeOn:{click:function(e){return t.declineUse.apply(null,arguments)}}},[t._v("No")]),t._v(" "),l("mdb-btn",{attrs:{color:"primary",size:"sm"},on:{click:t.confirmUse}},[t._v("Yes")])],1)],1),t._v(" "),l("mdb-modal",{attrs:{size:"md",show:t.uploadImage},on:{close:t.closeImageUpload}},[l("mdb-modal-header",[l("mdb-modal-title",[t._v("Upload image")])],1),t._v(" "),l("mdb-modal-body",[l("div",{staticClass:"row"},[l("div",{staticClass:"col-12"},[l("div",{staticClass:"md-form"},[l("mdb-input",{attrs:{label:"Description",inline:""},model:{value:t.img.alt,callback:function(e){t.$set(t.img,"alt","string"==typeof e?e.trim():e)},expression:"img.alt"}})],1)]),t._v(" "),l("div",{staticClass:"col-12"},[l("div",{staticClass:"input-group"},[l("div",{staticClass:"input-group-prepend"},[l("span",{staticClass:"input-group-text",attrs:{id:"imageInput"}},[t._v("Upload")])]),t._v(" "),l("div",{staticClass:"custom-file"},[l("input",{ref:"imageInput",staticClass:"custom-file-input",attrs:{id:"imageInput",type:"file","aria-describedby":"imageInput",accept:"image/jpeg image/png"},on:{change:function(e){return t.checkFile(e)}}}),t._v(" "),t.file.name?l("label",{staticClass:"custom-file-label",attrs:{for:"inputGroupFile01"}},[t._v(t._s(t.file.name))]):l("label",{staticClass:"custom-file-label",attrs:{for:"inputGroupFile01"}},[t._v("Image")])])])])])]),t._v(" "),l("mdb-modal-footer",[l("mdb-btn",{attrs:{color:"secondary",size:"sm"},nativeOn:{click:function(e){return t.closeImageUpload.apply(null,arguments)}}},[t._v("Close")]),t._v(" "),l("mdb-btn",{attrs:{color:"primary",size:"sm",disabled:""==t.img.alt},on:{click:function(e){return t.saveFile(t.type)}}},[t._v("Save")])],1),t._v(" "),l("transition",{attrs:{name:"fade"}},[""!=t.uploadMsg.message?l("div",{staticClass:"text-white text-center",class:"bg-"+t.uploadMsg.type},[l("p",[t._v(t._s(t.uploadMsg.message))])]):t._e()])],1),t._v(" "),l("mdb-modal",{attrs:{top:"",position:"top","full-height":"",direction:"top",show:t.selectModel},on:{close:function(e){t.selectModel=!1}}},[l("mdb-modal-header",[l("mdb-modal-title",[t._v("Select image")])],1),t._v(" "),l("mdb-modal-body",[l("div",{staticClass:"container-fluid"},[l("div",{staticClass:"row"},t._l(t.images,(function(img,e){return l("div",{key:e,staticClass:"col-4 p-0"},[l("div",{staticClass:"custom-control custom-checkbox custom-control-inline"},[l("img",{staticClass:"img-fluid",attrs:{src:img.url,alt:img.alt}}),t._v(" "),l("input",{staticClass:"custom-control-input",attrs:{id:img.id,type:"checkbox"},on:{click:function(e){return t.selected(img)}}}),t._v(" "),l("label",{staticClass:"custom-control-label",attrs:{for:img.id}},[t._v(t._s(img.alt))])])])})),0)])]),t._v(" "),l("mdb-modal-footer",[l("mdb-btn",{attrs:{color:"secondary"},nativeOn:{click:function(e){t.selectModel=!1}}},[t._v("Close")]),t._v(" "),l("mdb-btn",{attrs:{color:"primary"},on:{click:t.saveSelection}},[t._v("Confirm")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{UiAppEditor2:l(569).default})}}]);