import api from '@/lib/axios';
import { EditProfileT, LoginT, RegisterT, UserT } from '@/types/User';

export class UserService {
  async register(data: RegisterT): Promise<{ isAuth: boolean } | { message: string }> {
    const res = await api.post('/user/register', data);
    return res.data;
  }
  async login(data: LoginT): Promise<{ isAuth: boolean } | { message: string }> {
    const res = await api.post('/user/login', data);
    return res.data;
  }
  async profile(): Promise<UserT> {
    const res = await api.get('/user/profile');
    return res.data;
  }
  async getUserId(): Promise<{ userId: string }> {
    const res = await api.get('/user/get-userId');
    return res.data;
  }
  async getToken(): Promise<{ token: string }> {
    const res = await api.get('/user/get-token');
    return res.data;
  }
  async findMembers(): Promise<UserT[]> {
    const res = await api.get('/user/members');
    return res.data;
  }
  async editProfile(data: EditProfileT): Promise<UserT | { message: string }> {
    const res = await api.post('/user/profile', data);
    return res.data;
  }
  async githubCallBack(code: string) {
    const res = await api.post(`/user/github/callback?code=${code}`);
    return res.data;
  }
}
export const userService = new UserService();
