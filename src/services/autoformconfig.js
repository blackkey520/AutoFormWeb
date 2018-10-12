
import request from '@/utils/request';

export async function queryDBConfigList() {
  return request('/api/autoform/config/db/list');
}

export async function addDBConfig(params) {
  return request('/api/autoform/config/db/create', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function updateDBConfig(params) {
  const {DB_KEY}=params;
  delete params.DB_KEY;
  return request(`/api/autoform/config/db/update/${DB_KEY}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeDBConfig(params) {
  const {DB_KEY}=params;
  return request(`/api/autoform/config/db/del/${DB_KEY}`);
}

export async function queryDSConfigList(params) {
  return request(`/api/autoform/config/datasource/list/${params.DT_CONN}/${params.SEARCHTEXT?params.SEARCHTEXT:'null'}`);
}

export async function addDSConfig(params) {
  return request('/api/autoform/config/datasource/create', {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
export async function updateDSConfig(params) {
  const {GUID}=params;
  delete params.GUID;
  return request(`/api/autoform/config/datasource/update/${GUID}`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}

export async function removeDSConfig(params) {
  const {GUID}=params;
  return request(`/api/autoform/config/datasource/del/${GUID}`);
}