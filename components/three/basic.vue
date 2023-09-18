<!--
 * @Author: Thundercold~ thunderleng@gmail.com
 * @Date: 2023-03-07 15:30:04
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-21 16:37:01
 * @FilePath: \NotesThunder\components\three\basic.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div>
      <canvas ref="draw"></canvas>
    </div>
  </template>
  
  <script  setup>
  
  // 引入three
  import * as THREE from "three";
  import { onMounted,ref } from "vue";
  import { MapControls } from "three/addons/controls/OrbitControls.js";
  // 获取canvas实例
  let draw=ref(null)
  // 声明初始化变量
  // 场景
  let scene
  // 初始化场景
  function initScene(){
  scene=new THREE.Scene()
  scene.background = new THREE.Color(0xf1f2f7);
  }
  
  // 渲染器，
  let renderer
  // 初始化渲染器
  function initRender(){
    renderer= new THREE.WebGLRenderer({
      canvas:draw.value
    })
    renderer.alpha = true;
    renderer.precision = 'mediump'  //着色器的精度。可以是"highp", "mediump" 或 "lowp". 默认为"highp"，如果设备支持的话
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
  }
  // 相机
  let camera
  // 初始化相机
  function initCamera(){
    camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set( 400, 200, 0 );
  
  }
  // 控制器
  let controls
  function initControls(){
    controls = new MapControls(camera, renderer.domElement); //用户交互
  }
  
  //  !!实物初始化
  // 光源
  let light
  function initLight(){
    light = new THREE.PointLight(0xffffff, 1.2);
  }
  // 物体
  let mesh
  function initMesh(){
    const geometry = new THREE.BoxGeometry( 100, 100, 100 );
  const material = new THREE.MeshBasicMaterial( { color: 0xfff799 } );
  mesh = new THREE.Mesh( geometry, material );
  }
  // 辅助线
  let axesHelper
  function initAxesHelper(){
    axesHelper =new THREE.AxesHelper(100);
  }
  // 添加实物
  function addMesh(){
    scene.add(light)
    scene.add(camera)
    scene.add(mesh) 
    scene.add(axesHelper)
  }
  
  //   动画
  function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene,camera);
    controls.update()
  }
  onMounted(()=>{
    init()
    // initSocket()
  })
  // 初始化启动
  function init(){
    initScene()
    initRender()
    initCamera()
    initControls()
    initLight()
    initMesh()
    initAxesHelper()
    addMesh()
    animate()
    console.log(scene);
  }
  
  
  
  
  
  
  // websocket连接
  // var ws = new WebSocket("ws://localhost:9600/");
  function initSocket() {
    ws.onopen = function () {
      console.log('连接成功');
      ws.send("web端")
      ws.onmessage = function (message) {
        console.log(message.data);
          };
    }
  }
  
  
  </script>
  
  <style lang="scss" scoped></style>