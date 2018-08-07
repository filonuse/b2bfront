class LoginUrlConfig {

  public get logIn() {
    return '/login';
  }

  public get logOut() {
    return '/logout';
  }
}

export const LOGIN_API = new LoginUrlConfig();
