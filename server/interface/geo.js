import Router from 'koa-router';
import axios from './utils/axios'
import Province from '../dbs/models/province'
import Menu from '../dbs/models/Menu'
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
   let province = await Province.find()
   console.log(province)
   console.log(' 省份',province)
    ctx.body = {
     province: province.map(item => {
       return {
         id: item.id,
         name: item.value[0]
      }
     })
   } 
  /* let {status, data: {
      province
    }} = await axios.get(`http://cp-tools.cn/geo/province?sign=${sign}`)
    ctx.body = {
      province: status === 200
        ? province
        : []
    } */
  })

router.get('/province/:id', async (ctx) => {
  // let city = await City.findOne({id: ctx.params.id})
  //
  // ctx.body = {
  //   code: 0,
  //   city: city.value.map(item => {
  //     return {province: item.province, id: item.id, name: item.name}
  //   })
  // }
  /* let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/province/${ctx.params.id}?sign=${sign}`)
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  } */
})

router.get('/city', async (ctx) => {
   let city = []
   let result = await City.find()
   result.forEach(item => {
     city = city.concat(item.value)
   })
   ctx.body = {
     code: 0,
     city: city.map(item => {
       return {
         province: item.province,
        id: item.id,
         name: item.name === '市辖区' || item.name === '省直辖县级行政区划'
           ? item.province
           : item.name
       }
    })
   }
  /* let {status, data: {
      city
    }} = await axios.get(`http://cp-tools.cn/geo/city?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      city
    }
  } else {
    ctx.body = {
      city: []
    }
  } */
})

router.get('/hotCity', async (ctx) => {
  // let list = [
  //   '北京市',
  //   '上海市',
  //   '广州市',
  //   '深圳市',
  //   '天津市',
  //   '西安市',
  //   '杭州市',
  //   '南京市',
  //   '武汉市',
  //   '成都市'
  // ]
  // let result = await City.find()
  // let nList = []
  // result.forEach(item => {
  //   nList = nList.concat(item.value.filter(k => list.includes(k.name) || list.includes(k.province)))
  // })
  // ctx.body = {
  //   hots: nList
  // }
  let {status, data: {
      hots
    }} = await axios.get(`http://cp-tools.cn/geo/hotCity?sign=${sign}`);
  if (status === 200) {
    ctx.body = {
      hots
    }
  } else {
    ctx.body = {
      hots: []
    }
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
