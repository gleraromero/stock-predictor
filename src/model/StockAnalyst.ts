import { InvestmentAdvise, Recommendation } from "./InvestmentAdvise";
import { PriceRepository } from "./PriceRepository";
import { PriceTrend } from "./PriceTrend";

export class StockAnalyst {
    public resistance(trend: PriceTrend) {
        return Math.max(...trend.points().map(point => point.high()));
    }

    public support(trend: PriceTrend) {
        return Math.min(...trend.points().map(point => point.low()));
    }

    public advise(priceRepo: PriceRepository): InvestmentAdvise[] {
        return [
            new InvestmentAdvise(priceRepo.actionForTicker("UAL"), Recommendation.BUY, [
                ">60% below the support for the 1Y period",
                "6M minimum",
            ]),
            new InvestmentAdvise(priceRepo.actionForTicker("GSPC"), Recommendation.SELL, ["All time high"]),
        ];
    }
}
