import { useState } from "react";
import { Form } from "react-bootstrap";
import { PriceRepository } from "src/model/PriceRepository";
import { TimeInterval } from "src/model/TimeInterval";
import { TimeResolution } from "src/model/TimeResolution";
import { TrendChart } from "./TrendChart";

type StockVisualizerProps = {
    priceRepository: PriceRepository;
    interval: TimeInterval;
    resolution: TimeResolution;
};

export const StockVisualizer = ({ priceRepository, interval, resolution }: StockVisualizerProps) => {
    const [selectedAction, setAction] = useState("GSPC");

    const trend = priceRepository.trendFor(selectedAction);

    return (
        <div>
            <Form.Select className="mb-3" onChange={(event: any) => setAction(event.target.value)}>
                {priceRepository.actions().map(action => (
                    <option key={action.ticker()} value={action.ticker()}>
                        {action.name()}
                    </option>
                ))}
            </Form.Select>
            <TrendChart trend={trend.forInterval(interval).forResolution(resolution)} />
        </div>
    );
};
