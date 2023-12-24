import { StockAction } from "./StockAction";

export enum Recommendation {
    STRONG_BUY = "Strong Buy",
    BUY = "Buy",
    HOLD = "Hold",
    UNDERPERFORM = "Underperform",
    SELL = "Sell",
}

export const scoreToRecommendation = (score: number) => {
    if (score > 0.8) {
        return Recommendation.STRONG_BUY;
    } else if (score > 0.6) {
        return Recommendation.BUY;
    } else if (score > 0.4) {
        return Recommendation.HOLD;
    } else if (score > 0.2) {
        return Recommendation.UNDERPERFORM;
    } else {
        return Recommendation.SELL;
    }
};
export class InvestmentAdvise {
    private _stock: StockAction;
    private _recommendation: Recommendation;
    private _reasons: string[];

    constructor(stock: StockAction, recommendation: Recommendation, reasons: string[]) {
        this._stock = stock;
        this._recommendation = recommendation;
        this._reasons = reasons;
    }

    public stock() {
        return this._stock;
    }

    public recommendation() {
        return this._recommendation;
    }

    public reasons() {
        return this._reasons;
    }
}
