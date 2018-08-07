class StoresApiUrl {
  public get getAll() {
    return '/client/stores';
  }

  public get addStore() {
    return '/client/stores';
  }
}

export const STORES_API = new StoresApiUrl();
