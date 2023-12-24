import { ReactChild } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { TimeInterval } from "src/model/TimeInterval";
import { TimeResolution } from "src/model/TimeResolution";

type MultiWindowTabGroupProps = { children: (interval: TimeInterval, resolution: TimeResolution) => ReactChild };

export const MultiWindowTabGroup = ({ children }: MultiWindowTabGroupProps) => {
    return (
        <Tabs defaultActiveKey="1M" className="mb-3">
            <Tab eventKey="1M" title="1M">
                {children(TimeInterval.lastMonth(), TimeResolution.daily())}
            </Tab>
            <Tab eventKey="6M" title="6M">
                {children(TimeInterval.lastSixMonths(), TimeResolution.weekly())}
            </Tab>
            <Tab eventKey="YTD" title="YTD">
                {children(TimeInterval.yearToDate(), TimeResolution.weekly())}
            </Tab>
            <Tab eventKey="1Y" title="1Y">
                {children(TimeInterval.lastYear(), TimeResolution.weekly())}
            </Tab>
            <Tab eventKey="All" title="All">
                {children(TimeInterval.allTime(), TimeResolution.monthly())}
            </Tab>
        </Tabs>
    );
};
