import Router from 'koa-router';
import axios from './utils/axios'
import Address from '../dbs/models/province'
import City from '../dbs/models/province'
import Menu from '../dbs/models/Menu'
import SearchCity from '../dbs/models/searchCity'
let router = new Router({prefix: '/geo'})

const sign = 'abcd';


router.get('/getPosition', async (ctx) => {
  let {
    status,
    data,
  } = await axios.get(`http://pv.sohu.com/cityjson?ie=utf-8`)
  if(status === 200){
      let returnCitySN = JSON.parse(data.replace(';','').split('=')[1])
      //console.log(1111,returnCitySN)
      let BDAPI = await axios.get(`https://api.map.baidu.com/location/ip?ak=h0DVgW9F8lqYAgeavoQPGhALkaes1Vx1&ip=${returnCitySN.cip}&coor=bd09ll`)
      /*  */
      if(BDAPI.status === 200){
        ctx.body = {
          errorCode:'0000',
          errorMessage:'获取成功',
          returnObject:BDAPI.data.content
         }
      }else{
        ctx.body = {
          errorCode:'9999',
          errorMessage:'获取地址失败',
         }
      }
  }else{
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取IP失败',
     }
  }
  
})

router.get('/province', async (ctx) => {
  try {
    let province = await Address.find({'type':2,'parent_id':1})
    ctx.body = {
      errorCode:'0000',
      errorMessage:'获取成功',
      returnObject:province.map(item => {
        return {
            id: item.id,
            name: item.name
        }
      })
    }
  }catch(e){
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取失败',
      returnObject: []
    }
  }
   
   
    
   
 
  })

router.get('/province/:id', async (ctx) => {})

router.get('/city', async (ctx) => {
  try {
    let city
    if(ctx.query.parentId){
      city = await City.find({'type':3,'parent_id': parseInt(ctx.query.parentId)})
    }else{
      city = await City.find({'type':3})
    }
    
    ctx.body = {
      errorCode:'0000',
      errorMessage:'获取成功',
      returnObject:city.map(item => {
        return {
          id: item.id,
          name: item.name
        }
      })
    }
  }catch(e){
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取失败',
      returnObject:[]
     }
  }
})

router.get('/searchCity', async (ctx) => {
  try {
    let pattern = new RegExp("[\u4E00-\u9FA5]+");
    let pattern2 = new RegExp("[A-Za-z]+");
    let searchCity 
   
    if(pattern.test(ctx.query.value)){
      searchCity = await SearchCity.find({'value':{"$regex":new RegExp(ctx.query.value)}})
    }else if(pattern2.test(ctx.query.value)){
      searchCity = await SearchCity.find({'cityPinYin':{"$regex":new RegExp(ctx.query.value)}})
    }else{
      searchCity = []
    }
    ctx.body = {
      errorCode:'0000',
      errorMessage:'获取成功',
      returnObject:searchCity.map(item => {
        return {
          cityPinYin: item.cityPinYin,
          value:item.value,
          name:item.name,
          cityAcronym:item.name,
        }
      })
    }
  }catch(e){
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取失败',
      returnObject:[]
     }
  }
})

router.get('/hotCity', async (ctx) => {
   let list = [
     '北京市',
     '上海市',
     '广州市',
     '深圳市',
     '天津市',
     '西安市',
     '杭州市',
     '南京市',
     '武汉市',
     '成都市'
   ]
   let result = await City.find()
   console.log(result)
   let nList = []
   nList = result.filter(k => list.includes(k.name))
  /*  result.forEach(item => {
     nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
   }) */
   ctx.body = {
    errorCode:'0000',
    errorMessage:'获取成功',
    returnObject:nList
  }
  
})

router.get('/menu', async (ctx) => {
  const result = await Menu.findOne()
    if(result){
      ctx.body = {
        errorCode:'0000',
        errorMessage:'获取成功',
        returnObject:result.menu
      }
    }else{
      ctx.body = {
        errorCode:'9999',
        errorMessage:'数据获取失败',
        returnObject:[]
      }
    }
  
   //console.log(result.menu)
  /* let {status, data: {
      menu
    }} = await axios.get(`http://cp-tools.cn/geo/menu?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      menu
    }
  } else {
    ctx.body = {
      menu: []
    }
  } */
})

export default router;
