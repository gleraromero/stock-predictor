import { TimeInterval } from "./TimeInterval";
import { TimeResolution } from "./TimeResolution";
import { Timestamp } from "./Timestamp";

export class PricePoint {
    private _timestamp: Timestamp;
    private _open: number;
    private _close: number;
    private _high: number;
    private _low: number;
    private _volume: number;

    constructor(timestamp: Timestamp, open: number, close: number, high: number, low: number, volume: number) {
        this._timestamp = timestamp;
        this._open = open;
        this._close = close;
        this._high = high;
        this._low = low;
        this._volume = volume;
    }

    public timestamp() {
        return this._timestamp;
    }

    public open() {
        return this._open;
    }

    public close() {
        return this._close;
    }

    public high() {
        return this._high;
    }

    public low() {
        return this._low;
    }

    public volume() {
        return this._volume;
    }
}

export class PriceTrend {
    private _points: PricePoint[];

    constructor(points: PricePoint[]) {
        for (let i = 0; i < points.length - 1; ++i) {
            if (points[i + 1].timestamp().lessEqualThan(points[i].timestamp())) {
                throw new Error("Price points must be monotonous increasing.");
            }
        }
        this._points = points;
    }

    public isEmpty() {
        return this._points.length === 0;
    }

    public points() {
        return this._points;
    }

    public firstPoint() {
        if (this.isEmpty()) {
            throw new Error("Can't retrieve first point from PriceTrend as it is empty.");
        }
        return this._points[0];
    }

    public lastPoint() {
        if (this.isEmpty()) {
            throw new Error("Can't retrieve first point from PriceTrend as it is empty.");
        }
        return this._points[this._points.length - 1];
    }

    public height() {
        return (
            Math.max(...this._points.map(point => point.close())) -
            Math.min(...this._points.map(point => point.close()))
        );
    }

    public forInterval(interval: TimeInterval) {
        return new PriceTrend(this.points().filter(point => interval.includes(point.timestamp())));
    }

    public forResolution(resolution: TimeResolution) {
        const points: PricePoint[] = [];
        for (const point of this.points()) {
            const projectedTs = resolution.project(point.timestamp());
            if (points.length === 0 || !projectedTs.equalTo(points[points.length - 1].timestamp())) {
                points.push(
                    new PricePoint(projectedTs, point.open(), point.close(), point.high(), point.low(), point.volume())
                );
            } else {
                const lastPoint = points[points.length - 1];
                points[points.length - 1] = new PricePoint(
                    lastPoint.timestamp(),
                    lastPoint.open(),
                    point.close(),
                    Math.max(lastPoint.high(), point.high()),
                    Math.min(lastPoint.low(), point.low()),
                    lastPoint.volume() + point.volume()
                );
            }
        }

        return new PriceTrend(points);
    }
}
