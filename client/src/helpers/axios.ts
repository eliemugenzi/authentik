import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:3838'
})

const errorHandler = (error: any) => {
    if (error.response) {
      return Promise.reject({
        ...error,
        ...error.response.data,
      });
    } else if (error.message)
      return Promise.reject({ ...error, response: { data: error } });
    else return Promise.reject(new Error('Unknown error!'));
  };

  const requestConfig = async (req: any) => {
  const token = localStorage.getItem('token')
    
    req.headers['authorization'] = `JWT ${token}`;
  
  
    return req;
  };

  const responseHandler = (response: any) => response.data;

  api.interceptors.response.use(responseHandler, errorHandler);
api.interceptors.request.use(requestConfig);

export default api;