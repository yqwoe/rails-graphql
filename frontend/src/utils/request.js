import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'



const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options
  //defaults
  if(fetchType === 'CORS'){
    axios.defaults.responseType = 'json'
    const token = getCookie('user_session');
    const authHeader = getAuthHeader(token);
    axios.defaults.headers = authHeader
  }else{
    axios.defaults.headers ={
      Accept:'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8'
    }
  }
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(`${url}${!lodash.isEmpty(data) ? `?${qs.stringify(data)}&t=${new Date().getTime()}` : `?t=${new Date().getTime()}`}`)
    case 'delete':
      return axios.delete(url, { data })
    case 'head':
      return axios.head(url, data)
    case 'post':
      return axios.post(url, data)
    case 'put':
      return axios.put(url, data)
    case 'patch':
      return axios.patch(url, data)
    default:
      return axios(options)
  }
}

function AppError(response){
  this.message=response.statusText
  this.code=response.status
}

export default function request (options) {
  return fetch(options).then((response) => {
    const { statusText, status} = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    return {
      code: 0,
      status,
      message: statusText,
      ...data,
    }
  }).catch((error) => {
    const {
      response = {
        statusText: data.message || 'Network Error',
        status: data.status || 404,
      }
    } = error
    // AppError.prototype = new Error();
    // AppError.prototype.constructor = AppError;
    // throw new AppError(response)
    // console.log(response)
    return { code: 1, message: response.data.message }
  })
}
