import { Timestamp } from "./Timestamp";

export enum Operation {
    BUY = "Buy",
    SELL = "Sell",
}

export class Trade {
    private _timestamp: Timestamp;
    private _operation: Operation;
    private _pricePerUnit: number;
    private _units: number;

    constructor(timestamp: Timestamp, operation: Operation, pricePerUnit: number, units: number) {
        this._timestamp = timestamp;
        this._operation = operation;
        this._pricePerUnit = pricePerUnit;
        this._units = units;
    }

    public timestamp() {
        return this._timestamp;
    }

    public operation() {
        return this._operation;
    }

    public pricePerUnit() {
        return this._pricePerUnit;
    }

    public units() {
        return this._units;
    }

    public totalPrice() {
        return this.units() * this.pricePerUnit();
    }

    public toString() {
        return `${this.operation().valueOf()} ${this.units()} @ ${this.pricePerUnit().toFixed(
            2
        )} (total: $${this.totalPrice().toFixed(2)})`;
    }
}
