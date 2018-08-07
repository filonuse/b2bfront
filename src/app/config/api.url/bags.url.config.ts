class BagsUrlConfig {

  public get getBag() {
    return '/client/bags';
  }

  public get getCount() {
    return '/client/bags/goods/count';
  }

  public remove(bag) {
    return '/client/bags/' + bag.id + '?goods_id=' + bag.goods_id;
  }
}

export const BAGS_API = new BagsUrlConfig();
