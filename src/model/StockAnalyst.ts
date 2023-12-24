import { PriceTrend } from "./PriceTrend";

export class StockAnalyst {
    public resistance(trend: PriceTrend) {
        return trend.maxPrice();
    }

    public support(trend: PriceTrend) {
        return trend.minPrice();
    }
}
