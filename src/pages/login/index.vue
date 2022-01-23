<template>
  <div class="h-[100vh] w-full flex justify-center bg-[#2d3a4b] login-wrapper">
    <div class="w-[500px] mt-[30%]">
      <Form>
        <FormItem>
          <Input v-model:value="loginForm.username" placeholder="请输入用户名" size="large">
            <template #prefix>
              <Icon name="UserOutlined" color="#889aa4"></Icon>
            </template>
          </Input>
        </FormItem>
        <FormItem>
          <InputPassword v-model:value="loginForm.password" placeholder="请输入密码" size="large">
            <template #prefix>
              <Icon name="LockOutlined" color="#889aa4"></Icon>
            </template>
          </InputPassword>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" block @click="login"> 登录 </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Form, FormItem, Input, InputPassword, Button } from 'ant-design-vue'
  import { reactive } from 'vue'
  import Icon from '@/components/icon/index.vue'

  import { useUserStore } from '@/store/modules/user'

  const userStore = useUserStore()
  console.log(userStore)

  const loginForm = reactive({
    username: '',
    password: '',
  })

  const login = () => {
    console.log(loginForm)
  }
</script>

<style lang="less">
  .login-wrapper {
    .ant-input-affix-wrapper {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      > input {
        background: transparent;
        color: #fff;
      }
    }
  }
</style>
