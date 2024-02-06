// axiosInstance.js

import axios from 'axios';
// import Config from 'react-native-config';
// import env from '../../config/env';

const axiosInstance = axios.create({
  baseURL: 'http://192.168.1.5:5000',
  timeout: 10000, // Thời gian chờ tối đa cho mỗi yêu cầu (milliseconds)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Nếu bạn muốn thêm xử lý cho tất cả các yêu cầu trước khi chúng được gửi đi, bạn có thể thực hiện như sau:
axiosInstance.interceptors.request.use(
  config => {
    // Xử lý trước khi gửi yêu cầu, ví dụ: thêm token, xác thực,...
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// Nếu bạn muốn thêm xử lý cho tất cả các responses trước khi chúng được trả về, bạn có thể thực hiện như sau:
axiosInstance.interceptors.response.use(
  response => {
    // Xử lý sau khi nhận phản hồi, ví dụ: kiểm tra lỗi, thêm thông báo,...
    return response;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
