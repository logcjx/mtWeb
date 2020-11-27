<template>
  <div class="m-hcity">
    <dl>
      <dt>热门城市：</dt>
      <dd
        v-for="item in list"
        :key="item.id">{{ item.name==='市辖区'?item.province:item.name }}</dd>
    </dl>
  </div>
</template>

<script>
import api from '@/plugins/api/api'
export default {
  data(){
    return {
      list:[]
    }
  },
  async mounted(){
    let {errorCode,returnObject}=await api.hotCity()
    if(errorCode==='0000'){
      this.list=returnObject
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/hot.scss";
</style>
