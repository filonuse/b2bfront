class ReviewsUrlConfig {
  public get getAll() {
    return '/client/reviews/';
  }

  public getById(id, type?) {
    const ableType = type ? 'user' : 'goods';
    return '/client/reviews' + '?able_type=' + ableType + '&able_id=' + id;
  }

  public get add() {
    return '/client/reviews';
  }

  public getSolo(id) {
    return '/client/reviews/' + id;
  }
}

export const REVIEWS_API = new ReviewsUrlConfig();
