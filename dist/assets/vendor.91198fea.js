/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B,k;const M=globalThis.trustedTypes,Q=M?M.createPolicy("lit-html",{createHTML:n=>n}):void 0,f=`lit$${(Math.random()+"").slice(9)}$`,L="?"+f,At=`<${L}>`,b=document,T=(n="")=>b.createComment(n),x=n=>n===null||typeof n!="object"&&typeof n!="function",Y=Array.isArray,G=n=>{var t;return Y(n)||typeof((t=n)===null||t===void 0?void 0:t[Symbol.iterator])=="function"},U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,X=/-->/g,tt=/>/g,g=/>|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,et=/'/g,st=/"/g,it=/^(?:script|style|textarea)$/i,ft=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),Pt=ft(1),m=Symbol.for("lit-noChange"),_=Symbol.for("lit-nothing"),nt=new WeakMap,gt=(n,t,e)=>{var s,i;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=o._$litPart$;if(r===void 0){const a=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=r=new C(t.insertBefore(T(),a),a,void 0,e!=null?e:{})}return r._$AI(n),r},S=b.createTreeWalker(b,129,null,!1),ot=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":"",r=U;for(let h=0;h<e;h++){const l=n[h];let p,c,d=-1,u=0;for(;u<l.length&&(r.lastIndex=u,c=r.exec(l),c!==null);)u=r.lastIndex,r===U?c[1]==="!--"?r=X:c[1]!==void 0?r=tt:c[2]!==void 0?(it.test(c[2])&&(i=RegExp("</"+c[2],"g")),r=g):c[3]!==void 0&&(r=g):r===g?c[0]===">"?(r=i!=null?i:U,d=-1):c[1]===void 0?d=-2:(d=r.lastIndex-c[2].length,p=c[1],r=c[3]===void 0?g:c[3]==='"'?st:et):r===st||r===et?r=g:r===X||r===tt?r=U:(r=g,i=void 0);const $=r===g&&n[h+1].startsWith("/>")?" ":"";o+=r===U?l+At:d>=0?(s.push(p),l.slice(0,d)+"$lit$"+l.slice(d)+f+$):l+f+(d===-2?(s.push(void 0),h):$)}const a=o+(n[e]||"<?>")+(t===2?"</svg>":"");return[Q!==void 0?Q.createHTML(a):a,s]};class P{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const a=t.length-1,h=this.parts,[l,p]=ot(t,e);if(this.el=P.createElement(l,s),S.currentNode=this.el.content,e===2){const c=this.el.content,d=c.firstChild;d.remove(),c.append(...d.childNodes)}for(;(i=S.nextNode())!==null&&h.length<a;){if(i.nodeType===1){if(i.hasAttributes()){const c=[];for(const d of i.getAttributeNames())if(d.endsWith("$lit$")||d.startsWith(f)){const u=p[r++];if(c.push(d),u!==void 0){const $=i.getAttribute(u.toLowerCase()+"$lit$").split(f),v=/([.?@])?(.*)/.exec(u);h.push({type:1,index:o,name:v[2],strings:$,ctor:v[1]==="."?lt:v[1]==="?"?ht:v[1]==="@"?at:H})}else h.push({type:6,index:o})}for(const d of c)i.removeAttribute(d)}if(it.test(i.tagName)){const c=i.textContent.split(f),d=c.length-1;if(d>0){i.textContent=M?M.emptyScript:"";for(let u=0;u<d;u++)i.append(c[u],T()),S.nextNode(),h.push({type:2,index:++o});i.append(c[d],T())}}}else if(i.nodeType===8)if(i.data===L)h.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf(f,c+1))!==-1;)h.push({type:7,index:o}),c+=f.length-1}o++}}static createElement(t,e){const s=b.createElement("template");return s.innerHTML=t,s}}function y(n,t,e=n,s){var i,o,r,a;if(t===m)return t;let h=s!==void 0?(i=e._$Cl)===null||i===void 0?void 0:i[s]:e._$Cu;const l=x(t)?void 0:t._$litDirective$;return(h==null?void 0:h.constructor)!==l&&((o=h==null?void 0:h._$AO)===null||o===void 0||o.call(h,!1),l===void 0?h=void 0:(h=new l(n),h._$AT(n,e,s)),s!==void 0?((r=(a=e)._$Cl)!==null&&r!==void 0?r:a._$Cl=[])[s]=h:e._$Cu=h),h!==void 0&&(t=y(n,h._$AS(n,t.values),h,s)),t}class rt{constructor(t,e){this.v=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}p(t){var e;const{el:{content:s},parts:i}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:b).importNode(s,!0);S.currentNode=o;let r=S.nextNode(),a=0,h=0,l=i[0];for(;l!==void 0;){if(a===l.index){let p;l.type===2?p=new C(r,r.nextSibling,this,t):l.type===1?p=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(p=new dt(r,this,t)),this.v.push(p),l=i[++h]}a!==(l==null?void 0:l.index)&&(r=S.nextNode(),a++)}return o}m(t){let e=0;for(const s of this.v)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class C{constructor(t,e,s,i){var o;this.type=2,this._$AH=_,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cg=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cg}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&t.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=y(this,t,e),x(t)?t===_||t==null||t===""?(this._$AH!==_&&this._$AR(),this._$AH=_):t!==this._$AH&&t!==m&&this.$(t):t._$litType$!==void 0?this.T(t):t.nodeType!==void 0?this.S(t):G(t)?this.M(t):this.$(t)}A(t,e=this._$AB){return this._$AA.parentNode.insertBefore(t,e)}S(t){this._$AH!==t&&(this._$AR(),this._$AH=this.A(t))}$(t){this._$AH!==_&&x(this._$AH)?this._$AA.nextSibling.data=t:this.S(b.createTextNode(t)),this._$AH=t}T(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=P.createElement(i.h,this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.m(s);else{const r=new rt(o,this),a=r.p(this.options);r.m(s),this.S(a),this._$AH=r}}_$AC(t){let e=nt.get(t.strings);return e===void 0&&nt.set(t.strings,e=new P(t)),e}M(t){Y(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new C(this.A(T()),this.A(T()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cg=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class H{constructor(t,e,s,i,o){this.type=1,this._$AH=_,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=_}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=y(this,t,e,0),r=!x(t)||t!==this._$AH&&t!==m,r&&(this._$AH=t);else{const a=t;let h,l;for(t=o[0],h=0;h<o.length-1;h++)l=y(this,a[s+h],e,h),l===m&&(l=this._$AH[h]),r||(r=!x(l)||l!==this._$AH[h]),l===_?t=_:t!==_&&(t+=(l!=null?l:"")+o[h+1]),this._$AH[h]=l}r&&!i&&this.k(t)}k(t){t===_?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t!=null?t:"")}}class lt extends H{constructor(){super(...arguments),this.type=3}k(t){this.element[this.name]=t===_?void 0:t}}class ht extends H{constructor(){super(...arguments),this.type=4}k(t){t&&t!==_?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name)}}class at extends H{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=y(this,t,e,0))!==null&&s!==void 0?s:_)===m)return;const i=this._$AH,o=t===_&&i!==_||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==_&&(i===_||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class dt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){y(this,t)}}const mt={P:"$lit$",V:f,L,I:1,N:ot,R:rt,D:G,j:y,H:C,O:H,F:ht,B:at,W:lt,Z:dt};(B=globalThis.litHtmlPolyfillSupport)===null||B===void 0||B.call(globalThis,P,C),((k=globalThis.litHtmlVersions)!==null&&k!==void 0?k:globalThis.litHtmlVersions=[]).push("2.0.0");/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{H:yt}=mt,ct=()=>document.createComment(""),N=(n,t,e)=>{var s;const i=n._$AA.parentNode,o=t===void 0?n._$AB:t._$AA;if(e===void 0){const r=i.insertBefore(ct(),o),a=i.insertBefore(ct(),o);e=new yt(r,a,n,n.options)}else{const r=e._$AB.nextSibling,a=e._$AM,h=a!==n;if(h){let l;(s=e._$AQ)===null||s===void 0||s.call(e,n),e._$AM=n,e._$AP!==void 0&&(l=n._$AU)!==a._$AU&&e._$AP(l)}if(r!==o||h){let l=e._$AA;for(;l!==r;){const p=l.nextSibling;i.insertBefore(l,o),l=p}}}return e},E=(n,t,e=n)=>(n._$AI(t,e),n),Et={},bt=(n,t=Et)=>n._$AH=t,St=n=>n._$AH,I=n=>{var t;(t=n._$AP)===null||t===void 0||t.call(n,!1,!0);let e=n._$AA;const s=n._$AB.nextSibling;for(;e!==s;){const i=e.nextSibling;e.remove(),e=i}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ct={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},wt=n=>(...t)=>({_$litDirective$:n,values:t});class Tt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=window.ShadowRoot&&(window.ShadyCSS===void 0||window.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,z=Symbol(),ut=new Map;class $t{constructor(t,e){if(this._$cssResult$=!0,e!==z)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){let t=ut.get(this.cssText);return D&&t===void 0&&(ut.set(this.cssText,t=new CSSStyleSheet),t.replaceSync(this.cssText)),t}toString(){return this.cssText}}const xt=n=>new $t(typeof n=="string"?n:n+"",z),Ht=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new $t(e,z)},Ut=(n,t)=>{D?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=window.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},pt=D?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return xt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var j,V;const W={toAttribute(n,t){switch(t){case Boolean:n=n?"":null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch(s){e=null}}return e}},vt=(n,t)=>t!==n&&(t==t||n==n),q={attribute:!0,type:String,converter:W,reflect:!1,hasChanged:vt};class w extends HTMLElement{constructor(){super(),this._$Et=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Ei=null,this.o()}static addInitializer(t){var e;(e=this.l)!==null&&e!==void 0||(this.l=[]),this.l.push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Eh(s,e);i!==void 0&&(this._$Eu.set(i,s),t.push(i))}),t}static createProperty(t,e=q){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||q}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),this.elementProperties=new Map(t.elementProperties),this._$Eu=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(pt(i))}else t!==void 0&&e.push(pt(t));return e}static _$Eh(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}o(){var t;this._$Ev=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Ep(),this.requestUpdate(),(t=this.constructor.l)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$Em)!==null&&e!==void 0?e:this._$Em=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$Em)===null||e===void 0||e.splice(this._$Em.indexOf(t)>>>0,1)}_$Ep(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Et.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Ut(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$Em)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$Em)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$Eg(t,e,s=q){var i,o;const r=this.constructor._$Eh(t,s);if(r!==void 0&&s.reflect===!0){const a=((o=(i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==null&&o!==void 0?o:W.toAttribute)(e,s.type);this._$Ei=t,a==null?this.removeAttribute(r):this.setAttribute(r,a),this._$Ei=null}}_$AK(t,e){var s,i,o;const r=this.constructor,a=r._$Eu.get(t);if(a!==void 0&&this._$Ei!==a){const h=r.getPropertyOptions(a),l=h.converter,p=(o=(i=(s=l)===null||s===void 0?void 0:s.fromAttribute)!==null&&i!==void 0?i:typeof l=="function"?l:null)!==null&&o!==void 0?o:W.fromAttribute;this._$Ei=a,this[a]=p(e,h.type),this._$Ei=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||vt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Ei!==t&&(this._$ES===void 0&&(this._$ES=new Map),this._$ES.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$Ev=this._$EC())}async _$EC(){this.isUpdatePending=!0;try{await this._$Ev}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Et&&(this._$Et.forEach((i,o)=>this[o]=i),this._$Et=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$Em)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(s)):this._$ET()}catch(i){throw e=!1,this._$ET(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$Em)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Ev}shouldUpdate(t){return!0}update(t){this._$ES!==void 0&&(this._$ES.forEach((e,s)=>this._$Eg(s,this[s],e)),this._$ES=void 0),this._$ET()}updated(t){}firstUpdated(t){}}w.finalized=!0,w.elementProperties=new Map,w.elementStyles=[],w.shadowRootOptions={mode:"open"},(j=globalThis.reactiveElementPolyfillSupport)===null||j===void 0||j.call(globalThis,{ReactiveElement:w}),((V=globalThis.reactiveElementVersions)!==null&&V!==void 0?V:globalThis.reactiveElementVersions=[]).push("1.0.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Z,J,K;class R extends w{constructor(){super(...arguments),this.renderOptions={host:this},this._$Dt=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Dt=gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Dt)===null||t===void 0||t.setConnected(!1)}render(){return m}}R.finalized=!0,R._$litElement$=!0,(Z=globalThis.litElementHydrateSupport)===null||Z===void 0||Z.call(globalThis,{LitElement:R}),(J=globalThis.litElementPolyfillSupport)===null||J===void 0||J.call(globalThis,{LitElement:R});((K=globalThis.litElementVersions)!==null&&K!==void 0?K:globalThis.litElementVersions=[]).push("3.0.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const _t=(n,t,e)=>{const s=new Map;for(let i=t;i<=e;i++)s.set(n[i],i);return s},Nt=wt(class extends Tt{constructor(n){if(super(n),n.type!==Ct.CHILD)throw Error("repeat() can only be used in text expressions")}dt(n,t,e){let s;e===void 0?e=t:t!==void 0&&(s=t);const i=[],o=[];let r=0;for(const a of n)i[r]=s?s(a,r):r,o[r]=e(a,r),r++;return{values:o,keys:i}}render(n,t,e){return this.dt(n,t,e).values}update(n,[t,e,s]){var i;const o=St(n),{values:r,keys:a}=this.dt(t,e,s);if(!Array.isArray(o))return this.ct=a,r;const h=(i=this.ct)!==null&&i!==void 0?i:this.ct=[],l=[];let p,c,d=0,u=o.length-1,$=0,v=r.length-1;for(;d<=u&&$<=v;)if(o[d]===null)d++;else if(o[u]===null)u--;else if(h[d]===a[$])l[$]=E(o[d],r[$]),d++,$++;else if(h[u]===a[v])l[v]=E(o[u],r[v]),u--,v--;else if(h[d]===a[v])l[v]=E(o[d],r[v]),N(n,l[v+1],o[d]),d++,v--;else if(h[u]===a[$])l[$]=E(o[u],r[$]),N(n,o[d],o[u]),u--,$++;else if(p===void 0&&(p=_t(a,$,v),c=_t(h,d,u)),p.has(h[d]))if(p.has(h[u])){const A=c.get(a[$]),O=A!==void 0?o[A]:null;if(O===null){const F=N(n,o[d]);E(F,r[$]),l[$]=F}else l[$]=E(O,r[$]),N(n,o[d],O),o[A]=null;$++}else I(o[u]),u--;else I(o[d]),d++;for(;$<=v;){const A=N(n,l[v+1]);E(A,r[$]),l[$++]=A}for(;d<=u;){const A=o[d++];A!==null&&I(A)}return this.ct=a,bt(n,l),m}});export{Nt as c,R as n,Ht as r,Pt as y};