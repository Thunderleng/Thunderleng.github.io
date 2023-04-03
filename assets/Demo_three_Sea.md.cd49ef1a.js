import{_ as q,r as d,a as F,b as M,o as g,c as x,d as b,e as I}from"./app.a8de7744.js";import{S as D,C as l,W as O,s as T,P as k,M as G,a as R,B as j,b as A,V,c as H,A as L,d as N}from"./chunks/OrbitControls.da6d6442.js";const J={__name:"sea",setup(p){let e,r=d(null),u=d(null),n;function y(){n=new D,n.background=new l(15856375)}let t;function z(){t=new O({canvas:r.value}),t.alpha=!0,t.precision="mediump",t.outputEncoding=T,t.setPixelRatio(window.devicePixelRatio),t.setSize(window.innerWidth/2,window.innerHeight/2)}let i;function P(){i=new k(75,window.innerWidth/window.innerHeight,.1,1e4),i.position.set(10,10,10)}let s;function _(){s=new G(i,t.domElement)}let c;function S(){c=new R(16777215,1.2)}let v,o;function w(){const a={};a.depthColor="#0000ff",a.surfaceColor="#8888ff";let f=new j(10,.1,10,30);o=new A({vertexShader:`
    uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uSpeed;
varying float vElevation;


uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;
// \u67CF\u6797\u566A\u58F0
// Classic Perlin 3D Noise 
// by Stefan Gustavson
//
vec4 permute(vec4 x)
{
    return mod(((x*34.0)+1.0)*x, 289.0);
}
vec4 taylorInvSqrt(vec4 r)
{
    return 1.79284291400159 - 0.85373472095314 * r;
}
vec3 fade(vec3 t)
{
    return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
    return 2.2 * n_xyz;
}


void main()
{   
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // \u6CE2\u6D6A\u9AD8\u5EA6
    float elevation = sin(modelPosition.x * uBigWavesFrequency.x + uTime * uSpeed) * sin(modelPosition.z * uBigWavesFrequency.y + uTime * uSpeed) *uBigWavesElevation;
    for(float i = 1.0; i <= uSmallIterations; i++)
    {
        elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }
    modelPosition.y += elevation;

    // varyings
    vElevation = elevation;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;

}

`,fragmentShader:`
    uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;
varying float vElevation;




void main()
{
 float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
}`,uniforms:{uBigWavesElevation:{value:.2},uBigWavesFrequency:{value:new V(55,50)},uTime:{value:0},uSpeed:{value:1},uDepthColor:{value:new l(a.depthColor)},uSurfaceColor:{value:new l(a.surfaceColor)},uColorOffset:{value:.25},uColorMultiplier:{value:2},uSmallWavesElevation:{value:.15},uSmallWavesFrequency:{value:3},uSmallWavesSpeed:{value:.2},uSmallIterations:{value:4}}}),e.add(o.uniforms.uSmallWavesElevation,"value").min(0).max(1).step(.001).name("uSmallWavesElevation"),e.add(o.uniforms.uSmallWavesFrequency,"value").min(0).max(30).step(.001).name("uSmallWavesFrequency"),e.add(o.uniforms.uSmallWavesSpeed,"value").min(0).max(4).step(.001).name("uSmallWavesSpeed"),e.add(o.uniforms.uSmallIterations,"value").min(0).max(5).step(1).name("uSmallIterations");//! 片元着色器颜色控制
e.addColor(a,"depthColor").onChange(()=>{o.uniforms.uDepthColor.value.set(a.depthColor)}),e.addColor(a,"surfaceColor").onChange(()=>{o.uniforms.uSurfaceColor.value.set(a.surfaceColor)}),e.add(o.uniforms.uColorOffset,"value").min(0).max(1).step(.001).name("uColorOffset"),e.add(o.uniforms.uColorMultiplier,"value").min(0).max(10).step(.001).name("uColorMultiplier"),e.add(o.uniforms.uBigWavesElevation,"value").min(0).max(1).step(.001).name("uBigWavesElevation"),e.add(o.uniforms.uBigWavesFrequency.value,"x").min(0).max(100).step(.01).name("uBigWavesFrequencyX"),e.add(o.uniforms.uBigWavesFrequency.value,"y").min(0).max(100).step(.01).name("uBigWavesFrequencyY"),e.add(o.uniforms.uSpeed,"value").min(0).max(10).step(.01).name("uSpeed"),v=new H(f,o),n.add(v)}function C(){new L(100)}function h(){n.add(c),n.add(i)}const W=new N,E=()=>{const a=W.getElapsedTime();o.uniforms.uTime.value=a};function m(){requestAnimationFrame(m),t.render(n,i),s.update(),E()}F(()=>{M(()=>import("./chunks/dat.gui.module.3bd1c486.js"),[]).then(a=>{e=new a.GUI({width:400,autoPlace:!1}),console.log(e.domElement),u.value.appendChild(e.domElement),B()})});function B(){y(),z(),P(),_(),S(),w(),C(),h(),m(),console.log(n)}return(a,f)=>(g(),x("div",{class:"container",ref_key:"container",ref:u},[b("canvas",{ref_key:"draw",ref:r},null,512)],512))}},U=q(J,[["__scopeId","data-v-c167ea46"]]),K=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"Demo/three/Sea.md"}'),X={name:"Demo/three/Sea.md"},Q=Object.assign(X,{setup(p){return(e,r)=>(g(),x("div",null,[I(U)]))}});export{K as __pageData,Q as default};
