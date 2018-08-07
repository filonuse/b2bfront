class RoutesUrlConfig {
  public get getAll() {
    return '/client/routes';
  }

  public get addRoute() {
    return '/client/routes';
  }
}

export const ROUTES_API = new RoutesUrlConfig();
