(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{592:function(t,e,n){t.exports=n.p+"img/satellite-dish-solid.b936bad.png"},593:function(t,e,n){var content=n(668);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(68).default)("3291ec42",content,!0,{sourceMap:!1})},667:function(t,e,n){"use strict";n(593)},668:function(t,e,n){var r=n(67)(!1);r.push([t.i,".timer{width:100%}@media (min-width:768px){.timer{width:350px}}",""]),t.exports=r},692:function(t,e,n){"use strict";n.r(e);n(419),n(84);var r=n(4),o=n.n(r),c={filters:{formatTime:function(t){return t<10?"0"+t:t},formatDate:function(t){if(!t)return"-";var e=t;return o()(e).format("Do MMM YYYY")}},props:{deadline:{type:String,required:!0},race:{type:String,required:!0},speed:{type:Number,default:1e3}},data:function(){return{currentTime:Date.parse(this.deadline)-Date.parse(new Date),day:"",month:"",year:"",months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}},computed:{seconds:function(){return Math.floor(this.currentTime/1e3%60)},minutes:function(){return Math.floor(this.currentTime/1e3/60%60)},hours:function(){return Math.floor(this.currentTime/36e5%24)},days:function(){return Math.floor(this.currentTime/864e5)}},mounted:function(){var t=this;setInterval((function(){t.countdown()}),500)},methods:{countdown:function(){this.currentTime=Date.parse(this.deadline)-Date.parse(new Date),this.currentTime>0?setTimeout(this.countdown,this.speed):this.currentTime=null}}},d=(n(667),n(75)),component=Object(d.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[t.currentTime?r("div",{staticClass:"timer bg-dark text-white"},[r("div",{staticClass:"d-flex justify-content-around"},[r("div",{staticClass:"align-self-center"},[r("span",[r("img",{attrs:{src:n(592),width:"20px",height:"20px"}})])]),t._v(" "),r("div",{staticClass:"align-self-center text-center"},[r("span",[t._v(t._s(t.race)+" -  ")]),t._v(" "),r("span",[t._v(t._s(t._f("formatDate")(t.deadline))+" ")]),t._v(" "),r("p",[t._v("\n          Event live\n          "),t.days?r("span",[t._v(t._s(t.days)+" :")]):t._e(),t._v(" "),t.hours?r("span",[t._v(t._s(t._f("formatTime")(t.hours))+" :")]):t._e(),t._v(" "),r("span",[t._v(t._s(t._f("formatTime")(t.minutes))+" :"+t._s(t._f("formatTime")(t.seconds)))])])])])]):t._e(),t._v(" "),t.currentTime?t._e():r("div",{staticClass:"timer bg-dark text-white"},[r("div",{staticClass:"d-flex justify-content-around"},[r("div",{staticClass:"align-self-center"},[r("span",[r("img",{attrs:{src:n(592),width:"20px",height:"20px"}})])]),t._v(" "),r("div",{staticClass:"align-self-center text-center"},[r("p",[t._v("Stay tuned for the next "+t._s(t.race)+" event!")])])])])])}),[],!1,null,null,null);e.default=component.exports}}]);