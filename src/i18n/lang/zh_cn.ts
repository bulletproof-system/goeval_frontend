export default {
	user: {
		username: '用户名',
		password: '密码',
	},
	search: {
		placeholder: '查询课程信息',
	},
	home: {
		empty: '暂无数据',
		recommend: '推荐',
	},
	star: {
		empty: '暂无数据'
	},
	topBar: {
		home: '主页',
		star: '收藏',
		manage: '管理',
		user: {
			login: '登录',
			logout: '退出登录',
			center: '个人中心'
		},
		courseInfo: '课程信息',
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
		},
	},
	register: {
		title: '注册',
		username: '用户名',
		password: '密码',
		email: '邮箱',
		registerBtn: '注册',
		registerTip: '已有账号?',
		error: {
			samename: {
				u: '用户名已经存在',
				p: '',
				e: '',
			},
			format: {
				u: ' ',
				p: '用户名或密码格式错误',
				e: '',
			},
			email: {
				u: '',
				p: '',
				e: '邮箱格式错误'
			},
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
			},
			email: {
				format: '邮箱格式错误'
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
	userInfo: {
		userName: '用户名',
		avatar: '头像',
		email: '邮箱',
		role: {
			name: '身份',
			0: '游客',
			1: '用户',
			2: '管理员',
		},
		operate: {
			avatar: {
				detail: '更新头像',
				success: '头像修改成功',
				type: '头像格式限制: jpeg, jpg, png, gif',
				size: '头像大小限制: 2M',
			},
			email: {
				detail: '更新邮箱',
				new: '新邮箱',
				format: '邮箱格式错误',
				success: '邮箱修改成功',
			},
			password: {
				detail: '更新密码',
				old: '旧密码',
				new: '新密码',
				auth: {
					old: '请输入正确的密码',
					new: ''
				},
				format: {
					old: '',
					new: '密码格式错误'
				},
				required: '请输入密码',
				minLength: '密码至少需要 6 个字符',
				maxLength: '密码不能超过 20 个字符',
				success: '密码修改成功',
			},
			logout: '退出登录',
			cancel: '取消',
			confirm: '确定',
		}
	},
	manage: {
		pagination: {
			total: '共 {0} 条, 已筛选 {1} 条',
			jump: '跳转至',
			page: '页',
		},
		taglist: {
			new: '+ 添加'
		},
		user: {
			title: '用户管理',
			uid: '用户 ID',
			username: '用户名',
			email: '邮箱',
			role: {
				label: '身份',
				0: '游客',
				1: '用户',
				2: '管理员',
			},
			last_login: '上次登录时间',
			operate: {
				title: '操作',
				delete: {
					label: '删除',
					confirm: '确定删除该用户?',
					success: '删除成功',
				},
				set: {
					label: '设为管理',
					confirm: '确认将该用户设为管理?',
					success: '设置成功',
				},
				unset: {
					label: '移除管理',
					confirm: '确认将该用户移除管理?',
					success: '移除成功',
				},
				email: {
					label: '修改邮箱',
					format: '邮箱格式错误',
					success: '邮箱修改成功',
				},
				password: {
					label: '修改密码',
					required: '请输入密码',
					minLength: '密码至少需要 6 个字符',
					maxLength: '密码不能超过 20 个字符',
					format: '密码格式错误',
					success: '密码修改成功',
				},
			},
		},
		course: {
			title: '课程管理',
			cid: '课程 ID',
			name: '课程名称',
			school: '学校',
			teacher: '教师',
			tag: '标签',
			description: '课程描述',
			operate: {
				title: '操作',
				delete: {
					label: '删除',
					confirm: '确定删除该课程?',
					success: '删除成功',
				},
				edit: {
					label: '编辑',
					new: '+ 添加',
					success: '编辑成功',
				},
				detail: {
					label: '查看',
				},
				add: {
					label: '添加',
					success: '添加成功',
				},
			}
		},
		announcement: {
			title: '公告管理',
			aid: '公告 ID',
			title_: '标题',
			content: '内容',
			datetime: '发布时间',
			operate: {
				title: '操作',
				delete: {
					label: '删除',
					confirm: '确定删除该公告?',
					success: '删除成功',
				},
				edit: {
					label: '编辑',
					success: '编辑成功',
				},
				add: {
					label: '添加',
					success: '添加成功',
				}
			}
		},
		teacher: {
			title: '教师管理',
			tid: '教师 ID',
			name: '姓名',
			operate: {
				title: '操作',
				delete: {
					label: '删除',
					confirm: '确定删除该教师?',
					success: '删除成功',
				},
				edit: {
					label: '编辑',
					success: '编辑成功',
				},
				add: {
					label: '添加',
					success: '添加成功',
				}
			}
		},
		tag: {
			title: '标签管理',
			tid: '标签 ID',
			name: '标签名称',
			operate: {
				title: '操作',
				delete: {
					label: '删除',
					confirm: '确定删除该标签?',
					success: '删除成功',
				},
				edit: {
					label: '编辑',
					success: '编辑成功',
				},
				add: {
					label: '添加',
					success: '添加成功',
				}
			}
		},
		cancel: '取消',
		confirm: '确定',
		reload: '刷新',
		invaild: '无效操作',
	},
	reviewBlock: {
		title: "评论区",
		datetime: "日期和时间",
		reply: "回复",
		comments: "评论",
		textarea: "写下你的内容...",
		confirmClose:  "你的评论还未提交，确认关闭？",
		emptyContent: "评论内容不能为空",
		replySuccess: "回复成功",
		replyFail: "回复失败",
		cancel: '取消',
		confirm: '确定',
		success: '操作成功',
		fail: '操作失败',
	},
	infoBlock: {
		school: '开课学校',
		teacher: '任课教师',
		star: '评价星级',
		content: '评价内容',
		description: '课程简介',
		starCourse: '收藏课程',
		submitReview: '提交评价',
		textarea: '写下你的内容...',
		starSuccess: '收藏成功',
		starCancel: '取消收藏',
		confirmClose:  "你的评论还未提交，确认关闭？",
		emptyContent: "评论内容不能为空",
		emptyStar: "评价星级不能为空",
		reviewSuccess: "评价成功",
		reviewFail: "你已经提交过评价了",
		cancel: '取消',
		confirm: '确定',
		cancelStar: '取消收藏',
	}
};