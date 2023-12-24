import { TimeInterval } from "./TimeInterval";
import { Timestamp } from "./Timestamp";

export class PricePoint {
    private _timestamp: Timestamp;
    private _price: number;

    constructor(timestamp: Timestamp, price: number) {
        this._timestamp = timestamp;
        this._price = price;
    }

    public timestamp() {
        return this._timestamp;
    }

    public price() {
        return this._price;
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

    public minPrice() {
        if (this.isEmpty()) {
            throw new Error("The trendline is empty, there is no minimum price.");
        }
        return Math.min(...this._points.map(point => point.price()));
    }

    public maxPrice() {
        if (this.isEmpty()) {
            throw new Error("The trendline is empty, there is no maximum price.");
        }
        return Math.max(...this._points.map(point => point.price()));
    }

    public points() {
        return this._points;
    }

    public pointCount() {
        return this._points.length;
    }

    public forInterval(interval: TimeInterval) {
        return new PriceTrend(this.points().filter(point => interval.includes(point.timestamp())));
    }

    [Symbol.iterator]() {
        let index = 0;

        // Return the iterator object
        return {
            next: () => {
                if (index < this._points.length) {
                    // Return the next value in the sequence
                    return { value: this._points[index++], done: false };
                } else {
                    // Indicate that the iteration is complete
                    return { done: true };
                }
            },
        };
    }
}
