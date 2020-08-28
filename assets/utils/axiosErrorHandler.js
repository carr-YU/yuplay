import axios from 'axios'
import { message} from 'antd';
axios.defaults.withCredentials = true
axios.interceptors.response.use(data=> {
    return data;
  }, err=> {
    if (err.response.status == 504||err.response.status == 404) {
        message.error('服务器被吃了⊙﹏⊙∥');
    } else if (err.response.status == 403) {
        message.error('权限不足,请联系管理员!');
    }else {
        message.error('未知错误!');
    }
    return Promise.reject(err);
})
export default axios;