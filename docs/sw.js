if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,i,d)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const a={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return r;case"module":return a;default:return e(s)}}))).then((e=>{const s=d(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-7ce2238d"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.1b7c921c.js",revision:"2ba1203bc14d8805aa495bd09dd72c12"},{url:"assets/index.1b9f6179.css",revision:"6988b5a465e30c6b534c1d29c2f93b7d"},{url:"assets/index.309add05.js",revision:"90b31aa2b327c880ad85fed935ed6442"},{url:"assets/index.4eee9d78.css",revision:"377a646bb4953d38d179b081548d84ea"},{url:"assets/index.53a18006.css",revision:"7952d3f3bb3b9808bea129d1406e687e"},{url:"assets/index.864ee22c.js",revision:"cf17422d009ebfe27781b4aaa5a3cec9"},{url:"assets/index.8ab4ecde.js",revision:"de06100e78715379c899e2fc7ec94af7"},{url:"assets/index.b11c90b9.js",revision:"fcb0eb2454b34ba64e0c607e5ab844f3"},{url:"assets/index.d71a04ef.js",revision:"1010eea0129121c6e63eed9fabf1baec"},{url:"assets/index.e3cf8701.js",revision:"2ba1203bc14d8805aa495bd09dd72c12"},{url:"assets/index.fa443e84.js",revision:"9aa80b1f0c668d2def5da21f416b7702"},{url:"assets/vendor.19e634b2.js",revision:"a25265b3d72bbd26e7070823ac41b473"},{url:"assets/vendor.a4fa4a0b.js",revision:"0602c3fe721c4e18790c8b8a1e9cc053"},{url:"index.html",revision:"1d498de76f248c8b7a34e29b37479cbe"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"192x192.png",revision:"838be5f866a77f3c2ced9cbcf664e02d"},{url:"180x180.png",revision:"bdaf880d00448f28c65d132493f58e94"},{url:"512x512.png",revision:"9a17c9283f78df6c81dd54c3a070646f"},{url:"manifest.webmanifest",revision:"2d9d4c70ae4792493ec302d86479583e"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
