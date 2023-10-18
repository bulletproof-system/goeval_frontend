import axios, { AxiosInstance } from 'axios';
import { Local } from '@/utils/storage';
import { useThemeConfig } from '@/stores/themeConfig';
import { ElNotification } from 'element-plus'

const themeConfig = useThemeConfig();
const service: AxiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 10000,
});

service.interceptors.request.use(
	config => {
		config.headers['Authorization'] = `Bearer ${Local.get('Bearer')}`;
		return config;
	},
	error => { return Promise.reject(error); }
);

service.interceptors.response.use(
	response => { return response; },
	error => {
		console.log(error);
		if (error.code == "ERR_NETWORK") 
			ElNotification({ 
				title: '网络错误',
				message: '请检查网络连接',
				type: 'error',
				duration: 3000});
		// 401 请求要求用户的身份认证 清除token信息, 显示登录界面
		if (error.status === 401) {
			Local.remove('Bearer');
			themeConfig.setShowLoginPanel(true);
		}
		return Promise.reject(error);
	}
);

export default service;