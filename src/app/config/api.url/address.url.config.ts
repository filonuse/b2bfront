class AddressUrlConfig {
  public autocomplete(searchString) {
    return '/address/autocomplete?input=' + searchString.toString();
  }

  public getCoords(placeId) {
    return '/address/details?place_id=' + placeId.toString();
  }
}

export const ADDRESS_API = new AddressUrlConfig();
