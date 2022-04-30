<template>
  <div class="page">
    <el-container>
      <el-header class="page-header">溢森源胶片自助系统</el-header>
      <el-container class="page-container">
        <el-aside class="page-container__menu">
          <MainMenuVue />
        </el-aside>
        <el-container class="page-container__container">
          <el-main class="page-container__container__body">
            <router-view></router-view>
          </el-main>
          <el-footer class="page-container__container__footer">Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import MainMenuVue from '@render/components/MainMenu.vue';
</script>

<style lang="scss">
.page {
  height: 100vh;
  widows: 100vw;
  background-color: rgba(6, 175, 153, 0.404);
  .page-header {
    height: 5vh;
    text-align: center;
    padding-top: 15px;
  }
  .page-container {
    height: 95vh;
    background-color: aquamarine;
    padding: 0;
    margin: 0;
    .page-container__menu {
      background-color: bisque;
      width: 12vw;
      height: 100%;
    }
    .page-container__container {
      background-color: azure;
      width: 88vw;
      .page-container__container__body {
        padding: 10px;
        height: 90vh;
        border: 1px solid rebeccapurple;
      }
      .page-container__container__footer {
        background-color: aquamarine;
        height: 5vh;
      }
    }
  }
}
</style>
