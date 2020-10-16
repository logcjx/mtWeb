<template>
  <div class="m-menu">
       <dl class="nav">
            <dt>全部分类</dt>
            <dd v-for="(item, idx) in menu" :key=idx>
                <i i :class="item.type"/>{{ item.name }}<span class="arrow"/>
            </dd>
       </dl>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
    data(){
        return{
            menu:[{
                type:'food',
                name:'美食'
            },{
                type:'takeout',
                name:'外卖'
            }]
        }
    }
}
</script>

<style>
 @import "@/assets/css/index/index.scss";
</style>
