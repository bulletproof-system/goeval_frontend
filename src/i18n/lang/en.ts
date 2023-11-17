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
				p: ' '
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
			}
		}
	},
	register: {
		title: 'Register',
		registerBtn: 'Register',
		registerTip: 'Already have an account?',
		error : {
			format: {
				u: 'Wrong Format',
				p: ' '
			},
			samename: {
				u: 'Username already exists',
				p: ' ' 
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
};