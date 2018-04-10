export class BrowsingLocation {

    constructor(code, name) {
        this.update(code, name);
    }

    private _flagUrl : string;
    private _mapUrl : string;

    /**
     *  the ISO 3166 country code
     */
    private _code : string;
    private _name : string;

    update(code: string, name: string) {
        this._flagUrl = "assets/imgs/icons/flags/" + code + ".svg";
        this._mapUrl = "assets/imgs/map-" + code + ".svg";
        this._code = code;
        this._name = name;
    }

    private _notAllowed() {
        throw "Individual setting now allowed. Use the update method";
    }

    get flagUrl() : string {
        return this._flagUrl;
    }

    get mapUrl() : string {
        return this._mapUrl;
    }

    get code() : string {
        return this._code;
    }

    get name() : string {
        return this._name;
    }

    set flagUrl(newflagUrl : string) {
        this._notAllowed();
    }

    set mapUrl(newMapUrl : string) {
        this._notAllowed();
    }

    set code(code : string) {
        this._notAllowed();
    }

    set name(name : string) {
        this._notAllowed();
    }
}
