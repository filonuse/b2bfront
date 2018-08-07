class NotificationsUrlConfig {
  public get getAll() {
    return '/client/notifications';
  }

  public update(id) {
    return '/client/notifications/' + id;
  }
}

export const NOTIFICATIONS_API = new NotificationsUrlConfig();
