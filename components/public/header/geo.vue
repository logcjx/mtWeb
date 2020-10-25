<template>
  <div class="m-geo">
    <i class="el-icon-location"/>{{ $store.state.geo.position.city }}
    <nuxt-link
      class="changeCity"
      to="/changeCity">切换城市</nuxt-link>
    [香河 廊坊 天津]
  </div>
</template>

<script>
import api from '@/plugins/api/api'
export default {
  data(){
    return {
      province:'',
      city:''
    }
  },
  async mounted(){
    /* const {errorCode,errorMessage,returnObject} = await api.getPosition()
    console.log(await api.getPosition())
    if(errorCode === '0000'){
        this.province=returnObject.address_detail.province
        this.city=returnObject.address_detail.city
    } */
  }
}
</script>

<style lang="css">
</style>
