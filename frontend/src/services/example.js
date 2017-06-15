import request from '../utils/request';

export async function query(params) {
  let host = document.location.protocol + '//' + document.location.hostname
  return request({
    url: host+':3000/graphql',
    method:'POST',
    data: params
  });
}
