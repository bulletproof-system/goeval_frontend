export default {
	user: {
		username: 'username',
		password: 'password',
	},
	search: {
		placeholder: 'Query course information',
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
	},
	lang: 'English',
};