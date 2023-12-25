export class EMAIndicator {
    private _values: number[];
    private _period: number;
    private _multiplier: number;

    constructor(period: number) {
        this._values = [];
        this._period = period;
        this._multiplier = 2 / (this._period + 1);
    }

    public addPoint(value: number) {
        if (this._values.length === 0) {
            this._values.push(value);
            return;
        }
        const prevValue = this._values[this._values.length - 1];
        this._values.push((value - prevValue) * this._multiplier + prevValue);
    }

    public prevValue() {
        if (this._values.length < 2) {
            throw new Error("EMAIndicator needs 2 points to access the previous value.");
        }
        return this._values[this._values.length - 2];
    }

    public value() {
        if (this._values.length === 0) {
            throw new Error("EMAIndicator has no points yet.");
        }
        return this._values[this._values.length - 1];
    }
}
