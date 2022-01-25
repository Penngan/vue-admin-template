<template>
  <div class="h-[100vh] w-full flex justify-center bg-[#2d3a4b] login-wrapper">
    <div class="w-[500px] mt-[30%]">
      <h1 class="text-[24px] text-center text-white">登录</h1>
      <Form>
        <FormItem v-bind="validateInfos.username">
          <Input v-model:value="loginFormRef.username" placeholder="请输入用户名" size="large">
            <template #prefix>
              <Icon name="UserOutlined" color="#889aa4" />
            </template>
          </Input>
        </FormItem>
        <FormItem v-bind="validateInfos.password">
          <InputPassword v-model:value="loginFormRef.password" placeholder="请输入密码" size="large">
            <template #prefix>
              <Icon name="LockOutlined" color="#889aa4" />
            </template>
          </InputPassword>
        </FormItem>
        <FormItem>
          <Button type="primary" size="large" block @click="handleLogin"> 登录 </Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Form, FormItem, Input, InputPassword, Button } from 'ant-design-vue'
  import { reactive } from 'vue'
  import Icon from '@/components/icon/index.vue'
  import { login } from '@/api/user'
  import { setToken } from '@/utils/auth'
  import { useRouteQuery } from '@/hooks/useRouteQuery'
  import { useRouter } from 'vue-router'

  const redirect = useRouteQuery('redirect', '/')
  const router = useRouter()
  const useForm = Form.useForm
  const loginFormRef = reactive({
    username: 'admin',
    password: '123456',
  })
  const rulesRef = reactive({
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  })
  const { validate, validateInfos } = useForm(loginFormRef, rulesRef)

  const handleLogin = () => {
    validate().then((data) => {
      login(data).then((res: any) => {
        setToken(res.token)
        router.push({ path: redirect.value })
        // getInfo('1').then((res) => {
        //   console.log(res)
        // })
      })
    })
  }
</script>

<style lang="less">
  .login-wrapper {
    .ant-input-affix-wrapper {
      border: 1px solid rgba(255, 255, 255, 0.1) !important;
      background: rgba(0, 0, 0, 0.1) !important;
      .ant-input {
        background: transparent !important;
        color: #fff;
        height: 36px;
        line-height: 36px;
      }
    }
  }
</style>
