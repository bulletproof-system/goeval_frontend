import { defineStore } from 'pinia';
import { useDark, useToggle } from '@vueuse/core'

export const useThemeConfig = defineStore('themeConfig', {
	state: (): ThemeConfig => ({
		showLoginPanel: false,
	}),
	actions: {
		setThemeConfig(data: ThemeConfig) {
			this.$patch(data);
		},
		setShowLoginPanel(show: boolean) {
			this.showLoginPanel = show;
		}
	},
});

export const isDark = useDark({disableTransition: false});
export const toggleDarkMode = useToggle(isDark);