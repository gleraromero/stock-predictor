export class StockAction {
    private _name: string;
    private _ticker: string;

    constructor(name: string, ticker: string) {
        this._name = name;
        this._ticker = ticker;
    }

    public name() {
        return this._name;
    }

    public ticker() {
        return this._ticker;
    }
}
