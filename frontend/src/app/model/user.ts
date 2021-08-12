export class User {
  [key: string]: any;
  _id?: string = '';
  name?: string = '';
  email?: string = '';
  password?: string = '';
  role?: number = 1;
  accessToken?: string;
}
