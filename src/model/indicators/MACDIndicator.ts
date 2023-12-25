import { EMAIndicator } from "./EMAIndicator";

export class MACDIndicator {
    private _shortEMA: EMAIndicator;
    private _longEMA: EMAIndicator;
    private _signalEMA: EMAIndicator;
    private _values: number[];

    constructor(shortPeriod: number, longPeriod: number, signalPeriod: number) {
        this._shortEMA = new EMAIndicator(shortPeriod);
        this._longEMA = new EMAIndicator(longPeriod);
        this._signalEMA = new EMAIndicator(signalPeriod);
        this._values = [];
    }

    public addPoint(value: number) {
        this._shortEMA.addPoint(value);
        this._longEMA.addPoint(value);
        this._values.push(this._shortEMA.value() - this._longEMA.value());
        this._signalEMA.addPoint(this.macdValue());
    }

    public macdValue() {
        if (this._values.length === 0) {
            throw new Error("MACDIndicator has no points yet.");
        }
        return this._values[this._values.length - 1];
    }

    public signalValue() {
        return this._signalEMA.value();
    }

    public strength() {
        return this.macdValue() - this.signalValue();
    }

    public normalizedStrength() {
        if (Math.abs(this.signalValue() - 0.01) < 0) {
            return 0;
        }
        return (this.macdValue() - this.signalValue()) / Math.abs(this.signalValue());
    }

    public isBullish() {
        return this.strength() > 0;
    }

    public isReversion() {
        if (this._values.length < 2) {
            return false;
        }
        const prevValue = this._values[this._values.length - 2];
        const crossSignalDownward = prevValue > this.signalValue() && this.macdValue() <= this._signalEMA.prevValue();
        const crossSignalUpward = prevValue < this.signalValue() && this.macdValue() >= this._signalEMA.prevValue();
        return crossSignalDownward || crossSignalUpward;
    }
}
