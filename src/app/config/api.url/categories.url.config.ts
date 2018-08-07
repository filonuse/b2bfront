class CategoriesUrlConfig {
  public get getAll() {
    return '/admin/categories';
  }

  public update(id) {
    return '/admin/categories/' + id;
  }

  public get add() {
    return '/admin/categories';
  }

  public remove(id) {
    return '/admin/categories/' + id;
  }

  public catalogs(catalog: string) {
    return '/catalogs/' + catalog;
  }
}

export const CATEGORIES_API = new CategoriesUrlConfig();
