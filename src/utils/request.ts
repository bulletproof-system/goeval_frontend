import { i18n } from '@/i18n/index';
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
		
		// 401 请求要求用户的身份认证 清除token信息, 显示登录界面
		if (error.status === 401) {
			Local.remove('Bearer');
			ElNotification({ 
				title: i18n.global.t('error.401.title'),
				message: error.message,
				type: 'error',
				duration: 3000
			});
			themeConfig.setShowLoginPanel(true);
		} else {
			ElNotification({ 
				title: error.code,
				message: error.message,
				type: 'error',
				duration: 3000
			});
		}
		return Promise.reject(error);
	}
);

export default service;