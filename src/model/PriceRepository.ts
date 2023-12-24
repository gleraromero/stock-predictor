import GSPCJSON from "assets/GSPC.json";
import UALJSON from "assets/UAL.json";
import { PricePoint, PriceTrend } from "./PriceTrend";
import { StockAction } from "./StockAction";
import { Timestamp } from "./Timestamp";

export class PriceRepository {
    public actions() {
        return [new StockAction("S&P 500", "GSPC"), new StockAction("United Airlines", "UAL")];
    }

    public trendFor(ticker: string) {
        const priceJSON = this.fileFor(ticker);
        const points: PricePoint[] = [];
        for (let i = 0; i < priceJSON.timestamp.length; ++i) {
            points.push(new PricePoint(new Timestamp(new Date(priceJSON.timestamp[i] * 1000)), priceJSON.close[i]));
        }
        return new PriceTrend(points);
    }

    private fileFor(ticker: string) {
        switch (ticker) {
            case "GSPC":
                return GSPCJSON;
            case "UAL":
                return UALJSON;
            default:
                throw new Error(`There is no data for ticket ${ticker}`);
        }
    }
}
