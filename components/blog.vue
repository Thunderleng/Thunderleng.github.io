<!--
 * @Date: 2023-04-20 17:53:12
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-20 20:36:39
 * @FilePath: \NotesThunder\components\blog.vue
-->
<template>
    <div class="gitalk-container">
      <div id="gitalk-container"></div>
      <children />
    </div>
  </template>
  <script>
  import md5 from "md5"
  import Gitalk from "gitalk"
  import "gitalk/dist/gitalk.css"
  export default {
    name: "git-talk",
    data() {
      return {}
    },
    mounted() {
      const commentConfig = {
        clientID: "9aa567ccb4b614e326d1",
        clientSecret: "65dee9d17a99ccfbf9cdb179805be797c094004c",
        repo: "Blog-vue",
        owner: "Thunderleng",
        admin: ["Thunderleng"],
        id: md5(location.pathname),
        distractionFreeMode: false,
      }
      const gitalk = new Gitalk(commentConfig)
      gitalk.render("gitalk-container")
    },
  }
  </script>
  <style>
  .gt-container .gt-header-textarea {
    color: #000;
  }


  </style>
  
  
