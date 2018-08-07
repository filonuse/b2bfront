export class GoodsModel {
  constructor() {
    this.name = '';
    this.category_id = null;
    this.images = [];
    this.brand = '';
    this.description = '';
    this.price = null;
    this.article = '';
    this.country = '';
    this.quantity_actual = null;
    this.discount = null;
    this.rating = null;
  }
  id?: number;
  category_id: number;
  rating: number;
  name: string;
  brand: string;
  description: string;
  quantity_actual: number;
  price: number;
  discount: number;
  article: string;
  country: string;
  provider: any;
  images: Array<any>;
  to_delete_images: Array<any>;
}
