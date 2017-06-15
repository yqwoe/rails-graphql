import { query} from '../services/example'
import { parse } from 'qs'
export default {

  namespace: 'example',

  state: {
    data:{

    }
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      const result=yield call(query,parse(payload));
      if(result.data){
        yield put({
          type: 'fetchSuccess',
          payload:{
            data: result.data
          }
        })
      }
    },
  },

  reducers: {
    fetchSuccess(state, action) {
      return { ...state, ...action.payload };
    },
  },

};
