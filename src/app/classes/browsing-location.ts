export class BrowsingLocation {

    constructor(nick, name) {
        this.update(nick, name);
    }

    private _flagUrl : string;
    private _mapUrl : string;
    private _nick : string;
    private _name : string;

    update(nick: string, name: string) {
        this._flagUrl = "assets/imgs/icons/flags/" + nick + ".svg";
        this._mapUrl = "assets/imgs/map-" + nick + ".svg";
        this._nick = nick;
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

    get nick() : string {
        return this._nick;
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

    set nick(nick : string) {
        this._notAllowed();
    }

    set name(name : string) {
        this._notAllowed();
    }


}
