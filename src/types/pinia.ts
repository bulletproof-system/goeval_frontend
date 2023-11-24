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

export interface CourseInfo {
  id: string;
  name: string;
  school: string;
  teacher: Array<string>;
}

export interface Review {
  username: string;
  avatar: string;
  datetime: string;
  content: string;
  rating: number;
}
