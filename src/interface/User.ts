export interface User {
  _id: string;
  username: string;
  password: string;
  email?: string;
  avatar?: string;
  role?: number;
  profile?: string;
  createTime: Date;
  updateTime: Date;
}
