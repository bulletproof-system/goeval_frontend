import { createI18n } from 'vue-i18n';
import en from './lang/en';
import zh_cn from './lang/zh_cn';

const messages = {
	en,
	zh_cn
};

const dateTimeFormats = {
	'en': {
		long: {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		weekday: 'long',
		hour: 'numeric',
		minute: 'numeric'
		}
	},
	'zh_cn': {
		long: {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			weekday: 'long',
			hour: 'numeric',
			minute: 'numeric',
			hour12: true
		}
	}
  }

export const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
	dateTimeFormats,
	legacy: false
});


