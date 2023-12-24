import { useState } from "react";
import { PriceRepository } from "src/model/PriceRepository";
import { TimeInterval } from "src/model/TimeInterval";
import { TimeResolution } from "src/model/TimeResolution";
import { StockSelect } from "./StockSelect";
import { TrendChart } from "./TrendChart";

type StockVisualizerProps = {
    priceRepository: PriceRepository;
    interval: TimeInterval;
    resolution: TimeResolution;
};

export const StockVisualizer = ({ priceRepository, interval, resolution }: StockVisualizerProps) => {
    const [selectedStock, setStock] = useState("GSPC");

    const trend = priceRepository.trendFor(selectedStock);

    return (
        <div>
            <StockSelect onStockSelected={setStock} stocks={priceRepository.actions()} />
            <TrendChart trend={trend.forInterval(interval).forResolution(resolution)} />
        </div>
    );
};
