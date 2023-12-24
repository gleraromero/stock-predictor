import { PriceTrend } from "./PriceTrend";

export class HeuristicResult {
    private _score: number;
    private _reason: string;

    constructor(score: number, reason: string) {
        this._score = score;
        this._reason = reason;
    }

    public static notEnoughData() {
        return new HeuristicResult(0, "Not enough data to compute heuristic");
    }

    public score() {
        return this._score;
    }

    public reason() {
        return this._reason;
    }
}

export abstract class Heuristic {
    /**
     * Score goes from 0 to 1, where 0 is SELL and 1 is BUY, according to this heuristic
     * The second return output is the reason for the score.
     */
    abstract score(trend: PriceTrend): HeuristicResult;

    public static resistanceDistance() {
        return new ResistanceDistanceHeuristic();
    }
}

class ResistanceDistanceHeuristic extends Heuristic {
    /**
     * Returns a value X where X=1 if the last point is in the support, and X=0 if in the resistance.
     * The rationale behind this heuristic is that the further away from the resistance, the most probable it is for
     * the price to go up again.
     */
    public score(trend: PriceTrend): HeuristicResult {
        // Not enough points to evaluate this heuristic.
        if (trend.pointCount() < 10) {
            return HeuristicResult.notEnoughData();
        }
        const resistance = trend.resistance();
        const support = trend.support();
        const actualPrice = trend.lastPoint().close();
        const distToResistance = (resistance - actualPrice) / (resistance - support);
        const reason = `The price is at ${(100 * distToResistance).toFixed(2)}% from the resistance.`;
        return new HeuristicResult(distToResistance, reason);
    }
}
