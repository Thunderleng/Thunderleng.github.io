/*
 * @Date: 2022-10-28 14:27:54
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-21 12:35:10
 * @FilePath: \NotesThunder\docs\.vitepress\config.js
 */
/*
 * @Date: 2022-10-28 14:27:54
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-02 21:51:47
 * @FilePath: \NotesThunder\docs\.vitepress\config.js
 */
//因为导航栏和侧边栏的代码较多，所以抽离出来
// const wyNav = require('./nav.js')
// const wySidebar = require('./sidebar.js')
/*
 * @Date: 2023-03-31 20:15:39
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-03-31 20:15:45
 * @FilePath: \NotesThunder\vite.config.ts
 */
import { defineConfig } from 'vite'
export default defineConfig( {
  
  title: "ThunderLeng", //网站标题
  description: "Personal-Notes", //网站描述,会生成<meta>便签
  themeConfig: {
    logo: "/my-logo.svg",
    nav: [
      { text: "主页", link: "/" },
      { text: "Demo", link: "/Demo/index.md" },
      {
        text: "博客",
        items: [
          { text: "Web-front 前端", link: "JavaScript/index.md" },
          { text: "Block-chain 区块链", link: "Solidity/index.md" },
          { text: "Web-back 后端", link: "/Golang/index.md" },
        ],
      },
      { text: "关于我", link: "https://github.com/..." },
    ],
    sidebar: {
      // This sidebar gets displayed when user is
      // under `guide` directory.
      "/JavaScript/": [
        {
          text: "Vue2",
          items: [
            // This shows `/guide/index.md` page.
            { text: "01-Vue初始化", link: "/JavaScript/vue/" }, // /guide/index.md
            { text: "One", link: "/JavaScript/one" }, // /guide/one.md
            { text: "Two", link: "/JavaScript/two" }, // /guide/two.md
          ],
        },
        {
          text: "面试题",
          items: [
            // This shows `/guide/index.md` page.
            { text: "10-30", link: "/JavaScript/questions/10.30面试题.md" },
            { text: "11-01", link: "/JavaScript/questions/11.01面试题" },
            { text: "杂项", link: "/JavaScript/questions/面试题.md" },
          ],
        },
        {
          text: "JavaScript",
          items: [
            // This shows `/guide/index.md` page.
            { text: "浏览器知识", link: "/JavaScript/JS/browser.md" },
            { text: "Promise知识", link: "/JavaScript/JS/promise.md" },
          ],
        },
      ],

      // This sidebar gets displayed when user is
      // under `config` directory.
      "/Solidity/": [
        {
          text: "区块链",
          items: [
            // This shows `/config/index.md` page.
            { text: "Index", link: "/Solidity/" }, // /config/index.md
            { text: "Three", link: "/config/three" }, // /config/three.md
            { text: "Four", link: "/config/four" }, // /config/four.md
          ],
        },
      ],
      "/Demo/": [
        {
          text: "Webgl-Demo",
          items: [
            // This shows `/config/index.md` page.
            { text: "Vue3-three 基本用法", link: "/Demo/three/threeBasic.md" }, // /config/index.md
            { text: "着色器的使用", link: "/Demo/three/Sea.md" },
          ],
        },
        {
          text: "Css-Demo",
          items: [
            // This shows `/config/index.md` page.
            { text: "文字的交融和展开", link: "/Demo/css/01.md" }, // /config/index.md
            
          ],
        },
        {
          text: "组件-Demo",
          items: [
            // This shows `/config/index.md` page.
            { text: "富文本编辑器", link: "/Demo/com/01.md" }, // /config/index.md
            { text: "文件上传", link: "/Demo/com/file.md" }, // /config/index.md
          ],
        },
        // {
        //   text: "Js-Demo",
        //   items: [
        //     // This shows `/config/index.md` page.
        //     { text: "Vue3-three 基本用法", link: "/Demo/three/threeBasic.md" }, // /config/index.md
            
        //   ],
        // },
      ],
    },
  },
  vite: {
    optimizeDeps: {
      include: ['dat.gui']
    }
  }
});
