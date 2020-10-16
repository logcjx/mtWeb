<template>
  <div class=""/>
</template>

<script>
import api from '@/plugins/api/api'
export default {
  layout: 'blank',
  middleware:async (ctx)=>{
    let {data}=await ctx.$axios.get('/users/exit')
    
    if(data.errorCode==='0000'){
      window.location.href='/'
    }
  }
}
</script>
