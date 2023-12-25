export class SupportResistanceIndicator {
    private _period: number;
    private _values: number[];
    private _support: number;
    private _ressistance: number;

    constructor(period: number = Infinity) {
        this._values = [];
        this._period = period;
        this._support = Infinity;
        this._ressistance = -Infinity;
    }

    public addPoint(value: number) {
        this._values.push(value);
        if (value > this._ressistance) {
            this._ressistance = value;
        }
        if (value < this._support) {
            this._support = value;
        }
        if (this._values.length > this._period) {
            const oldest = this._values.shift();
            if (oldest === this._ressistance) {
                this._ressistance = Math.max(...this._values);
            }
            if (oldest === this._support) {
                this._support = Math.min(...this._values);
            }
        }
    }

    public support() {
        return this._support;
    }

    public resistance() {
        return this._ressistance;
    }

    public normalizedDistanceToResistance() {
        const value = this._values[this._values.length - 1];
        return (this.resistance() - value) / (this.resistance() - this.support());
    }
}
