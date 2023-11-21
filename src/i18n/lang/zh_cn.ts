export default {
	user: {
		username: '用户名',
		password: '密码',
	},
	search: {
		placeholder: '查询课程信息',
	},
	topBar: {
		home: '主页',
		star: '收藏',
		courseInfo: '课程信息',
	},
	login: {
		title: '登录',
		username: '用户名',
		password: '密码',
		forgetPassword: '忘记密码',
		loginBtn: '登录',
		loginTip: '还没有账号, 注册一个?',
		error: '用户名或密码错误',
		rules: {
			username: {
				required: '用户名不能为空',
				minLength: '用户名至少需要 3 个字符',
				maxLength: '用户名不能超过 20 个字符',
			},
			password: {
				required: '请输入密码',
				minLength: '密码至少需要 6 个字符',
				maxLength: '密码不能超过 20 个字符',
			}
		}
	},
	register: {
		title: '注册',
		registerBtn: '注册',
		registerTip: '已有账号?',
	},
	lang: '简体中文'
};