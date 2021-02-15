import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://messaging-test.bixly.com',
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
