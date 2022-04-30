<template>
  <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
      unique-opened
      :router="true"
    >
      <el-sub-menu :index="menu.id + ''" v-for="menu in menus" :key="menu.id">
        <template #title>
          <i :class="['iconfont', menu.icon]"></i>
          <span>{{ menu.title }}</span>
        </template>
        <template v-for="submenu in menu.children">
          <el-menu-item
            :key="submenu.id"
            :index="'/' + menu.name + '/' + submenu.name"
            v-if="submenu.hidden === 0"
          >
            <i :class="['iconfont', submenu.icon]"></i>
            {{ submenu.title }}
          </el-menu-item>
        </template>>
      </el-sub-menu>
    </el-menu>
</template>

<script lang="ts" setup>
import { useStore } from 'vuex';
import { key } from '@render/store';
import type { Menus } from '@render/types/common';

const store = useStore(key);
const menus: Menus[] = store.getters.GET_MENU;
</script>

<style>

</style>
