import { Form } from "react-bootstrap";
import { StockAction } from "src/model/StockAction";

type StockSelectProps = {
    stocks: StockAction[];
    selectedStock: string;
    onStockSelected: (ticker: string) => void;
};

export const StockSelect = ({ stocks, onStockSelected, selectedStock }: StockSelectProps) => {
    return (
        <Form.Select
            value={selectedStock}
            className="mb-3"
            onChange={(event: any) => onStockSelected(event.target.value)}
        >
            {stocks.map(action => (
                <option key={action.ticker()} value={action.ticker()}>
                    {action.name()}
                </option>
            ))}
        </Form.Select>
    );
};
