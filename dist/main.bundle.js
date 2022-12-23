(()=>{"use strict";const t=(t,e)=>{let i=null;return"string"==typeof t&&(i=document.createElement(t),"string"==typeof e&&e.split(" ").forEach((t=>i.classList.add(t)))),i},e=(...t)=>{const e=/^\w+$/,i={};return t instanceof Array&&t.forEach((t=>{if(!e.test(`${t}`))throw Error(`${t} contains a character that is not allowed.`);i[`${t}`]=Symbol(`${t}`)})),i.has=t=>Object.values(i).includes(t),Object.freeze({...i})},i=class{static MIN=0;static MAX=1e5;#t;#e;#i;#s=()=>{this.#i<this.#t&&(this.#i=this.#t)};#n=()=>{this.#i>this.#e&&(this.#i=this.#e)};constructor({min:t,now:e,max:s}={}){this.#t=i.MIN,this.#i=i.MAX,this.#e=i.MAX,this.minimum=t,this.maximum=s,this.current=e}get current(){return this.#i}set current(t){Number.isFinite(t)&&(this.#i=t,this.#n(),this.#s())}get maximum(){return this.#e}set maximum(t){Number.isFinite(t)&&t>this.#t&&t<=i.MAX&&(this.#e=t,this.#n())}get minimum(){return this.#t}set minimum(t){Number.isFinite(t)&&t<this.#e&&t>=i.MIN&&(this.#t=t,this.#s())}},s=i,n=class{static Type=e("NONE","BAR","TRAIT","ABILITY");#r;#a;#o;#c;constructor({id:t,type:e,name:i,description:s}={}){if(!("string"==typeof t&&t.length>0))throw new Error('Missing parameter. "id" is required');this.#r=t,this.#a=n.Type.has(e)?e:n.Type.NONE,this.#o="string"==typeof i&&i.length>0?i:"",this.#c="string"==typeof i&&s.length>0?s:""}getDescription(){return this.#c}getId(){return this.#r}getName(){return this.#o}getType(){return this.#a}},r=n,a=t=>Math.round(t),o=t=>t<10?"0":"",c=class extends r{static RATE_DEFAULT=1;#l;#u;constructor({id:t="Bar",name:e,description:i,value:n,rate:a}={}){super({id:t,type:r.Type.BAR,name:e,description:i}),this.#l=new s(n),this.#u=new s(a||{min:0,now:c.RATE_DEFAULT,max:c.RATE_DEFAULT})}increase(t){Number.isFinite(t)&&(this.#l.current=a(this.#l.current+t*this.#u.current))}decrease(t){if(Number.isFinite(t)){let e=this.#u.maximum-this.#u.current;0===e&&(e=c.RATE_DEFAULT),console.log(t,this.#l.current,e),this.#l.current=a(this.#l.current-t*e)}}getValue(){return this.#l.current}},l=c,u=class{static Type=e("NONE","RESOURCE","AGENT");constructor({x:t,y:e,type:i,mass:s}){this.type=u.Type.has(i)?i:u.Type.NONE,this.position=Number.isFinite(t)&&Number.isFinite(e)?{x:t,y:e}:{x:0,y:0},this.velocity={x:0,y:0},this.props={},s instanceof l&&(this.props.mass=s),this.target=null,this.threat=null,this.isHighlighted=!1}},p=u,d=class extends p{static Type=e("NONE","ANORGANIC","ORGANIC1","ORGANIC2");#a;constructor({x:t,y:e,mass:i,type:s}){super({x:t,y:e,type:p.Type.RESOURCE,mass:i}),this.#a=d.Type.has(s)?s:d.Type.NONE}update(t){}draw(t){t.lineStyle(2,16706423,1),t.beginFill(6621786),t.drawRect(this.position.x,this.position.y,50,50),t.endFill()}},h=d;let m=null;const y=t=>{if(t instanceof h){const e=new PIXI.Graphics;t.draw(e),m instanceof PIXI.Application&&e instanceof PIXI.DisplayObject&&m.stage.addChild(e)}},g=new class{#p=new s({min:.125,now:2,max:1024});get speedMultiplier(){return this.#p.current}set speedMultiplier(t){this.#p.current=t}get speedMultiplierMin(){return this.#p.minimum}set speedMultiplierMin(t){this.#p.minimum=t}get speedMultiplierMax(){return this.#p.maximum}set speedMultiplierMax(t){this.#p.maximum=t}},M=new class{#d={width:1024,height:768};#h=0;#m=1;#y=!1;#g=[];#M=[];get timePassed(){return this.#h}set timePassed(t){Number.isFinite(t)&&(this.#h=t)}get speedFactor(){return this.#m}set speedFactor(t){Number.isFinite(t)&&t<g.speedMultiplierMax&&t>g.speedMultiplierMin&&(this.#m=t)}get isRunning(){return this.#y}set isRunning(t){"boolean"==typeof t&&(this.#y=t)}getWorldAttributes(){return this.#d}addResource(t){t instanceof h&&this.#g.push(t)}getResources(){return this.#g}},w=t("div","Renderer Sci-Fi-Border"),N=t("button","Icon Play icon-play3"),x=t("button","Icon icon-pause2");x.style.display="none";const A=t("button","Icon icon-backward2"),F=t("button","Icon icon-forward3"),b=t("span","SpeedFactor");b.textContent=M.speedFactor;const I=t("span","TimePassed");I.textContent="00:00:00.00";const f=t("button","Icon Fullscreen icon-enlarge");N.addEventListener("click",(()=>{N.style.display="none",x.style.display="block",m instanceof PIXI.Application&&!m.ticker.started&&m.start()})),x.addEventListener("click",(()=>{x.style.display="none",N.style.display="block",m instanceof PIXI.Application&&m.ticker.started&&m.stop()})),F.addEventListener("click",(()=>{const t=M.speedFactor*g.speedMultiplier;M.speedFactor=t,b.textContent=t})),A.addEventListener("click",(()=>{const t=M.speedFactor/g.speedMultiplier;M.speedFactor=t,b.textContent=t}));const v=t("div","Controls Sci-Fi-Border");v.append(A,N,x,F,b,I,f);const E=t("div","Visualization");E.append(w,v);const T=t("button","Icon Active icon-stats-bars"),R=t("button","Icon icon-equalizer"),P=t("button","Icon icon-enter"),k=t("div","Menu Sci-Fi-Border");k.append(T,R,P);const C=t("div","Panel Active"),O=t("div","Panel"),$=t("div","PanelGroup Sci-Fi-Border");$.append(C,O);const L=t("div","Evaluation");L.append(k,$);const S=t("div","GUI Maximize");S.append(E,L),document.body.appendChild(S);let X=null;const B=(t=null,e=null)=>{(()=>{if(!(X instanceof Function))throw new Error("Random number generator not initiated")})();const i=X();return Number.isFinite(t)&&Number.isFinite(e)?t+i*(e-t):i};(t=>{let e="undefined";0===e.length&&(e=`${Math.random()}`);const i=(t=>{let e=1779033703^t.length;for(let i=0;i<t.length;i+=1)e=Math.imul(e^t.charCodeAt(i),3432918353),e=e<<13|e>>>19;return()=>(e=Math.imul(e^e>>>16,2246822507),e=Math.imul(e^e>>>13,3266489909),e^=e>>>16,e>>>0)})(e);var s,n,r,a;s=i(),n=i(),r=i(),a=i(),X=()=>{const t=n<<9;let e=5*s;return e=9*(e<<7|e>>>25),a^=n,n^=r^=s,s^=a,r^=t,a=a<<11|a>>>21,(e>>>0)/4294967296}})();const G=M.getWorldAttributes();var D,U,z;(D=w)instanceof HTMLDivElement&&(m=new PIXI.Application({resizeTo:D,autoStart:!1}),Number.isFinite(U),D.appendChild(m.view));for(let t=0;t<100;t+=1){const t=new h({x:B(20,G.width-20),y:B(20,G.height-20),type:h.Type.ANORGANIC,mass:new s({min:0,now:20,max:100})});M.addResource(t),y(t)}z=t=>{(t=>{let e=M.timePassed;e+=M.speedFactor*t,M.timePassed=e,(()=>{const t=(t=>{const e=t/1e3,i=`${o(e%60)}${(e%60).toFixed(2)}`,s=e/60,n=`${o(s%60)}${Math.floor(s%60)}`,r=s/60;return`${o(r%24)}${Math.floor(r%24)}:${n}:${i}`})(M.timePassed);I.textContent=t})()})(t)},m instanceof PIXI.Application&&z instanceof Function&&m.ticker.add((()=>z(m.ticker.deltaMS)))})();