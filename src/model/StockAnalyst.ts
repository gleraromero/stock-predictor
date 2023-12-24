import { Heuristic } from "./Heuristic";
import { InvestmentAdvise, scoreToRecommendation } from "./InvestmentAdvise";
import { PriceTrend } from "./PriceTrend";
import { StockAction } from "./StockAction";

export class StockAnalyst {
    public advise(stock: StockAction, trend: PriceTrend): InvestmentAdvise {
        const result = Heuristic.resistanceDistance().score(trend);
        const recommendation = scoreToRecommendation(result.score());
        return new InvestmentAdvise(stock, recommendation, [result.reason()]);
    }
}
