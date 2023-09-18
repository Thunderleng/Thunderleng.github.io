/*
 * @Date: 2023-04-20 18:01:30
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-20 18:07:05
 * @FilePath: \NotesThunder\docs\.vitepress\theme\index.js
 */
import DefaultTheme from 'vitepress/theme'
import Talk from '../../../components/blog.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('Git-talk', Talk)
  }
}

