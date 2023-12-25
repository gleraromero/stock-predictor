import { PriceRepository } from "./PriceRepository";
import { Strategy, StrategyResult } from "./Strategy";
import { TimeInterval } from "./TimeInterval";

export class StrategyEvaluation {
    private _results: { [ticker: string]: StrategyResult };
    private _medianGains: number;
    private _medianGainsPercentage: number;

    constructor(results: { [ticker: string]: StrategyResult }, budget: number) {
        this._results = results;
        const gains = [];
        for (const result of Object.values(results)) {
            gains.push(result.gains());
        }
        gains.sort();

        this._medianGains = gains[Math.floor(gains.length / 2)];
        this._medianGainsPercentage = (100.0 * this._medianGains) / budget;
    }

    public resultFor(ticker: string) {
        return this._results[ticker];
    }

    public medianGains() {
        return this._medianGains;
    }

    public medianGainsPercentage() {
        return this._medianGainsPercentage;
    }
}

export class StrategyEvaluator {
    private _repo: PriceRepository;

    constructor(repo: PriceRepository) {
        this._repo = repo;
    }

    public evaluate(strategy: Strategy, interval: TimeInterval, budget: number) {
        const results: { [ticker: string]: StrategyResult } = {};
        for (const action of this._repo.actions()) {
            const trend = this._repo.trendFor(action.ticker()).forInterval(interval);
            const result = strategy.run(trend, budget);
            results[action.ticker()] = result;
        }
        return new StrategyEvaluation(results, budget);
    }
}
