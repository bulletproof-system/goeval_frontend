export interface ThemeConfig {
  showLoginPanel: boolean;
}

export interface UserInfo {
  login: boolean;
  userName: string | undefined;
  avatar: string | undefined;
  email: string | undefined;
  permission: [string] | undefined;
}
