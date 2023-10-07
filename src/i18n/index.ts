import { createI18n } from 'vue-i18n';
import en from './lang/en';
import zh_cn from './lang/zh_cn';

const messages = {
	en,
	zh_cn
};

export const i18n = createI18n({
	locale: 'en',
	fallbackLocale: 'en',
	messages,
	legacy: false
});


