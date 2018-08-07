class UsersUrlConfig {

  public getAll(role) {
    return localStorage.getItem('userRole') === 'admin' ? '/admin' + '/users?role=' + role : '/client' + '/users?role=' + role;
  }

  public update(id) {
    return '/admin/users/' + id;
  }
  public byId(id) {
    return '/client/users/' + id;
  }
  public updateByClient(id) {
    return '/client/users/' + id;
  }

  public remove(id) {
    return '/admin/users/' + id;
  }

  public ban(id) {
    return '/admin/user/' + id;
  }
}

export const USERS_API = new UsersUrlConfig();
