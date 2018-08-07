class GoodsUrlConfig {
  public get getAll() {
    return '/client/goods';
  }

  public get add() {
    return '/client/goods';
  }

  public update(id) {
    return '/client/goods/' + id;
  }
  public remove(id) {
    return '/client/goods/' + id;
  }
}

export const GOODS_API = new GoodsUrlConfig();
