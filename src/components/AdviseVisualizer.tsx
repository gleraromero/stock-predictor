import { PriceRepository } from "src/model/PriceRepository";
import { StockAnalyst } from "src/model/StockAnalyst";
import { AdviseList } from "./AdviseList";
import { MultiWindowTabGroup } from "./MultiWindowTabGroup";

type AdviseVisualizerProps = { repository: PriceRepository; analyst: StockAnalyst };

export const AdviseVisualizer = ({ repository, analyst }: AdviseVisualizerProps) => {
    return (
        <MultiWindowTabGroup>
            {(interval, resolution) => {
                const advises = repository
                    .actions()
                    .map(stock =>
                        analyst.advise(
                            stock,
                            repository.trendFor(stock.ticker()).forInterval(interval).forResolution(resolution)
                        )
                    );
                return <AdviseList advises={advises} />;
            }}
        </MultiWindowTabGroup>
    );
};
