<template>
  <span>影像科危急值登记系统</span>
  <el-form
    ref="loginForm"
    :model="ruleForm"
    status-icon
    :rules="rules"
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" type="text" autocomplete="off" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="ruleForm.password"
        type="password"
        autocomplete="off"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm()"
        >Submit</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref } from 'vue';
import { adminLoginApi, adminInfoApi } from '@render/request/api';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { key } from '@render/store';

// 自定义校验规则
const validateUsername = (rule: unknown, value: string, callback: (msg?: string) => void) => {
  if (value) {
    if (value.length < 3) callback('长度不能小于3')
    callback()
  } else {
    callback('账号不能为空');
  }
}

const state = reactive({
  ruleForm: {
    username: 'admin',
    password: '123456',
  },
  rules: {
    username: [{
        validator: validateUsername,
        trigger: 'blur',
      }
    ],
    password: [
      {
        required: true,
        message: '密码不能为空',
        trigger: 'blur',
      },
    ],
  },
})

// 获取组件实例
const loginForm = ref();

// 获取路由对象
const router = useRouter();
// 获取vuex休对象
const store = useStore(key);

// 提交按钮触发校验
const submitForm = () => {
  loginForm.value.validate((isValid: boolean) => {
    if (isValid) {
      // 登录逻辑
      adminLoginApi({
        username: ruleForm.value.username,
        password: ruleForm.value.password,
      }).then(res => {
        if (res.code === 200) {
          // 本地存储(localStorage, SessinStorage, cookie: 第三方库js-cookie)
          if (res.data) {
            localStorage.setItem('token', res.data.tokenHead + res.data.token);
            store.dispatch('FETCH_USERINFO').then(res => {
              router.push('/homepage');
            });
          }
        }
      })
    }
  })
}
const { ruleForm, rules } = toRefs(state);
</script>

<style>

</style>