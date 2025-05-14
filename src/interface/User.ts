export interface User {
  id: string;
  username: string;
  password: string;
  email?: string;
  avatar?: string;
  role?: number;
  profile?: string;
  createTime: Date;
  updateTime: Date;
  accessToken: string;
  refreshToken: string;
}
