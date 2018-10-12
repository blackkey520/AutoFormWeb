import {
  queryDBConfigList,
  addDBConfig,
  updateDBConfig,
  removeDBConfig
} from '@/services/autoformconfig';
import uuid from 'node-uuid';

export default {
  namespace: 'dbconfig',

  state: {
    dblist: [],
  },

  effects: {
    *fetch({ payload }, { call, put,take }) {
      const response = yield call(queryDBConfigList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data.rows) ? response.data.rows : [],
      });
      
      yield put({
        type: 'datasourceconfig/fetch',
        payload: {DT_CONN:response.data.rows[0].DB_KEY}
      });
      yield take('datasourceconfig/fetch/@@end');
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.DB_KEY) {
        callback = Object.keys(payload).length === 1 ? removeDBConfig : updateDBConfig;
      } else {
        payload.DB_KEY = uuid.v1();
        callback = addDBConfig;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'fetch',
        payload: {},
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        dblist: action.payload,
      };
    },
  },
};
