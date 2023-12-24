import { PriceRepository } from "src/model/PriceRepository";
import { StockAnalyst } from "src/model/StockAnalyst";
import { TimeInterval } from "src/model/TimeInterval";
import { TimeResolution } from "src/model/TimeResolution";
import { AdviseList } from "./AdviseList";

type AdviseVisualizerProps = {
    repository: PriceRepository;
    analyst: StockAnalyst;
    interval: TimeInterval;
    resolution: TimeResolution;
};

export const AdviseVisualizer = ({ repository, analyst, interval, resolution }: AdviseVisualizerProps) => {
    const advises = repository
        .actions()
        .map(stock =>
            analyst.advise(stock, repository.trendFor(stock.ticker()).forInterval(interval).forResolution(resolution))
        );
    return <AdviseList advises={advises} />;
};
