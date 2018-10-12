import { message } from 'antd';
import { createLogger } from 'redux-logger'; 
 

export function config() {
  return {
      onAction: createLogger(),
    onError(err) {
      err.preventDefault();
      message.error(err.message);
    },
    initialState: {
      global: {
        text: 'hi umi + dva',
      },
    },
  };
}