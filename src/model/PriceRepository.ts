import quotesJSON from "assets/quotes.json";
import { PricePoint, PriceTrend } from "./PriceTrend";
import { StockAction } from "./StockAction";
import { Timestamp } from "./Timestamp";

export class PriceRepository {
    private _quotes: any;
    private _actions: StockAction[];

    public static fromFile() {
        return new PriceRepository(quotesJSON);
    }

    constructor(quotes: any) {
        this._quotes = quotes;
        this._actions = Object.keys(quotes)
            .map(ticker => new StockAction(ticker, (quotesJSON as any)[ticker].name))
            .filter(action => action.ticker() != undefined);
        this._actions.sort((a, b) => a.name().localeCompare(b.name()));
    }

    public actions() {
        return this._actions;
    }

    public actionForTicker(ticker: string): StockAction {
        const action = this.actions().find(action => action.ticker() == ticker);
        if (!action) {
            throw new Error(`The stock with ticker '${ticker}' does not exist in the price repository.`);
        }
        return action;
    }

    public trendFor(ticker: string) {
        const quote = this._quotes[ticker];
        if (!quote) {
            throw new Error(`There is no data for ticker ${ticker}`);
        }

        const points: PricePoint[] = [];
        for (let i = 0; i < quote.timestamp.length; ++i) {
            if (quote.close[i]) {
                points.push(
                    new PricePoint(
                        Timestamp.fromDate(new Date(quote.timestamp[i] * 1000)),
                        quote.open[i],
                        quote.close[i],
                        quote.high[i],
                        quote.low[i],
                        quote.volume[i]
                    )
                );
            }
        }
        return new PriceTrend(points);
    }
}
