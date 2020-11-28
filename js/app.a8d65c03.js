(function(t){function e(e){for(var r,n,o=e[0],d=e[1],l=e[2],u=0,h=[];u<o.length;u++)n=o[u],Object.prototype.hasOwnProperty.call(a,n)&&a[n]&&h.push(a[n][0]),a[n]=0;for(r in d)Object.prototype.hasOwnProperty.call(d,r)&&(t[r]=d[r]);c&&c(e);while(h.length)h.shift()();return i.push.apply(i,l||[]),s()}function s(){for(var t,e=0;e<i.length;e++){for(var s=i[e],r=!0,o=1;o<s.length;o++){var d=s[o];0!==a[d]&&(r=!1)}r&&(i.splice(e--,1),t=n(n.s=s[0]))}return t}var r={},a={app:0},i=[];function n(e){if(r[e])return r[e].exports;var s=r[e]={i:e,l:!1,exports:{}};return t[e].call(s.exports,s,s.exports,n),s.l=!0,s.exports}n.m=t,n.c=r,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)n.d(s,r,function(e){return t[e]}.bind(null,r));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/kids-word-search/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],d=o.push.bind(o);o.push=e,o=o.slice();for(var l=0;l<o.length;l++)e(o[l]);var c=d;i.push([0,"chunk-vendors"]),s()})({0:function(t,e,s){t.exports=s("56d7")},"56d7":function(t,e,s){"use strict";s.r(e);s("e260"),s("e6cf"),s("cca6"),s("a79d");var r=s("2b0e"),a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"app"}},[s("Header"),s("Helper")],1)},i=[],n=(s("4989"),function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"wrapper"}},[s("div",{staticClass:"container"},[s("div",{staticClass:"row mt-3"},[s("div",{attrs:{id:"wordsearch_grid"}},t._l(t.sizeInt,(function(e,r){return s("div",{key:r-1},t._l(t.sizeInt,(function(e,a){return s("div",{key:r+"_"+a},[s("div",{class:t.letterTileClasses(a,r),attrs:{"data-x":a,"data-y":r},on:{mousedown:function(e){return e.preventDefault(),t.wordSelectStart(e)},mouseup:t.wordSelectUpdate,mousemove:t.wordSelectUpdate,touchstart:function(e){return e.preventDefault(),t.wordSelectStart(e)},touchend:t.wordSelectUpdate,touchmove:t.wordSelectUpdate}},[s("svg",{attrs:{width:"100%",height:"100%",viewBox:"0 0 18 18"}},[s("text",{attrs:{x:"50%",y:"13","text-anchor":"middle"}},[t._v(t._s(t.gridVal(a,r)))])])]),t._l(t.wordLinesForTile(a,r),(function(e,i){return s("div",{key:r+"_"+a+"_"+i,class:t.wordLineClasses(e)})}))],2)})),0)})),0),s("div",{staticClass:"col mb-5"},[s("h2",[t._v("Words")]),s("div",{staticClass:"words"},t._l(t.usedWords,(function(e){return s("span",{key:e,class:t.wordListClasses(e)},[t._v(t._s(e))])})),0),s("h2",{staticClass:"mt-4"},[t._v(" Timer ")]),s("span",[t._v(t._s(t.displayTime))]),s("h2",{staticClass:"mt-4"},[t._v(" Game ")]),s("div",{staticClass:"btn btn-primary mb-2 d-block",on:{click:function(e){return t.rebuildGrid()}}},[t._v(" New Game ")]),s("div",{staticClass:"btn btn-primary mb-2 d-block",on:{click:function(e){return t.clearGameState()}}},[t._v(" Restart this game ")])])])]),s("div",{staticClass:"modal fade",attrs:{id:"settings_modal"}},[s("div",{staticClass:"modal-dialog",attrs:{role:"document"}},[s("div",{staticClass:"modal-content"},[t._m(0),s("div",{staticClass:"modal-body"},[s("form",[s("div",{staticClass:"row"},[s("label",{staticClass:"col-4",attrs:{for:"words-settings"}},[t._v("Words:")]),s("div",{staticClass:"form-group form-inline col-8 row"},[t._l(t.words,(function(e,r){return s("div",{key:r,staticClass:"input-group input-group-sm mb-2 col-6"},[s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.words[r],expression:"words[index]",modifiers:{lazy:!0}}],staticClass:"form-control",attrs:{type:"text"},domProps:{value:t.words[r]},on:{change:function(e){return t.$set(t.words,r,e.target.value)}}}),s("div",{staticClass:"input-group-append"},[s("div",{staticClass:"btn btn-danger",on:{click:function(e){return t.removeWord(r)}}},[t._v(" - ")])])])})),s("div",{staticClass:" mb-2 col"},[s("div",{staticClass:"btn btn-success btn-sm",on:{click:function(e){return t.addWord()}}},[t._v(" + ")])])],2)]),s("div",{staticClass:"row"},[s("label",{staticClass:"col-4",attrs:{for:"size-settings"}},[t._v("Size:")]),s("div",{staticClass:"col"},[s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.size,expression:"size",modifiers:{lazy:!0}}],staticClass:"form-control-sm",attrs:{id:"size-settings",type:"number",name:"size-settings"},domProps:{value:t.size},on:{change:function(e){t.size=e.target.value}}})])]),s("div",{staticClass:"row"},[s("label",{staticClass:"col-4",attrs:{for:"backwards-settings"}},[t._v("Allow backwards?")]),s("div",{staticClass:"col"},[s("input",{directives:[{name:"model",rawName:"v-model.lazy",value:t.backwards,expression:"backwards",modifiers:{lazy:!0}}],attrs:{id:"backwards-settings",type:"checkbox",name:"backwards-settings"},domProps:{checked:Array.isArray(t.backwards)?t._i(t.backwards,null)>-1:t.backwards},on:{change:function(e){var s=t.backwards,r=e.target,a=!!r.checked;if(Array.isArray(s)){var i=null,n=t._i(s,i);r.checked?n<0&&(t.backwards=s.concat([i])):n>-1&&(t.backwards=s.slice(0,n).concat(s.slice(n+1)))}else t.backwards=a}}})])])])]),s("div",{staticClass:"modal-footer"},[s("button",{staticClass:"btn btn-primary",attrs:{type:"button","data-dismiss":"modal"},on:{click:function(e){return t.saveSettings()}}},[t._v(" Save changes ")])])])])])])}),o=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"modal-header"},[s("h5",{staticClass:"modal-title"},[t._v(" Settings ")])])}],d=(s("99af"),s("4de4"),s("4160"),s("c975"),s("a15b"),s("d81d"),s("a434"),s("a9e3"),s("b64b"),s("d3b7"),s("ac1f"),s("25f0"),s("3ca3"),s("841c"),s("159b"),s("ddb0"),s("2b3d"),s("2909")),l={backwards:{type:Boolean,default:!1},words:{type:Array,default:["air","bare","dare","summer","scared"]},size:{type:Number,default:8}},c={name:"Helper",data:function(){return{debugEnabled:!1,size:8,words:[],backwards:!1,usedWords:[],foundWords:[],letterGrid:[[]],foundTiles:[],wordLines:[],guess:[],selectedRange:{start:void 0,end:void 0},startTime:0,displayTime:""}},computed:{sizeInt:function(){return parseInt(this.size,10)},guessedWord:function(){var t=this;return this.guess.map((function(e){return t.gridVal(e.x,e.y)})).join("")}},watch:{backwards:function(){this.syncConfigToUrl()},words:function(){this.syncConfigToUrl()},size:function(){this.syncConfigToUrl()}},mounted:function(){this.syncConfigFromUrl(),this.rebuildGrid(),setInterval(function(){this.generateDisplayTime()}.bind(this),1e3)},methods:{syncConfigFromUrl:function(){var t=this,e=new URLSearchParams(window.location.search);Object.keys(l).forEach((function(s){var r;l[s].type===Array?(r=e.getAll(s),0===r.length&&(r=l[s].default)):(r=e.get(s),null===r&&(r=l[s].default),r=new l[s].type(r).valueOf()),t[s]=r}))},syncConfigToUrl:function(){var t=this,e=new URLSearchParams(window.location.search);Object.keys(l).forEach((function(s){e.delete(s);var r=t[s];l[s].type===Array?r!=l[s].default&&r.forEach((function(t){return e.append(s,t)})):r!=l[s].default&&e.set(s,r)}));var s=window.location.pathname+"?"+e.toString();history.pushState(null,"",s)},saveSettings:function(){this.syncConfigToUrl(),this.rebuildGrid()},generateDisplayTime:function(){var t=(Date.now()-this.startTime)/1e3;this.displayTime="".concat(Math.floor(t/60),"m ").concat(Math.floor(t%60),"s")},removeWord:function(t){this.words.splice(t,1)},addWord:function(){this.words.push("")},wordListClasses:function(t){var e=["badge","badge-pill","badge-primary"];return-1!==this.foundWords.indexOf(t)&&e.push("badge-success"),e},isTileHighlighted:function(t,e){if(this.selectedRange.start&&this.selectedRange.end){var s=this.selectedRange,r=Math.min(s.start.x,s.end.x),a=Math.max(s.start.x,s.end.x),i=Math.min(s.start.y,s.end.y),n=Math.max(s.start.y,s.end.y);if(t>=r&&t<=a&&e>=i&&e<=n)return s.start.x===s.end.x||s.start.y===s.end.y||Math.abs(s.start.x-t)===Math.abs(s.start.y-e)}return!1},isTileAFoundWordTile:function(t,e){for(var s=0;s<this.foundTiles.length;s+=1)if(this.foundTiles[s].x===t&&this.foundTiles[s].y===e)return!0;return!1},letterTileClasses:function(t,e){var s=["letter-tile"];return this.isTileHighlighted(t,e)&&s.push("letter-tile-highlighted"),this.isTileAFoundWordTile(t,e)&&s.push("letter-tile-found"),s},wordLinesForTile:function(t,e){return this.wordLines.filter((function(s){return s.x===t&&s.y===e}))},wordLineClasses:function(t){var e=["word-strike","word-strike-direction-"+t.direction,"word-strike-length-"+t.length];return t.direction%2===1&&e.push("word-strike-diagonal"),e},wordSelectStart:function(t){var e=t.target.closest("div.letter-tile");return!!(e&&e.dataset&&e.dataset.x)&&(this.selectedRange.start={x:parseInt(e.dataset.x,10),y:parseInt(e.dataset.y,10)},!0)},wordSelectUpdate:function(t){if(void 0===this.selectedRange.start)return!1;var e=t;0===t.type.indexOf("touch")&&(e=t.changedTouches.item(0));var s=document.elementFromPoint(e.clientX,e.clientY).closest("div.letter-tile");if(s&&s.dataset&&s.dataset.x){var r=parseInt(s.dataset.x,10),a=parseInt(s.dataset.y,10),i=Math.abs(r-this.selectedRange.start.x),n=Math.abs(a-this.selectedRange.start.y);if(0===n&&i>0||0===i&&n>0||i===n){if(this.selectedRange.end={x:r,y:a},"mouseup"===t.type||"touchend"===t.type){console.log(JSON.stringify(this.selectedRange)),this.guess=[];var o=this.selectedRange.start.x,l=this.selectedRange.start.y,c=this.selectedRange.end.x,u=this.selectedRange.end.y,h=0;if(0===i){for(var f=u>l?1:-1,v=l;f>0?v<=u:v>=u;v+=f)this.guess.push({x:o,y:v});h=f>0?4:0}else if(0===n){for(var p=c>o?1:-1,g=o;p>0?g<=c:g>=c;g+=p)this.guess.push({x:g,y:l});h=p>0?2:7}else{for(var m=c>o?1:-1,b=u>l?1:-1,w=o,y=l;(b>0?y<=u:y>=u)||(m>0?w<=c:w>=c);y+=b,w+=m)this.guess.push({x:w,y:y});h=m>0?b>0?3:1:b>0?5:7}if(-1!==this.usedWords.indexOf(this.guessedWord)){var x;this.foundWords.push(this.guessedWord),(x=this.foundTiles).push.apply(x,Object(d["a"])(this.guess));var C={x:o,y:l,length:this.guessedWord.length,direction:h};this.wordLines.push(C),this.debugEnabled&&console.log("Found Word:",this.guessedWord,o,l,C)}this.resetSelectedRange()}}else"mouseup"===t.type||"touchend"===t.type?this.resetSelectedRange():this.selectedRange.end=void 0}else"mouseup"===t.type||"touchend"===t.type?this.resetSelectedRange():this.selectedRange.end=void 0;return!0},resetSelectedRange:function(){this.selectedRange={start:void 0,end:void 0}},gridVal:function(t,e){return"undefined"!==typeof this.letterGrid[e]&&"undefined"!==typeof this.letterGrid[e][t]?this.letterGrid[e][t]:""},clearGameState:function(){this.foundWords=[],this.foundTiles=[],this.guess=[],this.wordLines=[],this.startTime=Date.now(),this.generateDisplayTime()},rebuildGrid:function(){var t=this;this.letterGrid=Object(d["a"])(Array(this.sizeInt)).map((function(){return Array(t.sizeInt)})),this.usedWords=[],this.clearGameState(),this.words.forEach((function(e){if(e.length>t.sizeInt)console.error("Word wont fit on board");else{var s=!1,r=0,a=0,i=0,n=0,o=0;do{if(o+=1,o>100)return void console.error("Tried to write word 100 times and failed",e);r=Math.floor(Math.random()*t.sizeInt),a=Math.floor(Math.random()*t.sizeInt),i=0,n=0,s=!1;var d=t.backwards?Math.floor(8*Math.random()):1+Math.floor(4*Math.random());d>0&&d<4?i=1:d>4&&d<8&&(i=-1),d<2||d>6?n=-1:d>2&&d<6&&(n=1);try{var l=r+i*e.length;if(l<0||l>t.sizeInt)throw new Error("Word exceeds width");var c=a+n*e.length;if(c<0||c>t.sizeInt)throw new Error("Word exceeds height");for(var u=0;u<e.length;u+=1){var h=r+u*i,f=a+u*n;if(void 0!==t.letterGrid[f][h]&&t.letterGrid[f][h]!==e[u])throw new Error("Letter Overlap")}s=!0}catch(m){t.debugEnabled&&console.log("DEBUG: ".concat(m.message),e,r,a,i,n),s=!1}}while(!s);t.usedWords.push(e);for(var v=0;v<e.length;v+=1){var p=r+v*i,g=a+v*n;t.letterGrid[g][p]=e[v]}}}));for(var e="abcdefghijklmnopqrstuvwxyz",s=0;s<this.sizeInt;s+=1)for(var r=0;r<this.sizeInt;r+=1)void 0===this.letterGrid[s][r]&&(this.letterGrid[s][r]=e.charAt(Math.floor(Math.random()*e.length)))}}},u=c,h=s("2877"),f=Object(h["a"])(u,n,o,!1,null,null,null),v=f.exports,p=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("nav",{staticClass:"navbar navbar-expand-lg sticky-top navbar-dark bg-primary"},[s("div",{staticClass:"container"},[s("div",{staticClass:"row"},[s("a",{staticClass:"navbar-brand",attrs:{href:t.baseUrl,title:"Word Search Game"}},[t._v("Word Search Game")]),s("ul",{staticClass:"navbar-nav ml-auto"},[s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{href:"#","data-toggle":"modal","data-target":"#settings_modal"}},[s("svg",{staticClass:"settings-icon",attrs:{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 20 20"}},[s("path",{attrs:{fill:"none",d:"M0 0h20v20H0V0z"}}),s("path",{attrs:{d:"M15.95 10.78c.03-.25.05-.51.05-.78s-.02-.53-.06-.78l1.69-1.32c.15-.12.19-.34.1-.51l-1.6-2.77c-.1-.18-.31-.24-.49-.18l-1.99.8c-.42-.32-.86-.58-1.35-.78L12 2.34c-.03-.2-.2-.34-.4-.34H8.4c-.2 0-.36.14-.39.34l-.3 2.12c-.49.2-.94.47-1.35.78l-1.99-.8c-.18-.07-.39 0-.49.18l-1.6 2.77c-.1.18-.06.39.1.51l1.69 1.32c-.04.25-.07.52-.07.78s.02.53.06.78L2.37 12.1c-.15.12-.19.34-.1.51l1.6 2.77c.1.18.31.24.49.18l1.99-.8c.42.32.86.58 1.35.78l.3 2.12c.04.2.2.34.4.34h3.2c.2 0 .37-.14.39-.34l.3-2.12c.49-.2.94-.47 1.35-.78l1.99.8c.18.07.39 0 .49-.18l1.6-2.77c.1-.18.06-.39-.1-.51l-1.67-1.32zM10 13c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3z"}})])])]),s("li",{staticClass:"nav-item"},[s("a",{staticClass:"nav-link",attrs:{id:"github-logo",href:"https://github.com/njt1982/kids-word-search",target:"_blank"}},[s("img",{attrs:{src:t.baseUrl+"GitHub-Mark-Light-120px-plus.png"}})])])])])])])},g=[],m={name:"Header",data:function(){return{baseUrl:"/kids-word-search/"}}},b=m,w=Object(h["a"])(b,p,g,!1,null,null,null),y=w.exports,x={name:"App",components:{Helper:v,Header:y}},C=x,k=(s("5c0b"),Object(h["a"])(C,a,i,!1,null,null,null)),_=k.exports;r["a"].config.productionTip=!1,new r["a"]({el:"#app",render:function(t){return t(_)}})},"5c0b":function(t,e,s){"use strict";s("9c0c")},"9c0c":function(t,e,s){}});