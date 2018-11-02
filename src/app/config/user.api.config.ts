class UserApiConfig {
  public getById(id) {
    return '/users/' + id;
  }
}


export const USER_API = new UserApiConfig();
