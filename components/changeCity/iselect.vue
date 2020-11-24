<template>
  <div class="m-iselect">
    <span class="name">按省份选择:</span>
    <el-select
      v-model="pvalue"
      placeholder="省份">
      <el-option
        v-for="item in province"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <el-select
      v-model="cvalue"
      :disabled="!city.length"
      placeholder="城市">
      <el-option
        v-for="item in city"
        :key="item.value"
        :label="item.label"
        :value="item.value"/>
    </el-select>
    <span class="name" style="margin-left:50px">直接搜索:</span>
   <el-autocomplete
        v-model="state"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入内容"
        @select="handleSelect"
        ></el-autocomplete>
  </div>
</template>

<script>
import _ from 'lodash';
import api from '@/plugins/api/api'
export default {
  data(){
    return {
      province:[],
      pvalue:'',
      city:[],
      cvalue:'',
      input:'',
      cities:[],
      restaurants: [],
        state: '',
        timeout:  null
    }
  },
  watch:{
    async pvalue(newPvalue){
      let {errorCode,returnObject}=await api.getCity({
          parentId:newPvalue
      })
      if(errorCode==='0000'){
        this.city=returnObject.map(item=>{
          return {
            value:item.id,
            label:item.name
          }
        })
        this.cvalue=''
      }
    }
  },
  async mounted(){
      this.restaurants = this.loadAll();
    let {errorCode,returnObject}=await api.getProvince()
    if(errorCode==='0000'){
      this.province=returnObject.map(item=>{
        return {
          value:item.id,
          label:item.name
        }
      })
    }
  },
  methods:{
    loadAll() {

        return [];
      },
    async querySearchAsync(queryString, cb) {
        let {data}=await this.$axios.get(`/geo/searchCity?value=${queryString}`)
        console.log(1,data.returnObject)
        if (data.errorCode == '0000') {
                var restaurants = data.returnObject
                // 调用 callback 返回建议列表的数据
                cb(restaurants);
            } else {
                alert(data.errorMessage);
            }

      },
      createStateFilter(queryString) {
        return (state) => {
          return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      handleSelect(item) {
        console.log(item);
      }
    /* querySearchAsync:_.debounce(async function(query,cb){
      let self=this;
      if(self.cities.length){
        cb(self.cities.filter(item => item.value.indexOf(query)>-1))
      }else{
        let {status,data}=await self.$axios.get(`https://apimobile.meituan.com/group/v1/area/search/${query}`)
        if(status===200){
          self.cities=data.data.map(item=>{return {
            value:item.name
          }})
          cb(self.cities.filter(item => item.value.indexOf(query)>-1))
        }else{
          cb([])
        }
      }
    },200),
    handleSelect:function(item){
      console.log(item.value);
    } */
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changeCity/iselect.scss";
</style>
