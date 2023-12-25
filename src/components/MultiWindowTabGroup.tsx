import { ReactChild } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { TimeInterval } from "src/model/TimeInterval";
import { TimeResolution } from "src/model/TimeResolution";

type MultiWindowTabGroupProps = { children: (interval: TimeInterval, resolution: TimeResolution) => ReactChild };

export const MultiWindowTabGroup = ({ children }: MultiWindowTabGroupProps) => {
    return (
        <Tabs defaultActiveKey="weekly" className="mb-3">
            <Tab eventKey="daily" title="Daily">
                {children(TimeInterval.allTime(), TimeResolution.daily())}
            </Tab>
            <Tab eventKey="weekly" title="Weekly">
                {children(TimeInterval.allTime(), TimeResolution.weekly())}
            </Tab>
            <Tab eventKey="monthly" title="Monthly">
                {children(TimeInterval.allTime(), TimeResolution.monthly())}
            </Tab>
        </Tabs>
    );
};
