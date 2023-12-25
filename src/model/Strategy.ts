import { Position } from "./Position";
import { PriceTrend } from "./PriceTrend";
import { Operation, Trade } from "./Trade";
import { MACDIndicator } from "./indicators/MACDIndicator";
import { SupportResistanceIndicator } from "./indicators/SupportResistanceIndicator";

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
        const points = trend.points();

        const macdIndicator = new MACDIndicator(12, 24, 9);
        const srIndicator = new SupportResistanceIndicator(90);

        const position = new Position(budget);
        for (let i = 0; i < points.length; ++i) {
            const point = points[i];
            macdIndicator.addPoint(point.close());
            srIndicator.addPoint(point.close());
            if (
                srIndicator.normalizedDistanceToResistance() > 0.7 &&
                macdIndicator.isBullish() &&
                position.available() > point.close()
            ) {
                const unitPrice = point.close();
                const unitsToBuy = Math.floor(position.available() / unitPrice);
                position.operate(new Trade(point.timestamp(), Operation.BUY, unitPrice, unitsToBuy));
            } else if (
                srIndicator.normalizedDistanceToResistance() < 0.3 &&
                !macdIndicator.isBullish() &&
                position.unitsInPossesion() > 0
            ) {
                const unitsToSell = position.unitsInPossesion();
                position.operate(new Trade(point.timestamp(), Operation.SELL, point.close(), unitsToSell));
            }
        }

        // Sell remaining units.
        if (position.unitsInPossesion() > 0) {
            position.operate(
                new Trade(trend.lastTimestamp(), Operation.SELL, trend.lastPoint().close(), position.unitsInPossesion())
            );
        }

        return new StrategyResult(
            position.trades(),
            position.available() - budget,
            (100 * (position.available() - budget)) / budget
        );
    }
}
