import axios from 'axios';


// 请求超时时间
axios.defaults.timeout = 20000;
axios.defaults.baseURL = ''

var num = 0
//http request 拦截器
axios.interceptors.request.use(
	config => {
		num++
		config.headers = {
			'Content-Type':'application/json;charset=UTF-8',
		}
		//toastMessage()
	return config;
	},
	error => {
	return Promise.reject(error);
	}
  );
  
  
  //http response 拦截器
  axios.interceptors.response.use(
	response => {
	  num--
	  if (num <= 0) {
		//toastMessage.close()    
	  } else {
		//toastMessage() 
	  }
	  return response;
	},
	error => {
	  return Promise.reject(error)
	}
  )


 /**
   * 封装get方法
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function get(url,params={}){
	return new Promise((resolve,reject) => {
	  axios.get(url,{
		params:params
	  })
	  .then(response => {
		resolve(response.data);
	  })
	  .catch(err => {
		reject(err)
	  })
	})
  }
  
  
  /**
   * 封装post请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
   export function post(url,data = {}){
	  return new Promise((resolve,reject) => {
	   axios.post(url,data)
			.then(response => {
			  resolve(response.data);
			},err => {
			  reject(err)
			})
	 })
   }
  
   /**
   * 封装patch请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function patch(url,data = {}){
	return new Promise((resolve,reject) => {
	  axios.patch(url,data)
		   .then(response => {
			 resolve(response.data);
		   },err => {
			 reject(err)
		   })
	})
  }
  
   /**
   * 封装put请求
   * @param url
   * @param data
   * @returns {Promise}
   */
  
  export function put(url,data = {}){
	return new Promise((resolve,reject) => {
	  axios.put(url,data)
		   .then(response => {
			 resolve(response.data);
		   },err => {
			 reject(err)
		   })
	})
  }
  