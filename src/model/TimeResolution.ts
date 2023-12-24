import { Timestamp } from "./Timestamp";

export class TimeResolution {
    private _project: (ts: Timestamp) => Timestamp;
    constructor(project: (ts: Timestamp) => Timestamp) {
        this._project = project;
    }

    public project(ts: Timestamp): Timestamp {
        return this._project(ts);
    }

    public static timestamp() {
        return new TimeResolution((ts: Timestamp) => {
            return ts;
        });
    }

    public static daily() {
        return new TimeResolution((ts: Timestamp) => {
            return Timestamp.at(ts.year(), ts.month(), ts.day());
        });
    }

    public static weekly() {
        return new TimeResolution((ts: Timestamp) => {
            return Timestamp.at(ts.year(), ts.month(), ts.day() - (ts.day() % 7));
        });
    }

    public static monthly() {
        return new TimeResolution((ts: Timestamp) => {
            return Timestamp.at(ts.year(), ts.month(), 1);
        });
    }
}
