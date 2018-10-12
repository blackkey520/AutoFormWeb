import {
  queryDSConfigList,
  addDSConfig,
  updateDSConfig,
  removeDSConfig
} from '@/services/autoformconfig';
import uuid from 'node-uuid';
import moment from 'moment';

export default {
  namespace: 'datasourceconfig',

  state: {
    datasourcelist: [],
    selectdatasource:null,
  },

  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryDSConfigList, payload);
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *submit({ payload }, { call, put }) {
      let callback;
      if (payload.GUID) {
        callback = Object.keys(payload).length === 1 ? removeDSConfig : updateDSConfig;
      } else {
        payload.GUID = uuid.v1();
        payload.DT_CREATEDATE=moment().format('YYYY-MM-dd HH:mm:ss');
        callback = addDSConfig;
      }
      yield call(callback, payload); // post
      yield put({
        type: 'fetch',
        payload: {},
      });
    },
    *selectdatasource({ payload }, { call, put }) {
        yield put({
        type: 'selectDataSource',
        payload: payload.item,
      });
    },
  },

  reducers: {
    queryList(state, action) {
      return {
        ...state,
        datasourcelist: action.payload,
      };
    },
    selectDataSource(state, action) {
      return {
        ...state,
        selectdatasource: action.payload,
      };
    },
  },
};
