import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core'

export const useThemeConfig = defineStore('themeConfig', {
	state: (): ThemeConfigState => ({
		themeConfig: {
			isLoginScreen: false,
			isDarkMode: false,
		}
	}),
	actions: {
		setThemeConfig(data: ThemeConfigState) {
			this.themeConfig = data.themeConfig;
		},
	},
});

export const isDark = useDark({disableTransition: false});
export const toggleDarkMode = useToggle(isDark);