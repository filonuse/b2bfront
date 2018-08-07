export class ClientsModel {
  public id: number;
  public banned: boolean;
  public email: string;
  public legal_name: number;
  public name: number;
  public official_data: number;
  public phone: number;
  public requisites: number;
  public role: number;
  public rating: number;
  public addreses: number;
}

export class ProvidersModel extends ClientsModel {
  public categories: Array<any>;
}
