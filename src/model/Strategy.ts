import { Heuristic } from "./Heuristic";
import { PriceTrend } from "./PriceTrend";
import { TimeInterval } from "./TimeInterval";
import { Timestamp } from "./Timestamp";
import { Operation, Trade } from "./Trade";

export class StrategyResult {
    private _trades: Trade[];
    private _gains: number;
    private _gainPercentage: number;

    constructor(trades: Trade[], gains: number, gainPercentage: number) {
        this._trades = trades;
        this._gains = gains;
        this._gainPercentage = gainPercentage;
    }

    public trades() {
        return this._trades;
    }

    public gains() {
        return this._gains;
    }

    public gainPercentage() {
        return this._gainPercentage;
    }

    public isPositive() {
        return this.gains() > 0;
    }
}

export class Strategy {
    public run(trend: PriceTrend, budget = 10000): StrategyResult {
        const trades: Trade[] = [];
        const heuristic = Heuristic.resistanceDistance();

        const initialBudget = budget;
        let posesionUnits = 0;
        for (const ts of trend.timestamps()) {
            const subtrend = trend.forInterval(new TimeInterval(Timestamp.fromString("1900-01-01"), ts));
            const result = heuristic.score(subtrend);
            if (result.score() > 0.7 && budget > subtrend.lastPoint().close()) {
                // If score is good and we have enough money to buy, then we buy.
                const unitPrice = subtrend.lastPoint().close();
                const unitsToBuy = Math.floor(budget / unitPrice);
                budget -= unitsToBuy * unitPrice;
                posesionUnits += unitsToBuy;
                trades.push(new Trade(subtrend.lastTimestamp(), Operation.BUY, unitPrice, unitsToBuy));
            } else if (result.score() < 0.3 && posesionUnits > 0) {
                // If score is bad, and we have units, we sell.
                const unitPrice = subtrend.lastPoint().close();
                const unitsToSell = posesionUnits;
                budget += unitsToSell * unitPrice;
                posesionUnits = 0;
                trades.push(new Trade(subtrend.lastTimestamp(), Operation.SELL, unitPrice, unitsToSell));
            }
        }

        // Sell remaining units.
        if (posesionUnits > 0) {
            trades.push(new Trade(trend.lastTimestamp(), Operation.SELL, trend.lastPoint().close(), posesionUnits));
            budget += posesionUnits * trend.lastPoint().close();
        }

        return new StrategyResult(trades, budget - initialBudget, (100 * (budget - initialBudget)) / initialBudget);
    }
}
