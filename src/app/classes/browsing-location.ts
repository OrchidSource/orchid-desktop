import { default as countries } from '../data/countries.json';

var AVAILABLE_BROWSING_LOCATIONS: BrowsingLocation[] = [];

export class BrowsingLocation {

  constructor(code, name) {
    this.update(code, name);
  }

  private _flagUrl: string;

  /**
   *  the ISO 3166 country code
   */
  private _code: string;
  private _name: string;

  update(code: string, name: string) {
    this._flagUrl = "assets/imgs/icons/flags/" + code + ".svg";
    this._code = code;
    this._name = name;
  }

  private _notAllowed() {
    throw "Individual setting now allowed. Use the update method";
  }

  get flagUrl(): string {
    return this._flagUrl;
  }

  get code(): string {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  set flagUrl(newflagUrl: string) {
    this._notAllowed();
  }

  set code(code: string) {
    this._notAllowed();
  }

  set name(name: string) {
    this._notAllowed();
  }

  static getLocations() {
    return AVAILABLE_BROWSING_LOCATIONS;
  };
}

if (!countries.length) {
  throw "no countries!";
}

// populate the available browsing locations
countries.forEach((c) => {
  AVAILABLE_BROWSING_LOCATIONS.push(new BrowsingLocation(c['alpha-2'], c.name));
});

console.log('HERRE');
console.log(AVAILABLE_BROWSING_LOCATIONS);
