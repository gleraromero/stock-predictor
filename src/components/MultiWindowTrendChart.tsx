import { Tab, Tabs } from "react-bootstrap";
import { PriceTrend } from "src/model/PriceTrend";
import { TimeInterval } from "src/model/TimeInterval";
import { TimeResolution } from "src/model/TimeResolution";
import { TrendChart } from "./TrendChart";

type MultiWindowTrendChartProps = { trend: PriceTrend };

export const MultiWindowTrendChart = ({ trend }: MultiWindowTrendChartProps) => {
    return (
        <Tabs defaultActiveKey="1M" className="mb-3">
            <Tab eventKey="1M" title="1M">
                <TrendChart trend={trend.forInterval(TimeInterval.lastMonth())} />
            </Tab>
            <Tab eventKey="6M" title="6M">
                <TrendChart
                    trend={trend.forInterval(TimeInterval.lastSixMonths()).forResolution(TimeResolution.weekly())}
                />
            </Tab>
            <Tab eventKey="YTD" title="YTD">
                <TrendChart
                    trend={trend.forInterval(TimeInterval.yearToDate()).forResolution(TimeResolution.weekly())}
                />
            </Tab>
            <Tab eventKey="1Y" title="1Y">
                <TrendChart trend={trend.forInterval(TimeInterval.lastYear()).forResolution(TimeResolution.weekly())} />
            </Tab>
            <Tab eventKey="All" title="All">
                <TrendChart trend={trend.forResolution(TimeResolution.monthly())} />
            </Tab>
        </Tabs>
    );
};
