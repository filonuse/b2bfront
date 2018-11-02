export interface IAuthModel {
  email: string;
  password: string;
}
export class AuthModel implements IAuthModel {
  constructor() {
    this.email = '';
    this.password = '';
  }
  email: string;
  password: string;
}

export interface IPostModel {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export class PostModel implements IPostModel {
  constructor() {
    this.userId = 0;
    this.id = 0;
    this.title = '';
    this.body = '';
  }
  userId: number;
  id: number;
  title: string;
  body: string;
}

// export const POST_MODEL = new PostModel();
