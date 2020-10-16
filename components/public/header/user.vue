<template>
  <div class="m-user">
    <template v-if="user">
      欢迎您，<span class="username">{{ user }}</span>
      [<nuxt-link to="/exit">退出</nuxt-link>]
    </template>
    <template v-else>
      <nuxt-link to="/login" class="login">登录</nuxt-link>
      <nuxt-link to="/register" class="register">注册</nuxt-link>
    </template>
  </div>
</template>

<script>
import api from '@/plugins/api/api'
export default {
  data(){
    return {
      user:''
    }
  },
  async mounted(){
    const {errorCode,errorMessage,returnObject} = await api.getUser()
    console.log(await api.getUser())
    if(errorCode === '0000'){
        this.user=returnObject.user
    }
  }
  
}
</script>

<style lang="css">
</style>
