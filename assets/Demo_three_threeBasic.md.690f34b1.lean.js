import{S as C,C as P,W as b,s as H,P as R,M as S,a as k,B as A,e as E,c as W,A as y}from"./chunks/OrbitControls.da6d6442.js";import{r as D,a as G,o as f,c as u,b as L,d as N}from"./app.f6821d81.js";const O={__name:"basic",setup(m){let a=D(null),e;function p(){e=new C,e.background=new P(15856375)}let n;function w(){n=new b({canvas:a.value}),n.alpha=!0,n.precision="mediump",n.outputEncoding=H,n.setPixelRatio(window.devicePixelRatio),n.setSize(window.innerWidth/2,window.innerHeight/2)}let t;function h(){t=new R(75,window.innerWidth/window.innerHeight,.1,1e3),t.position.set(400,200,0)}let i;function _(){i=new S(t,n.domElement)}let o;function g(){o=new k(16777215,1.2)}let r;function x(){const d=new A(100,100,100),l=new E({color:16775065});r=new W(d,l)}let s;function B(){s=new y(100)}function v(){e.add(o),e.add(t),e.add(r),e.add(s)}function c(){requestAnimationFrame(c),n.render(e,t),i.update()}G(()=>{M()});function M(){p(),w(),h(),_(),g(),x(),B(),v(),c(),console.log(e)}return(d,l)=>(f(),u("div",null,[L("canvas",{ref_key:"draw",ref:a},null,512)]))}},z=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Demo/three/threeBasic.md"}'),V={name:"Demo/three/threeBasic.md"},F=Object.assign(V,{setup(m){return(a,e)=>(f(),u("div",null,[N(O)]))}});export{z as __pageData,F as default};