import Router from 'koa-router';
import axios from './utils/axios'
import Poi from '../dbs/models/poi'
import Act from '../dbs/models/search'

//import sign from './utils/sign'

let router = new Router({prefix: '/search'})

router.get('/top', async (ctx) => {
  try{
    let top = await Poi.find({'name': {"$regex":new RegExp(ctx.query.name)},'city':ctx.query.city})
    ctx.body = {
            errorCode:'0000',
            errorMessage:'获取成功',
            returnObject: {
                top:top.map(item => {
                  return {
                    name: item.name,
                    type: item.type
                  }
                }),
                type: top.length ? top[0].type : ''
            }
           
         }
  }catch(e){
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取失败',
      returnObject:{}
     }
  }
  // try {
  //   let top = await Poi.find({
  //     'name': new RegExp(ctx.query.input),
  //     city: ctx.query.city
  //   })
  //   ctx.body = {
  //     code: 0,
  //     top: top.map(item => {
  //       return {
  //         name: item.name,
  //         type: item.type
  //       }
  //     }),
  //     type: top.length ? top[0].type : ''
  //   }
  // } catch (e) {
  //   ctx.body = {
  //     code: -1,
  //     top: []
  //   }
  // }
  /* let {status, data: {
      top
    }} = await axios.get(`http://cp-tools.cn/search/top`, {
    params: {
      input: ctx.query.input,
      city: ctx.query.city,
      sign
    }
  })
  ctx.body = {
    top: status === 200
      ? top
      : []
  } */
})

router.get('/hotPlace', async (ctx) => {
  let city = ctx.store ? ctx.store.geo.position.city : ctx.query.city
  try{
    let hotPlace = await Poi.find({'type': {"$regex":ctx.query.type || '丽人'},'city':city})
    ctx.body = {
      errorCode:'0000',
      errorMessage:'获取成功',
      returnObject: {
            hotPlace:hotPlace.map(item => {
              return {
                name: item.name,
                type: item.type
              }
          }),
          type: hotPlace.length ? hotPlace[0].type : ''
      }
     
   }

  }catch (e) {
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取失败',
      returnObject:{}
     }
  }
})

router.get('/resultsByKeywords', async (ctx) => {
  const {city, keyword} = ctx.query;
  console.log(keyword)
  try{
    let setKeyWords = keyword === 'all' ? {} : {'type': keyword }
    console.log(1,setKeyWords,keyword === '')
    let act = await Act.find({'$or':[{'$and':[setKeyWords]}]})
    
    ctx.body = {
      errorCode:'0000',
      errorMessage:'获取成功',
      returnObject: act
     
   }

  }catch (e) {
    ctx.body = {
      errorCode:'9999',
      errorMessage:'获取失败',
      returnObject:{}
     }
  }
  
})

router.get('/products', async (ctx) => {
  let keyword = ctx.query.keyword || '旅游'
  let city = ctx.query.city || '北京'
  let {
    status,
    data: {
      product,
      more
    }
  } = await axios.get('http://cp-tools.cn/search/products', {
    params: {
      keyword,
      city,
      //sign
    }
  })
  if (status === 200) {
    ctx.body = {
      product,
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  }else{
    ctx.body = {
      product: {},
      more: ctx.isAuthenticated() ? more: [],
      login: ctx.isAuthenticated()
    }
  }
})

export default router
