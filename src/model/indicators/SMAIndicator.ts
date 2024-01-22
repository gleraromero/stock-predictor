/**
 * In finance, a moving average (MA) is a stock indicator commonly used in technical analysis.
 * The reason for calculating the moving average of a stock is to help smooth out the price data
 * by creating a constantly updated average price. By calculating the moving average,
 * the impacts of random, short-term fluctuations on the price of a stock over a specified
 * time frame are mitigated. Simple moving averages (SMAs) use a simple arithmetic average of
 * prices over some timespan.
 */
export class SMAIndicator {
    private _values: number[];
    private _period: number;

    constructor(period: number) {
        this._values = [];
        this._period = period;
    }

    public addPoint(value: number) {
        this._values.push(value);
        if (this._values.length > this._period) {
            this._values.shift();
        }
    }

    public value() {
        if (this._values.length < this._period) {
            throw new Error("SMAIndicator does not have enough points yet.");
        }
        return this._values.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this._period;
    }
}
