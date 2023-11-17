export default {
	user: {
		username: '用户名',
		password: '密码',
	},
	search: {
		placeholder: '查询课程信息',
	},
	home: {
		recommend: '推荐',
	},
	topBar: {
		home: '主页',
		star: '收藏',
	},
	login: {
		title: '登录',
		username: '用户名',
		password: '密码',
		forgetPassword: '忘记密码',
		loginBtn: '登录',
		loginTip: '还没有账号, 注册一个?',
		error: {
			format: {
				u: '格式错误',
				p: ' '
			},
			auth: {
				u: ' ',
				p: '用户名或密码错误',
			}
		},
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
		error : {
			samename: {
				u: '用户名已经存在',
				p: ' ' 
			},
			format: {
				u: '格式错误',
				p: ' '
			}
		},
	},
	error: {
		'401': {
			title: '登录过期',
			message: '请重新登录'
		}
	},
	course: {
		school: '学校',
		teacher: '教师',
	},
	message: {
		announcement: {
			title: '公告',
		},
		notification: {
			title: '通知',
			star: {
				tag: '收藏',
				message: '课程《{0}》有新评价',
			},
			review: {
				tag: '回复',
				message: '你在课程《{0}》下的评价有新回复',
			},
			unread: '未读',
		},
	},
	lang: '简体中文',
	tag: {
		course: '课程',
		school: '学校',
		teacher: '教师',
		tag: '标签',
	},
};