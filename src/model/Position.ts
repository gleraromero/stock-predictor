import { Operation, Trade } from "./Trade";

export class Position {
    private _available: number;
    private _trades: Trade[];
    private _positionUnits: number;

    constructor(investment: number) {
        this._available = investment;
        this._positionUnits = 0;
        this._trades = [];
    }

    public operate(trade: Trade) {
        if (trade.operation() == Operation.BUY) {
            if (trade.totalPrice() > this._available) {
                throw new Error(`Can't perform BUY trade: (${trade.totalPrice()} > ${this._available})`);
            }
            this._available -= trade.totalPrice();
            this._positionUnits += trade.units();
        } else if (trade.operation() == Operation.SELL) {
            if (trade.units() > this._positionUnits) {
                throw new Error(`Can't perform SELL trade: (${trade.units()} > ${this._positionUnits})`);
            }
            this._available += trade.totalPrice();
            this._positionUnits -= trade.units();
        }
        this._trades.push(trade);
    }

    public unitsInPossesion() {
        return this._positionUnits;
    }

    public available() {
        return this._available;
    }

    public trades() {
        return this._trades;
    }
}
