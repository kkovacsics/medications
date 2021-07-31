export class User {
  [key: string]: any;
  _id?: string = '0';
  name?: string = '';
  email?: string = '';
  password?: string = '';
  role?: number = 1;
  accessToken?: string;
}
