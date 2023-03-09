/*!
 * @pixi/sound - v5.1.0
 * Compiled Fri, 03 Mar 2023 14:39:32 UTC
 *
 * @pixi/sound is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 * 
 * Copyright 2023, Matt Karl @bigtimebuddy, All Rights Reserved
 */this.PIXI=this.PIXI||{},this.PIXI.sound=function(c,et){"use strict";let O;function st(i){return O=i,i}function h(){return O}let it=0;const F=class extends c.utils.EventEmitter{constructor(t){super(),this.id=it++,this.init(t)}set(t,e){if(this[t]===void 0)throw new Error(`Property with name ${t} does not exist.`);switch(t){case"speed":this.speed=e;break;case"volume":this.volume=e;break;case"paused":this.paused=e;break;case"loop":this.loop=e;break;case"muted":this.muted=e;break}return this}get progress(){const{currentTime:t}=this._source;return t/this._duration}get paused(){return this._paused}set paused(t){this._paused=t,this.refreshPaused()}_onPlay(){this._playing=!0}_onPause(){this._playing=!1}init(t){this._playing=!1,this._duration=t.source.duration;const e=this._source=t.source.cloneNode(!1);e.src=t.parent.url,e.onplay=this._onPlay.bind(this),e.onpause=this._onPause.bind(this),t.context.on("refresh",this.refresh,this),t.context.on("refreshPaused",this.refreshPaused,this),this._media=t}_internalStop(){this._source&&this._playing&&(this._source.onended=null,this._source.pause())}stop(){this._internalStop(),this._source&&this.emit("stop")}get speed(){return this._speed}set speed(t){this._speed=t,this.refresh()}get volume(){return this._volume}set volume(t){this._volume=t,this.refresh()}get loop(){return this._loop}set loop(t){this._loop=t,this.refresh()}get muted(){return this._muted}set muted(t){this._muted=t,this.refresh()}get filters(){return console.warn("HTML Audio does not support filters"),null}set filters(t){console.warn("HTML Audio does not support filters")}refresh(){const t=this._media.context,e=this._media.parent;this._source.loop=this._loop||e.loop;const s=t.volume*(t.muted?0:1),r=e.volume*(e.muted?0:1),n=this._volume*(this._muted?0:1);this._source.volume=n*s*r,this._source.playbackRate=this._speed*t.speed*e.speed}refreshPaused(){const t=this._media.context,e=this._media.parent,s=this._paused||e.paused||t.paused;s!==this._pausedReal&&(this._pausedReal=s,s?(this._internalStop(),this.emit("paused")):(this.emit("resumed"),this.play({start:this._source.currentTime,end:this._end,volume:this._volume,speed:this._speed,loop:this._loop})),this.emit("pause",s))}play(t){const{start:e,end:s,speed:r,loop:n,volume:o,muted:a}=t;s&&console.assert(s>e,"End time is before start time"),this._speed=r,this._volume=o,this._loop=!!n,this._muted=a,this.refresh(),this.loop&&s!==null&&(console.warn('Looping not support when specifying an "end" time'),this.loop=!1),this._start=e,this._end=s||this._duration,this._start=Math.max(0,this._start-F.PADDING),this._end=Math.min(this._end+F.PADDING,this._duration),this._source.onloadedmetadata=()=>{this._source&&(this._source.currentTime=e,this._source.onloadedmetadata=null,this.emit("progress",e,this._duration),c.Ticker.shared.add(this._onUpdate,this))},this._source.onended=this._onComplete.bind(this),this._source.play(),this.emit("start")}_onUpdate(){this.emit("progress",this.progress,this._duration),this._source.currentTime>=this._end&&!this._source.loop&&this._onComplete()}_onComplete(){c.Ticker.shared.remove(this._onUpdate,this),this._internalStop(),this.emit("progress",1,this._duration),this.emit("end",this)}destroy(){c.Ticker.shared.remove(this._onUpdate,this),this.removeAllListeners();const t=this._source;t&&(t.onended=null,t.onplay=null,t.onpause=null,this._internalStop()),this._source=null,this._speed=1,this._volume=1,this._loop=!1,this._end=null,this._start=0,this._duration=0,this._playing=!1,this._pausedReal=!1,this._paused=!1,this._muted=!1,this._media&&(this._media.context.off("refresh",this.refresh,this),this._media.context.off("refreshPaused",this.refreshPaused,this),this._media=null)}toString(){return`[HTMLAudioInstance id=${this.id}]`}};let $=F;$.PADDING=.1;class M extends c.utils.EventEmitter{init(t){this.parent=t,this._source=t.options.source||new Audio,t.url&&(this._source.src=t.url)}create(){return new $(this)}get isPlayable(){return!!this._source&&this._source.readyState===4}get duration(){return this._source.duration}get context(){return this.parent.context}get filters(){return null}set filters(t){console.warn("HTML Audio does not support filters")}destroy(){this.removeAllListeners(),this.parent=null,this._source&&(this._source.src="",this._source.load(),this._source=null)}get source(){return this._source}load(t){const e=this._source,s=this.parent;if(e.readyState===4){s.isLoaded=!0;const l=s.autoPlayStart();t&&setTimeout(()=>{t(null,s,l)},0);return}if(!s.url){t(new Error("sound.url or sound.source must be set"));return}e.src=s.url;const r=()=>{a(),s.isLoaded=!0;const l=s.autoPlayStart();t&&t(null,s,l)},n=()=>{a(),t&&t(new Error("Sound loading has been aborted"))},o=()=>{a();const l=`Failed to load audio element (code: ${e.error.code})`;t?t(new Error(l)):console.error(l)},a=()=>{e.removeEventListener("canplaythrough",r),e.removeEventListener("load",r),e.removeEventListener("abort",n),e.removeEventListener("error",o)};e.addEventListener("canplaythrough",r,!1),e.addEventListener("load",r,!1),e.addEventListener("abort",n,!1),e.addEventListener("error",o,!1),e.load()}}let I=class{constructor(t,e){this.parent=t,Object.assign(this,e),this.duration=this.end-this.start,console.assert(this.duration>0,"End time must be after start time")}play(t){return this.parent.play({complete:t,speed:this.speed||this.parent.speed,end:this.end,start:this.start,loop:this.loop})}destroy(){this.parent=null}};var rt=Object.defineProperty,T=Object.getOwnPropertySymbols,nt=Object.prototype.hasOwnProperty,ot=Object.prototype.propertyIsEnumerable,j=(i,t,e)=>t in i?rt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,at=(i,t)=>{for(var e in t||(t={}))nt.call(t,e)&&j(i,e,t[e]);if(T)for(var e of T(t))ot.call(t,e)&&j(i,e,t[e]);return i};const w=["ogg","oga","opus","m4a","mp3","mpeg","wav","aiff","wma","mid","caf"],S={};function G(i){const t=at({m4a:"audio/mp4",oga:"audio/ogg",opus:'audio/ogg; codecs="opus"',caf:'audio/x-caf; codecs="opus"'},i||{}),e=document.createElement("audio"),s={},r=/^no$/;w.forEach(n=>{const o=e.canPlayType(`audio/${n}`).replace(r,""),a=t[n]?e.canPlayType(t[n]).replace(r,""):"";s[n]=!!o||!!a}),Object.assign(S,s)}G();let f=class{static setParamValue(t,e){if(t.setValueAtTime){const s=h().context;t.setValueAtTime(e,s.audioContext.currentTime)}else t.value=e;return e}},ut=0,B=class extends c.utils.EventEmitter{constructor(t){super(),this.id=ut++,this._media=null,this._paused=!1,this._muted=!1,this._elapsed=0,this.init(t)}set(t,e){if(this[t]===void 0)throw new Error(`Property with name ${t} does not exist.`);switch(t){case"speed":this.speed=e;break;case"volume":this.volume=e;break;case"muted":this.muted=e;break;case"loop":this.loop=e;break;case"paused":this.paused=e;break}return this}stop(){this._source&&(this._internalStop(),this.emit("stop"))}get speed(){return this._speed}set speed(t){this._speed=t,this.refresh(),this._update(!0)}get volume(){return this._volume}set volume(t){this._volume=t,this.refresh()}get muted(){return this._muted}set muted(t){this._muted=t,this.refresh()}get loop(){return this._loop}set loop(t){this._loop=t,this.refresh()}get filters(){return this._filters}set filters(t){var e;this._filters&&((e=this._filters)==null||e.filter(s=>s).forEach(s=>s.disconnect()),this._filters=null,this._source.connect(this._gain)),this._filters=t!=null&&t.length?t.slice(0):null,this.refresh()}refresh(){if(!this._source)return;const t=this._media.context,e=this._media.parent;this._source.loop=this._loop||e.loop;const s=t.volume*(t.muted?0:1),r=e.volume*(e.muted?0:1),n=this._volume*(this._muted?0:1);f.setParamValue(this._gain.gain,n*r*s),f.setParamValue(this._source.playbackRate,this._speed*e.speed*t.speed),this.applyFilters()}applyFilters(){var t;if((t=this._filters)!=null&&t.length){this._source.disconnect();let e=this._source;this._filters.forEach(s=>{e.connect(s.destination),e=s}),e.connect(this._gain)}}refreshPaused(){const t=this._media.context,e=this._media.parent,s=this._paused||e.paused||t.paused;s!==this._pausedReal&&(this._pausedReal=s,s?(this._internalStop(),this.emit("paused")):(this.emit("resumed"),this.play({start:this._elapsed%this._duration,end:this._end,speed:this._speed,loop:this._loop,volume:this._volume})),this.emit("pause",s))}play(t){const{start:e,end:s,speed:r,loop:n,volume:o,muted:a,filters:l}=t;s&&console.assert(s>e,"End time is before start time"),this._paused=!1;const{source:d,gain:_}=this._media.nodes.cloneBufferSource();this._source=d,this._gain=_,this._speed=r,this._volume=o,this._loop=!!n,this._muted=a,this._filters=l,this.refresh();const g=this._source.buffer.duration;this._duration=g,this._end=s,this._lastUpdate=this._now(),this._elapsed=e,this._source.onended=this._onComplete.bind(this),this._loop?(this._source.loopEnd=s,this._source.loopStart=e,this._source.start(0,e)):s?this._source.start(0,e,s-e):this._source.start(0,e),this.emit("start"),this._update(!0),this.enableTicker(!0)}enableTicker(t){c.Ticker.shared.remove(this._updateListener,this),t&&c.Ticker.shared.add(this._updateListener,this)}get progress(){return this._progress}get paused(){return this._paused}set paused(t){this._paused=t,this.refreshPaused()}destroy(){var t;this.removeAllListeners(),this._internalStop(),this._gain&&(this._gain.disconnect(),this._gain=null),this._media&&(this._media.context.events.off("refresh",this.refresh,this),this._media.context.events.off("refreshPaused",this.refreshPaused,this),this._media=null),(t=this._filters)==null||t.forEach(e=>e.disconnect()),this._filters=null,this._end=null,this._speed=1,this._volume=1,this._loop=!1,this._elapsed=0,this._duration=0,this._paused=!1,this._muted=!1,this._pausedReal=!1}toString(){return`[WebAudioInstance id=${this.id}]`}_now(){return this._media.context.audioContext.currentTime}_updateListener(){this._update()}_update(t=!1){if(this._source){const e=this._now(),s=e-this._lastUpdate;if(s>0||t){const r=this._source.playbackRate.value;this._elapsed+=s*r,this._lastUpdate=e;const n=this._duration;let o;if(this._source.loopStart){const a=this._source.loopEnd-this._source.loopStart;o=(this._source.loopStart+this._elapsed%a)/n}else o=this._elapsed%n/n;this._progress=o,this.emit("progress",this._progress,n)}}}init(t){this._media=t,t.context.events.on("refresh",this.refresh,this),t.context.events.on("refreshPaused",this.refreshPaused,this)}_internalStop(){if(this._source){this.enableTicker(!1),this._source.onended=null,this._source.stop(0),this._source.disconnect();try{this._source.buffer=null}catch(t){console.warn("Failed to set AudioBufferSourceNode.buffer to null:",t)}this._source=null}}_onComplete(){if(this._source){this.enableTicker(!1),this._source.onended=null,this._source.disconnect();try{this._source.buffer=null}catch(t){console.warn("Failed to set AudioBufferSourceNode.buffer to null:",t)}}this._source=null,this._progress=1,this.emit("progress",1,this._duration),this.emit("end",this)}},C=class{constructor(t,e){this._output=e,this._input=t}get destination(){return this._input}get filters(){return this._filters}set filters(t){if(this._filters&&(this._filters.forEach(e=>{e&&e.disconnect()}),this._filters=null,this._input.connect(this._output)),t&&t.length){this._filters=t.slice(0),this._input.disconnect();let e=null;t.forEach(s=>{e===null?this._input.connect(s.destination):e.connect(s.destination),e=s}),e.connect(this._output)}}destroy(){this.filters=null,this._input=null,this._output=null}};const K=class extends C{constructor(t){const e=t.audioContext,s=e.createBufferSource(),r=e.createGain(),n=e.createAnalyser();s.connect(n),n.connect(r),r.connect(t.destination),super(n,r),this.context=t,this.bufferSource=s,this.gain=r,this.analyser=n}get script(){return this._script||(this._script=this.context.audioContext.createScriptProcessor(K.BUFFER_SIZE),this._script.connect(this.context.destination)),this._script}destroy(){super.destroy(),this.bufferSource.disconnect(),this._script&&this._script.disconnect(),this.gain.disconnect(),this.analyser.disconnect(),this.bufferSource=null,this._script=null,this.gain=null,this.analyser=null,this.context=null}cloneBufferSource(){const t=this.bufferSource,e=this.context.audioContext.createBufferSource();e.buffer=t.buffer,f.setParamValue(e.playbackRate,t.playbackRate.value),e.loop=t.loop;const s=this.context.audioContext.createGain();return e.connect(s),s.connect(this.destination),{source:e,gain:s}}get bufferSize(){return this.script.bufferSize}};let L=K;L.BUFFER_SIZE=0;let E=class{init(t){this.parent=t,this._nodes=new L(this.context),this._source=this._nodes.bufferSource,this.source=t.options.source}destroy(){this.parent=null,this._nodes.destroy(),this._nodes=null;try{this._source.buffer=null}catch(t){console.warn("Failed to set AudioBufferSourceNode.buffer to null:",t)}this._source=null,this.source=null}create(){return new B(this)}get context(){return this.parent.context}get isPlayable(){return!!this._source&&!!this._source.buffer}get filters(){return this._nodes.filters}set filters(t){this._nodes.filters=t}get duration(){return console.assert(this.isPlayable,"Sound not yet playable, no duration"),this._source.buffer.duration}get buffer(){return this._source.buffer}set buffer(t){this._source.buffer=t}get nodes(){return this._nodes}load(t){this.source?this._decode(this.source,t):this.parent.url?this._loadUrl(t):t?t(new Error("sound.url or sound.source must be set")):console.error("sound.url or sound.source must be set")}async _loadUrl(t){const e=this.parent.url,s=await c.settings.ADAPTER.fetch(e);this._decode(await s.arrayBuffer(),t)}_decode(t,e){const s=(r,n)=>{if(r)e&&e(r);else{this.parent.isLoaded=!0,this.buffer=n;const o=this.parent.autoPlayStart();e&&e(null,this.parent,o)}};t instanceof AudioBuffer?s(null,t):this.parent.context.decode(t,s)}};var lt=Object.defineProperty,R=Object.getOwnPropertySymbols,ht=Object.prototype.hasOwnProperty,dt=Object.prototype.propertyIsEnumerable,D=(i,t,e)=>t in i?lt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,q=(i,t)=>{for(var e in t||(t={}))ht.call(t,e)&&D(i,e,t[e]);if(R)for(var e of R(t))dt.call(t,e)&&D(i,e,t[e]);return i};const x=class{static from(t){let e={};typeof t=="string"?e.url=t:t instanceof ArrayBuffer||t instanceof AudioBuffer||t instanceof HTMLAudioElement?e.source=t:Array.isArray(t)?e.url=t:e=t,e=q({autoPlay:!1,singleInstance:!1,url:null,source:null,preload:!1,volume:1,speed:1,complete:null,loaded:null,loop:!1},e),Object.freeze(e);const s=h().useLegacy?new M:new E;return new x(s,e)}constructor(t,e){this.media=t,this.options=e,this._instances=[],this._sprites={},this.media.init(this);const s=e.complete;this._autoPlayOptions=s?{complete:s}:null,this.isLoaded=!1,this._preloadQueue=null,this.isPlaying=!1,this.autoPlay=e.autoPlay,this.singleInstance=e.singleInstance,this.preload=e.preload||this.autoPlay,this.url=Array.isArray(e.url)?this.preferUrl(e.url):e.url,this.speed=e.speed,this.volume=e.volume,this.loop=e.loop,e.sprites&&this.addSprites(e.sprites),this.preload&&this._preload(e.loaded)}preferUrl(t){const[{url:e}]=t.map(s=>({url:s,ext:c.utils.path.extname(s).slice(1)})).sort((s,r)=>w.indexOf(s.ext)-w.indexOf(r.ext));return e}get context(){return h().context}pause(){return this.isPlaying=!1,this.paused=!0,this}resume(){return this.isPlaying=this._instances.length>0,this.paused=!1,this}get paused(){return this._paused}set paused(t){this._paused=t,this.refreshPaused()}get speed(){return this._speed}set speed(t){this._speed=t,this.refresh()}get filters(){return this.media.filters}set filters(t){this.media.filters=t}addSprites(t,e){if(typeof t=="object"){const r={};for(const n in t)r[n]=this.addSprites(n,t[n]);return r}console.assert(!this._sprites[t],`Alias ${t} is already taken`);const s=new I(this,e);return this._sprites[t]=s,s}destroy(){this._removeInstances(),this.removeSprites(),this.media.destroy(),this.media=null,this._sprites=null,this._instances=null}removeSprites(t){if(t){const e=this._sprites[t];e!==void 0&&(e.destroy(),delete this._sprites[t])}else for(const e in this._sprites)this.removeSprites(e);return this}get isPlayable(){return this.isLoaded&&this.media&&this.media.isPlayable}stop(){if(!this.isPlayable)return this.autoPlay=!1,this._autoPlayOptions=null,this;this.isPlaying=!1;for(let t=this._instances.length-1;t>=0;t--)this._instances[t].stop();return this}play(t,e){let s;if(typeof t=="string"?s={sprite:t,loop:this.loop,complete:e}:typeof t=="function"?(s={},s.complete=t):s=t,s=q({complete:null,loaded:null,sprite:null,end:null,start:0,volume:1,speed:1,muted:!1,loop:!1},s||{}),s.sprite){const n=s.sprite;console.assert(!!this._sprites[n],`Alias ${n} is not available`);const o=this._sprites[n];s.start=o.start+(s.start||0),s.end=o.end,s.speed=o.speed||1,s.loop=o.loop||s.loop,delete s.sprite}if(s.offset&&(s.start=s.offset),!this.isLoaded)return this._preloadQueue?new Promise(n=>{this._preloadQueue.push(()=>{n(this.play(s))})}):(this._preloadQueue=[],this.autoPlay=!0,this._autoPlayOptions=s,new Promise((n,o)=>{this._preload((a,l,d)=>{this._preloadQueue.forEach(_=>_()),this._preloadQueue=null,a?o(a):(s.loaded&&s.loaded(a,l,d),n(d))})}));(this.singleInstance||s.singleInstance)&&this._removeInstances();const r=this._createInstance();return this._instances.push(r),this.isPlaying=!0,r.once("end",()=>{s.complete&&s.complete(this),this._onComplete(r)}),r.once("stop",()=>{this._onComplete(r)}),r.play(s),r}refresh(){const t=this._instances.length;for(let e=0;e<t;e++)this._instances[e].refresh()}refreshPaused(){const t=this._instances.length;for(let e=0;e<t;e++)this._instances[e].refreshPaused()}get volume(){return this._volume}set volume(t){this._volume=t,this.refresh()}get muted(){return this._muted}set muted(t){this._muted=t,this.refresh()}get loop(){return this._loop}set loop(t){this._loop=t,this.refresh()}_preload(t){this.media.load(t)}get instances(){return this._instances}get sprites(){return this._sprites}get duration(){return this.media.duration}autoPlayStart(){let t;return this.autoPlay&&(t=this.play(this._autoPlayOptions)),t}_removeInstances(){for(let t=this._instances.length-1;t>=0;t--)this._poolInstance(this._instances[t]);this._instances.length=0}_onComplete(t){if(this._instances){const e=this._instances.indexOf(t);e>-1&&this._instances.splice(e,1),this.isPlaying=this._instances.length>0}this._poolInstance(t)}_createInstance(){if(x._pool.length>0){const t=x._pool.pop();return t.init(this.media),t}return this.media.create()}_poolInstance(t){t.destroy(),x._pool.indexOf(t)<0&&x._pool.push(t)}};let P=x;P._pool=[];let U=class extends c.utils.EventEmitter{constructor(){super(...arguments),this.speed=1,this.muted=!1,this.volume=1,this.paused=!1}refresh(){this.emit("refresh")}refreshPaused(){this.emit("refreshPaused")}get filters(){return console.warn("HTML Audio does not support filters"),null}set filters(t){console.warn("HTML Audio does not support filters")}get audioContext(){return console.warn("HTML Audio does not support audioContext"),null}toggleMute(){return this.muted=!this.muted,this.refresh(),this.muted}togglePause(){return this.paused=!this.paused,this.refreshPaused(),this.paused}destroy(){this.removeAllListeners()}},A=class extends C{constructor(){const t=window,e=new A.AudioContext,s=e.createDynamicsCompressor(),r=e.createAnalyser();r.connect(s),s.connect(e.destination),super(r,s),this._ctx=e,this._offlineCtx=new A.OfflineAudioContext(1,2,t.OfflineAudioContext?Math.max(8e3,Math.min(96e3,e.sampleRate)):44100),this._unlocked=!1,this.compressor=s,this.analyser=r,this.events=new c.utils.EventEmitter,this.volume=1,this.speed=1,this.muted=!1,this.paused=!1,e.state!=="running"&&(this._unlock(),this._unlock=this._unlock.bind(this),document.addEventListener("mousedown",this._unlock,!0),document.addEventListener("touchstart",this._unlock,!0),document.addEventListener("touchend",this._unlock,!0))}_unlock(){this._unlocked||(this.playEmptySound(),this._ctx.state==="running"&&(document.removeEventListener("mousedown",this._unlock,!0),document.removeEventListener("touchend",this._unlock,!0),document.removeEventListener("touchstart",this._unlock,!0),this._unlocked=!0))}playEmptySound(){const t=this._ctx.createBufferSource();t.buffer=this._ctx.createBuffer(1,1,22050),t.connect(this._ctx.destination),t.start(0,0,0),t.context.state==="suspended"&&t.context.resume()}static get AudioContext(){const t=window;return t.AudioContext||t.webkitAudioContext||null}static get OfflineAudioContext(){const t=window;return t.OfflineAudioContext||t.webkitOfflineAudioContext||null}destroy(){super.destroy();const t=this._ctx;typeof t.close!="undefined"&&t.close(),this.events.removeAllListeners(),this.analyser.disconnect(),this.compressor.disconnect(),this.analyser=null,this.compressor=null,this.events=null,this._offlineCtx=null,this._ctx=null}get audioContext(){return this._ctx}get offlineContext(){return this._offlineCtx}set paused(t){t&&this._ctx.state==="running"?this._ctx.suspend():!t&&this._ctx.state==="suspended"&&this._ctx.resume(),this._paused=t}get paused(){return this._paused}refresh(){this.events.emit("refresh")}refreshPaused(){this.events.emit("refreshPaused")}toggleMute(){return this.muted=!this.muted,this.refresh(),this.muted}togglePause(){return this.paused=!this.paused,this.refreshPaused(),this._paused}decode(t,e){const s=n=>{e(new Error((n==null?void 0:n.message)||"Unable to decode file"))},r=this._offlineCtx.decodeAudioData(t,n=>{e(null,n)},s);r&&r.catch(s)}};var ct=Object.defineProperty,V=Object.getOwnPropertySymbols,pt=Object.prototype.hasOwnProperty,_t=Object.prototype.propertyIsEnumerable,H=(i,t,e)=>t in i?ct(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,N=(i,t)=>{for(var e in t||(t={}))pt.call(t,e)&&H(i,e,t[e]);if(V)for(var e of V(t))_t.call(t,e)&&H(i,e,t[e]);return i};let z=class{constructor(){this.init()}init(){return this.supported&&(this._webAudioContext=new A),this._htmlAudioContext=new U,this._sounds={},this.useLegacy=!this.supported,this}get context(){return this._context}get filtersAll(){return this.useLegacy?[]:this._context.filters}set filtersAll(t){this.useLegacy||(this._context.filters=t)}get supported(){return A.AudioContext!==null}add(t,e){if(typeof t=="object"){const n={};for(const o in t){const a=this._getOptions(t[o],e);n[o]=this.add(o,a)}return n}if(console.assert(!this._sounds[t],`Sound with alias ${t} already exists.`),e instanceof P)return this._sounds[t]=e,e;const s=this._getOptions(e),r=P.from(s);return this._sounds[t]=r,r}_getOptions(t,e){let s;return typeof t=="string"?s={url:t}:Array.isArray(t)?s={url:t}:t instanceof ArrayBuffer||t instanceof AudioBuffer||t instanceof HTMLAudioElement?s={source:t}:s=t,s=N(N({},s),e||{}),s}get useLegacy(){return this._useLegacy}set useLegacy(t){this._useLegacy=t,this._context=!t&&this.supported?this._webAudioContext:this._htmlAudioContext}remove(t){return this.exists(t,!0),this._sounds[t].destroy(),delete this._sounds[t],this}get volumeAll(){return this._context.volume}set volumeAll(t){this._context.volume=t,this._context.refresh()}get speedAll(){return this._context.speed}set speedAll(t){this._context.speed=t,this._context.refresh()}togglePauseAll(){return this._context.togglePause()}pauseAll(){return this._context.paused=!0,this._context.refreshPaused(),this}resumeAll(){return this._context.paused=!1,this._context.refreshPaused(),this}toggleMuteAll(){return this._context.toggleMute()}muteAll(){return this._context.muted=!0,this._context.refresh(),this}unmuteAll(){return this._context.muted=!1,this._context.refresh(),this}removeAll(){for(const t in this._sounds)this._sounds[t].destroy(),delete this._sounds[t];return this}stopAll(){for(const t in this._sounds)this._sounds[t].stop();return this}exists(t,e=!1){const s=!!this._sounds[t];return e&&console.assert(s,`No sound matching alias '${t}'.`),s}isPlaying(){for(const t in this._sounds)if(this._sounds[t].isPlaying)return!0;return!1}find(t){return this.exists(t,!0),this._sounds[t]}play(t,e){return this.find(t).play(e)}stop(t){return this.find(t).stop()}pause(t){return this.find(t).pause()}resume(t){return this.find(t).resume()}volume(t,e){const s=this.find(t);return e!==void 0&&(s.volume=e),s.volume}speed(t,e){const s=this.find(t);return e!==void 0&&(s.speed=e),s.speed}duration(t){return this.find(t).duration}close(){return this.removeAll(),this._sounds=null,this._webAudioContext&&(this._webAudioContext.destroy(),this._webAudioContext=null),this._htmlAudioContext&&(this._htmlAudioContext.destroy(),this._htmlAudioContext=null),this._context=null,this}};var ft=Object.freeze({__proto__:null,HTMLAudioContext:U,HTMLAudioInstance:$,HTMLAudioMedia:M});let b=class{constructor(t,e){this.init(t,e)}init(t,e){this.destination=t,this.source=e||t}connect(t){this.source.connect(t)}disconnect(){this.source.disconnect()}destroy(){this.disconnect(),this.destination=null,this.source=null}};const u=class extends b{constructor(t=0,e=0,s=0,r=0,n=0,o=0,a=0,l=0,d=0,_=0){var g=(...p)=>{super(...p)};if(h().useLegacy){g(null);return}const y=[{f:u.F32,type:"lowshelf",gain:t},{f:u.F64,type:"peaking",gain:e},{f:u.F125,type:"peaking",gain:s},{f:u.F250,type:"peaking",gain:r},{f:u.F500,type:"peaking",gain:n},{f:u.F1K,type:"peaking",gain:o},{f:u.F2K,type:"peaking",gain:a},{f:u.F4K,type:"peaking",gain:l},{f:u.F8K,type:"peaking",gain:d},{f:u.F16K,type:"highshelf",gain:_}].map(p=>{const v=h().context.audioContext.createBiquadFilter();return v.type=p.type,f.setParamValue(v.Q,1),v.frequency.value=p.f,f.setParamValue(v.gain,p.gain),v});g(y[0],y[y.length-1]),this.bands=y,this.bandsMap={};for(let p=0;p<this.bands.length;p++){const v=this.bands[p];p>0&&this.bands[p-1].connect(v),this.bandsMap[v.frequency.value]=v}}setGain(t,e=0){if(!this.bandsMap[t])throw new Error(`No band found for frequency ${t}`);f.setParamValue(this.bandsMap[t].gain,e)}getGain(t){if(!this.bandsMap[t])throw new Error(`No band found for frequency ${t}`);return this.bandsMap[t].gain.value}set f32(t){this.setGain(u.F32,t)}get f32(){return this.getGain(u.F32)}set f64(t){this.setGain(u.F64,t)}get f64(){return this.getGain(u.F64)}set f125(t){this.setGain(u.F125,t)}get f125(){return this.getGain(u.F125)}set f250(t){this.setGain(u.F250,t)}get f250(){return this.getGain(u.F250)}set f500(t){this.setGain(u.F500,t)}get f500(){return this.getGain(u.F500)}set f1k(t){this.setGain(u.F1K,t)}get f1k(){return this.getGain(u.F1K)}set f2k(t){this.setGain(u.F2K,t)}get f2k(){return this.getGain(u.F2K)}set f4k(t){this.setGain(u.F4K,t)}get f4k(){return this.getGain(u.F4K)}set f8k(t){this.setGain(u.F8K,t)}get f8k(){return this.getGain(u.F8K)}set f16k(t){this.setGain(u.F16K,t)}get f16k(){return this.getGain(u.F16K)}reset(){this.bands.forEach(t=>{f.setParamValue(t.gain,0)})}destroy(){this.bands.forEach(t=>{t.disconnect()}),this.bands=null,this.bandsMap=null}};let m=u;m.F32=32,m.F64=64,m.F125=125,m.F250=250,m.F500=500,m.F1K=1e3,m.F2K=2e3,m.F4K=4e3,m.F8K=8e3,m.F16K=16e3;let mt=class extends b{constructor(t=0){var e=(...n)=>{super(...n)};if(h().useLegacy){e(null);return}const{context:s}=h(),r=s.audioContext.createWaveShaper();e(r),this._distortion=r,this.amount=t}set amount(t){this._amount=t;const e=t*1e3,s=44100,r=new Float32Array(s),n=Math.PI/180;let o=0,a;for(;o<s;++o)a=o*2/s-1,r[o]=(3+e)*a*20*n/(Math.PI+e*Math.abs(a));this._distortion.curve=r,this._distortion.oversample="4x"}get amount(){return this._amount}destroy(){this._distortion=null,super.destroy()}},gt=class extends b{constructor(t=0){var e=(...a)=>{super(...a)};if(h().useLegacy){e(null);return}let s,r,n;const{audioContext:o}=h().context;o.createStereoPanner?(s=o.createStereoPanner(),n=s):(r=o.createPanner(),r.panningModel="equalpower",n=r),e(n),this._stereo=s,this._panner=r,this.pan=t}set pan(t){this._pan=t,this._stereo?f.setParamValue(this._stereo.pan,t):this._panner.setPosition(t,0,1-Math.abs(t))}get pan(){return this._pan}destroy(){super.destroy(),this._stereo=null,this._panner=null}},yt=class extends b{constructor(t=3,e=2,s=!1){var r=(...n)=>{super(...n)};if(h().useLegacy){r(null);return}r(null),this._seconds=this._clamp(t,1,50),this._decay=this._clamp(e,0,100),this._reverse=s,this._rebuild()}_clamp(t,e,s){return Math.min(s,Math.max(e,t))}get seconds(){return this._seconds}set seconds(t){this._seconds=this._clamp(t,1,50),this._rebuild()}get decay(){return this._decay}set decay(t){this._decay=this._clamp(t,0,100),this._rebuild()}get reverse(){return this._reverse}set reverse(t){this._reverse=t,this._rebuild()}_rebuild(){const t=h().context.audioContext,e=t.sampleRate,s=e*this._seconds,r=t.createBuffer(2,s,e),n=r.getChannelData(0),o=r.getChannelData(1);let a;for(let d=0;d<s;d++)a=this._reverse?s-d:d,n[d]=(Math.random()*2-1)*Math.pow(1-a/s,this._decay),o[d]=(Math.random()*2-1)*Math.pow(1-a/s,this._decay);const l=h().context.audioContext.createConvolver();l.buffer=r,this.init(l)}};class vt extends b{constructor(){var t=(...n)=>{super(...n)};if(h().useLegacy){t(null);return}const e=h().context.audioContext,s=e.createChannelSplitter(),r=e.createChannelMerger();r.connect(s),t(r,s),this._merger=r}destroy(){this._merger.disconnect(),this._merger=null,super.destroy()}}var bt=Object.freeze({__proto__:null,DistortionFilter:mt,EqualizerFilter:m,Filter:b,MonoFilter:vt,ReverbFilter:yt,StereoFilter:gt,StreamFilter:class extends b{constructor(){var t=(...n)=>{super(...n)};if(h().useLegacy){t(null);return}const e=h().context.audioContext,s=e.createMediaStreamDestination(),r=e.createMediaStreamSource(s.stream);t(s,r),this._stream=s.stream}get stream(){return this._stream}destroy(){this._stream=null,super.destroy()}},TelephoneFilter:class extends b{constructor(){if(h().useLegacy){super(null);return}const{audioContext:t}=h().context,e=t.createBiquadFilter(),s=t.createBiquadFilter(),r=t.createBiquadFilter(),n=t.createBiquadFilter();e.type="lowpass",f.setParamValue(e.frequency,2e3),s.type="lowpass",f.setParamValue(s.frequency,2e3),r.type="highpass",f.setParamValue(r.frequency,500),n.type="highpass",f.setParamValue(n.frequency,500),e.connect(s),s.connect(r),r.connect(n),super(e,n)}}}),xt=Object.freeze({__proto__:null,WebAudioContext:A,WebAudioInstance:B,WebAudioMedia:E,WebAudioNodes:L,WebAudioUtils:f});let Q=0;function Pt(i,t){const e=`alias${Q++}`;return h().add(e,{url:i,preload:!0,autoPlay:!0,loaded:s=>{s&&(console.error(s),h().remove(e),t&&t(s))},complete:()=>{h().remove(e),t&&t(null)}}),e}var wt=Object.defineProperty,W=Object.getOwnPropertySymbols,At=Object.prototype.hasOwnProperty,St=Object.prototype.propertyIsEnumerable,X=(i,t,e)=>t in i?wt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,Et=(i,t)=>{for(var e in t||(t={}))At.call(t,e)&&X(i,e,t[e]);if(W)for(var e of W(t))St.call(t,e)&&X(i,e,t[e]);return i};function Ft(i,t){const e=document.createElement("canvas");t=Et({width:512,height:128,fill:"black"},t||{}),e.width=t.width,e.height=t.height;const s=c.BaseTexture.from(e);if(!(i.media instanceof E))return s;const r=i.media;console.assert(!!r.buffer,"No buffer found, load first");const n=e.getContext("2d");n.fillStyle=t.fill;const o=r.buffer.getChannelData(0),a=Math.ceil(o.length/t.width),l=t.height/2;for(let d=0;d<t.width;d++){let _=1,g=-1;for(let y=0;y<a;y++){const p=o[d*a+y];p<_&&(_=p),p>g&&(g=p)}n.fillRect(d,(1+_)*l,1,Math.max(1,(g-_)*l))}return s}function $t(i=200,t=1){const e=P.from({singleInstance:!0});if(!(e.media instanceof E))return e;const s=e.media,r=e.context,n=1,o=48e3,a=2,l=r.audioContext.createBuffer(n,t*o,o),d=l.getChannelData(0);for(let _=0;_<d.length;_++){const g=_/l.sampleRate,y=i*g*Math.PI;d[_]=Math.sin(y)*a}return s.buffer=l,e.isLoaded=!0,e}var Ct=Object.freeze({__proto__:null,get PLAY_ID(){return Q},extensions:w,playOnce:Pt,render:Ft,sineTone:$t,supported:S,validateFormats:G}),Lt=Object.defineProperty,kt=Object.defineProperties,Ot=Object.getOwnPropertyDescriptors,Z=Object.getOwnPropertySymbols,Mt=Object.prototype.hasOwnProperty,It=Object.prototype.propertyIsEnumerable,Y=(i,t,e)=>t in i?Lt(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e,Tt=(i,t)=>{for(var e in t||(t={}))Mt.call(t,e)&&Y(i,e,t[e]);if(Z)for(var e of Z(t))It.call(t,e)&&Y(i,e,t[e]);return i},jt=(i,t)=>kt(i,Ot(t));const J=i=>{var t,e;const s=i.src;return(e=(t=i==null?void 0:i.alias)==null?void 0:t[0])!=null?e:c.utils.path.basename(s,c.utils.path.extname(s))},tt={extension:c.ExtensionType.Asset,detection:{test:async()=>!0,add:async i=>[...i,...w.filter(t=>S[t])],remove:async i=>i.filter(t=>i.includes(t))},loader:{extension:{type:[c.ExtensionType.LoadParser],priority:et.LoaderParserPriority.High},test(i){const t=c.utils.path.extname(i).slice(1);return!!S[t]},async load(i,t){const e=await new Promise((s,r)=>P.from(jt(Tt({},t.data),{url:i,preload:!0,loaded(n,o){var a,l;n?r(n):s(o),(l=(a=t.data)==null?void 0:a.loaded)==null||l.call(a,n,o)}})));return h().add(J(t),e),e},async unload(i,t){h().remove(J(t))}}};c.extensions.add(tt);const k=st(new z);return Object.defineProperties(k,{Filterable:{get(){return C}},filters:{get(){return bt}},htmlaudio:{get(){return ft}},Sound:{get(){return P}},SoundLibrary:{get(){return z}},SoundSprite:{get(){return I}},utils:{get(){return Ct}},webaudio:{get(){return xt}},sound:{get(){return k}},soundAsset:{get(){return tt}}}),k}(PIXI,PIXI);
//# sourceMappingURL=pixi-sound.js.map
