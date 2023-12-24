import { Tab, Tabs } from "react-bootstrap";
import { PriceTrend } from "src/model/PriceTrend";
import { TimeInterval } from "src/model/TimeInterval";
import { TrendChart } from "./TrendChart";

type MultiWindowTrendChartProps = { trend: PriceTrend };

export const MultiWindowTrendChart = ({ trend }: MultiWindowTrendChartProps) => {
    return (
        <Tabs defaultActiveKey="1D" className="mb-3">
            <Tab eventKey="1D" title="1D">
                <TrendChart trend={trend.forInterval(TimeInterval.lastDay())} />
            </Tab>
            <Tab eventKey="1M" title="1M">
                <TrendChart trend={trend.forInterval(TimeInterval.lastMonth())} />
            </Tab>
            <Tab eventKey="6M" title="6M">
                <TrendChart trend={trend.forInterval(TimeInterval.lastSixMonths())} />
            </Tab>
            <Tab eventKey="YTD" title="YTD">
                <TrendChart trend={trend.forInterval(TimeInterval.yearToDate())} />
            </Tab>
            <Tab eventKey="1Y" title="1Y">
                <TrendChart trend={trend.forInterval(TimeInterval.lastYear())} />
            </Tab>
            <Tab eventKey="All" title="All">
                <TrendChart trend={trend} />
            </Tab>
        </Tabs>
    );
};
