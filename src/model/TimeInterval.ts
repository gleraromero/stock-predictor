import { Timestamp } from "./Timestamp";

/**
 * Start and end are included in the interval.
 */
export class TimeInterval {
    private _start: Timestamp;
    private _end: Timestamp;

    constructor(start: Timestamp, end: Timestamp) {
        if (!start.lessEqualThan(end)) {
            throw new Error("When building a TimeInterval, the start must be less equal than the end");
        }
        this._start = start;
        this._end = end;
    }

    public static lastDay() {
        const yesterdayStart = new Date();
        yesterdayStart.setDate(new Date().getDate() - 1);
        yesterdayStart.setHours(0, 0, 0, 0);

        return new TimeInterval(new Timestamp(yesterdayStart), Timestamp.now());
    }

    public static lastMonth() {
        const lastMonthStart = new Date();
        lastMonthStart.setDate(new Date().getDate() - 30);
        lastMonthStart.setHours(0, 0, 0, 0);

        return new TimeInterval(new Timestamp(lastMonthStart), Timestamp.now());
    }

    public static lastSixMonths() {
        const lastSixMonthsStart = new Date();
        lastSixMonthsStart.setDate(new Date().getDate() - 30 * 6);
        lastSixMonthsStart.setHours(0, 0, 0, 0);

        return new TimeInterval(new Timestamp(lastSixMonthsStart), Timestamp.now());
    }

    public static lastYear() {
        const lastYearStart = new Date();
        lastYearStart.setDate(new Date().getDate() - 365);
        lastYearStart.setHours(0, 0, 0, 0);

        return new TimeInterval(new Timestamp(lastYearStart), Timestamp.now());
    }

    public static yearToDate() {
        const yearStart = new Date();
        yearStart.setMonth(0);
        yearStart.setDate(1);
        yearStart.setHours(0, 0, 0, 0);

        return new TimeInterval(new Timestamp(yearStart), Timestamp.now());
    }

    public includes(ts: Timestamp) {
        return this._start.lessEqualThan(ts) && ts.lessEqualThan(this._end);
    }

    public start() {
        return this._start;
    }

    public end() {
        return this._end;
    }
}
