class ItemApiConfig {
  public getById(type, id) {
    return '/' + type + '/' + id;
  }

  public edit(type, id) {
    return '/' + type + '/' + id;
  }
  public delete(type, id) {
    return '/' + type + '/' + id;
  }
  public add(type) {
    return '/' + type;
  }
}

export const ITEM_API = new ItemApiConfig();
