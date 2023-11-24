export default {
	user: {
		username: 'username',
		password: 'password',
	},
	search: {
		placeholder: 'Query course information',
	},
	home: {
		recommend: 'Recommend',
	},
	topBar: {
		home: 'Home',
		star: 'Star',
		manage: 'Manage',
		user: {
			login: 'login',
			logout: 'logout',
			center: 'center'
		}
	},
	login: {
		title: 'Login',
		username: 'Username',
		password: 'Password',
		forgetPassword: 'Forget Password',
		loginBtn: 'Login',
		loginTip: 'Dont have an account yet?',
		error: {
			format: {
				u: 'Wrong Format',
				p: ' ',
			},
			auth: {
				u: ' ',
				p: 'Incorrect username or password',
			}
		},
		rules: {
			username: {
				required: 'Please input your username',
				minLength: 'Username must be at least 3 characters',
				maxLength: 'Username must be less than 20 characters',
			},
			password: {
				required: 'Please input your password',
				minLength: 'Password must be at least 6 characters',
				maxLength: 'Password must be less than 20 characters',
			},
		},
	},
	register: {
		title: 'Register',
		username: 'Username',
		password: 'Password',
		email: 'Email',
		registerBtn: 'Register',
		registerTip: 'Already have an account?',
		error : {
			format: {
				u: ' ',
				p: 'Wrong Format',
				e: '',
			},
			samename: {
				u: 'Username already exists',
				p: '',
				e: '',
			},
			email: {
				u: '',
				p: '',
				e: 'Email format error',
			},
		},
		rules: {
			username: {
				required: 'Please input your username',
				minLength: 'Username must be at least 3 characters',
				maxLength: 'Username must be less than 20 characters',
			},
			password: {
				required: 'Please input your password',
				minLength: 'Password must be at least 6 characters',
				maxLength: 'Password must be less than 20 characters',
			},
			email: {
				format: 'Email format is incorrect',
			},
		},
	},
	error: {
		'401': {
			title: 'Login expiration',
			message: 'Please login again'
		}
	},
	course: {
		school: 'School',
		teacher: 'Teacher',
	},
	message: {
		announcement: {
			'title': 'Announcement',
		},
		notification: {
			'title': 'Notification',
			star: {
				tag: 'star',
				message: 'The course《{0}》has a new review',
			},
			review: {
				tag: 'review',
				message: 'There is a new reply to your comment under the course《{0}》',
			},
			unread: 'unread',
		}
	},
	lang: 'English',
	tag: {
		course: 'course',
		school: 'school',
		teacher: 'teacher',
		tag: 'tag',
	},
	userInfo: {
		userName: 'Username',
		avatar: 'Avatar',
		email: 'Email',
		role: {
			name: 'Role',
			0: 'Visitor',
			1: 'User',
			2: 'Administrator',
		},
		operate: {
			avatar: 'Update avatar',
			email: {
				detail: 'Update email',
				new: 'new email',
				format: 'Wrong Format',
				success: 'Update success',
			},
			password: {
				detail: 'Update password',
				old: 'old password',
				new: 'new password',
				auth: {
					old: 'Please input your current password',
					new: ''
				},
				format: {
					old: '',
					new: 'Wrong Format'
				},
				required: 'Please input your password',
				minLength: 'Password must be at least 6 characters',
				maxLength: 'Password must be less than 20 characters',
				success: 'Update password successfully',
			},
			logout: 'Logout',
			cancel: 'Cancel',
			confirm: 'Confirm',
		}
	},
	manage: {
		user: {
			title: 'User',
			uid: 'User ID',
			username: 'User Name',
			email: 'Email',
			role: {
				label: 'Role',
				0: 'Visitor',
				1: 'User',
				2: 'Administrator',
			},
			last_login: 'Last login',
			operate: {
				title: 'Operations',
				delete: 'Delete',
				cancel: 'Cancel',
				confirm: 'Confirm',
				reload: 'Reload',
			},
		},
		course: {
			title: 'Course',

		},
		announcement: {
			title: 'Announcement',
			
		},
	},
};