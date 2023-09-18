<!--
 * @Author: Thundercold~ thunderleng@gmail.com
 * @Date: 2023-03-07 15:30:04
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-20 20:17:13
 * @FilePath: \NotesThunder\components\three\sea.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div  class="container" ref="container">
    <canvas ref="draw"></canvas>
  </div>
</template>

<script setup>
// 引入three
import * as THREE from "three";
import { onMounted, ref } from "vue";
import { MapControls } from "three/addons/controls/OrbitControls.js";
// gui
let gui
// 获取canvas实例
let draw = ref(null);
let container=ref(null);
// 声明初始化变量
// 场景
let scene;
// 初始化场景
function initScene() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf1f2f7);
}

// 渲染器，
let renderer;
// 初始化渲染器
function initRender() {
  renderer = new THREE.WebGLRenderer({
    canvas: draw.value,
  });
  renderer.alpha = true;
  renderer.precision = "mediump"; //着色器的精度。可以是"highp", "mediump" 或 "lowp". 默认为"highp"，如果设备支持的话
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth/2, window.innerHeight/2);
}
// 相机
let camera;
// 初始化相机
function initCamera() {
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
  );
  camera.position.set(10, 10, 10);
}
// 控制器
let controls;
function initControls() {
  controls = new MapControls(camera, renderer.domElement); //用户交互
}

//  !!实物初始化
// 光源
let light;
function initLight() {
  light = new THREE.PointLight(0xffffff, 1.2);
}

// 物体
let water;
let waterMaterial;
function initWater() {
  // 颜色
  const debugObject = {};
  // Colors
  debugObject.depthColor = "#0000ff";
  debugObject.surfaceColor = "#8888ff";

  let waterGeometry = new THREE.BoxGeometry(10, 0.1, 10, 30);
  waterMaterial = new THREE.ShaderMaterial({
    vertexShader: `
    uniform float uBigWavesElevation;
uniform vec2 uBigWavesFrequency;
uniform float uTime;
uniform float uSpeed;
varying float vElevation;


uniform float uSmallWavesElevation;
uniform float uSmallWavesFrequency;
uniform float uSmallWavesSpeed;
uniform float uSmallIterations;
// 柏林噪声
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

    // 波浪高度
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

`,
    fragmentShader: `
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
}`,
    uniforms: {
      uBigWavesElevation: { value: 0.2 },
      uBigWavesFrequency: { value: new THREE.Vector2(55, 50) },
      uTime: { value: 0 },
      uSpeed: { value: 1 },
      uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
      uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
      uColorOffset: { value: 0.25 },
      uColorMultiplier: { value: 2 },
      uSmallWavesElevation: { value: 0.15 },
      uSmallWavesFrequency: { value: 3 },
      uSmallWavesSpeed: { value: 0.2 },
      uSmallIterations: { value: 4 },
    },
  });
  // 小波纹控制
  gui
    .add(waterMaterial.uniforms.uSmallWavesElevation, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uSmallWavesElevation");
  gui
    .add(waterMaterial.uniforms.uSmallWavesFrequency, "value")
    .min(0)
    .max(30)
    .step(0.001)
    .name("uSmallWavesFrequency");
  gui
    .add(waterMaterial.uniforms.uSmallWavesSpeed, "value")
    .min(0)
    .max(4)
    .step(0.001)
    .name("uSmallWavesSpeed");
  gui
    .add(waterMaterial.uniforms.uSmallIterations, "value")
    .min(0)
    .max(5)
    .step(1)
    .name("uSmallIterations");
  // 调试面板
  //! 片元着色器颜色控制
  gui.addColor(debugObject, "depthColor").onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor);
  });
  gui.addColor(debugObject, "surfaceColor").onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObject.surfaceColor);
  });
  gui
    .add(waterMaterial.uniforms.uColorOffset, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uColorOffset");
  gui
    .add(waterMaterial.uniforms.uColorMultiplier, "value")
    .min(0)
    .max(10)
    .step(0.001)
    .name("uColorMultiplier");
  // 顶点着色器
  gui
    .add(waterMaterial.uniforms.uBigWavesElevation, "value")
    .min(0)
    .max(1)
    .step(0.001)
    .name("uBigWavesElevation");
  gui
    .add(waterMaterial.uniforms.uBigWavesFrequency.value, "x")
    .min(0)
    .max(100)
    .step(0.01)
    .name("uBigWavesFrequencyX");
  gui
    .add(waterMaterial.uniforms.uBigWavesFrequency.value, "y")
    .min(0)
    .max(100)
    .step(0.01)
    .name("uBigWavesFrequencyY");
  gui
    .add(waterMaterial.uniforms.uSpeed, "value")
    .min(0)
    .max(10)
    .step(0.01)
    .name("uSpeed");

  water = new THREE.Mesh(waterGeometry, waterMaterial);

  scene.add(water);
}
// 辅助线
let axesHelper;
function initAxesHelper() {
  axesHelper = new THREE.AxesHelper(100);
}
// 添加实物
function addMesh() {
  scene.add(light);
  scene.add(camera);
  // scene.add(axesHelper);
}
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // Water
  waterMaterial.uniforms.uTime.value = elapsedTime;

  // ...
};
//   动画
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
  tick();
}

onMounted(() => {

  import('dat.gui').then((dat) => {
    gui = new dat.GUI({ width: 400,autoPlace: false });
    container.value.appendChild(gui.domElement);
  init();
    // use code
  })
  
 
  // initSocket()
});
// 初始化启动
function init() {
  initScene();
  initRender();
  initCamera();
  initControls();
  initLight();
  initWater();
  // initSea()
  initAxesHelper();
  addMesh();
  animate();
  console.log(scene);
}
</script>

<style lang="scss" scoped>
</style>
