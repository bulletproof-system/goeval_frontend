export default {
	user: {
		username: 'username',
		password: 'password',
	},
	search: {
		placeholder: 'Query course information',
	},
	home: {
		empty: 'No course information',
		recommend: 'Recommend',
	},
	star: {
		empty: 'No course information'
	},
	topBar: {
		home: 'Home',
		star: 'Star',
		manage: 'Manage',
		user: {
			login: 'login',
			logout: 'logout',
			center: 'center'
		},
		courseInfo: 'Course Info',
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
		error: {
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
			avatar: {
				detail: 'Update avatar',
				success: 'Update success',
				type: 'Avatar picture must be jpeg, jpg, png, gif format!',
				size: 'Avatar picture size can not exceed 2MB!'
			},
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
		pagination: {
			total: 'Total {0}, filtered {1}',
			jump: 'Go to',
			page: '',
		},
		taglist: {
			new: '+ New'
		},
		user: {
			title: 'User',
			uid: 'User ID',
			username: 'User Name',
			email: 'Email',
			role: {
				label: 'Role',
				0: 'Visitor',
				1: 'User',
				2: 'Admin',
			},
			last_login: 'Last login',
			operate: {
				title: 'Operations',
				delete: {
					label: 'Delete',
					confirm: 'Are you sure to delete this user?',
					success: 'Delete success',
				},
				set: {
					label: 'Set admin',
					confirm: 'Are you sure to set this user as admin?',
					success: 'Set admin success',
				},
				unset: {
					label: 'Unset admin',
					confirm: 'Are you sure to unset this user as admin?',
					success: 'Unset admin success',
				},
				email: {
					label: 'Update email',
					format: 'Wrong Format',
					success: 'Update email success',
				},
				password: {
					label: 'Update password',
					required: 'Please input password',
					minLength: 'Password must be at least 6 characters',
					maxLength: 'Password must be less than 20 characters',
					format: 'Wrong Format',
					success: 'Update password successfully',
				},
			},
		},
		course: {
			title: 'Course',
			cid: 'Course ID',
			name: 'Course Name',
			school: 'School',
			teacher: 'Teacher',
			tag: 'Tag',
			description: 'Description',
			operate: {
				title: 'Operations',
				delete: {
					label: 'Delete',
					confirm: 'Are you sure to delete this course?',
					success: 'Delete success',
				},
				edit: {
					label: 'Edit',
					new: '+ New',
					success: 'Edit success',
				},
				detail: {
					label: 'Detail',
					success: 'Detail success',
				},
				add: {
					label: 'Add',
					success: 'Add success',
				},
			}
		},
		announcement: {
			title: 'Announcement',
			aid: 'Announcement ID',
			title_: 'Title',
			content: 'Content',
			datetime: 'Create Time',
			operate: {
				title: 'Operations',
				delete: {
					label: 'Delete',
					confirm: 'Are you sure to delete this announcement?',
					success: 'Delete success',
				},
				edit: {
					label: 'Edit',
					success: 'Edit success',
				},
				add: {
					label: 'Add',
					success: 'Add success',
				}
			}
		},
		teacher: {
			title: 'Teacher',
			tid: 'Teacher ID',
			name: 'Teacher Name',
			operate: {
				title: 'Operations',
				delete: {
					label: 'Delete',
					confirm: 'Are you sure to delete this teacher?',
					success: 'Delete success',
				},
				edit: {
					label: 'Edit',
					success: 'Edit success',
				},
				add: {
					label: 'Add',
					success: 'Add success',
				}
			}
		},
		tag: {
			title: 'Tag',
			tid: 'Tag ID',
			name: 'Tag Name',
			operate: {
				title: 'Operations',
				delete: {
					label: 'Delete',
					confirm: 'Are you sure to delete this teacher?',
					success: 'Delete success',
				},
				edit: {
					label: 'Edit',
					success: 'Edit success',
				},
				add: {
					label: 'Add',
					success: 'Add success',
				}
			}
		},
		cancel: 'Cancel',
		confirm: 'Confirm',
		reload: 'Reload',
		invaild: 'Invaild Operation',
	},
	reviewBlock: {
		title: "Review",
		datetime: "Date and Time",
		reply: "Reply",
		comments: "Comments",
		textarea: "Write your content here...",
		confirmClose: "Your comment has not been submitted yet, confirm to close?",
		emptyContent: "Comment content cannot be empty",
		replySuccess: "Reply successfully",
		replyFail: "Reply failed",
		cancel: 'Cancel',
		confirm: 'Confirm',
		success: 'operation success',
		fail: 'operation failed',
	},
	infoBlock: {
		school: 'School',
		teacher: 'Teacher',
		star: 'Star',
		content: 'Content',
		description: 'Course Description',
		starCourse: 'Star Course',
		submitReview: 'Submit Review',
		textarea: 'Write your content...',
		starSuccess: 'Starred Successfully',
		starCancel: 'Cancel Star',
		confirmClose: 'Your review has not been submitted, confirm closing?',
		emptyContent: 'Review content cannot be empty',
		emptyStar: 'Star rating cannot be empty',
		reviewSuccess: 'Review submitted successfully',
		reviewFail: 'You have already submitted a review',
		cancel: 'Cancel',
		confirm: 'Confirm',
		cancelStar: 'Canceled Star',
	}
};