class ProfileUrlConfig {

  public getById(userId) {
    return userId === 1 ? '/admin/profile/' + userId : '/client/profile/' + userId;
  }
  public get update() {
    return '/client/profile/';
  }
}

export const PROFILE_API = new ProfileUrlConfig();
