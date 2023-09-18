<!--
 * @Date: 2023-04-18 15:52:52
 * @LastEditors:  thunder thunderleng@gmail.com
 * @LastEditTime: 2023-04-18 16:38:43
 * @FilePath: \NotesThunder\components\css\fontBlend.vue
-->
<template>
    <div class="all">
<div class="content">Welcome my blog</div>

    </div>
    
</template>

<script setup>

</script>

<style lang="scss" scoped>
.all{
    filter: contrast(30);
background-color: black;
display: flex;
align-items: center;
height: 100px;
}
.content{
 color: white;
    width: 100%;
margin: 0 auto;
text-align: center;
font-size: 50px;
animation: change 4s  forwards;

height: 50px;
}
@keyframes change {
    from{
        letter-spacing: -25px;
        filter: blur(3px);
    }
    to{
        letter-spacing: 0px;  
        filter: blur(0.5px);
    }
}
</style>