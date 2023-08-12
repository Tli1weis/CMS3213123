import { myLocalStorage } from '@/utils/MyStorage';
import { BASE_URL, TIMEOUT } from './config';
import HyRequest from './request';
import { TOKEN } from '@/types/constants';

const hyRequest = new HyRequest({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  interceptors: {
    requestSuccessFn: (config) => {
      const token = myLocalStorage.get(TOKEN);
      if (config.headers && token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
  },
});

export default hyRequest;
