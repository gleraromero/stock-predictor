import { useState } from "react";
import { Form } from "react-bootstrap";
import { PriceRepository } from "src/model/PriceRepository";
import { MultiWindowTrendChart } from "./MultiWindowTrendChart";

type StockVisualizerProps = {
    priceRepository: PriceRepository;
};

export const StockVisualizer = ({ priceRepository }: StockVisualizerProps) => {
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
            <MultiWindowTrendChart trend={trend} />
        </div>
    );
};
