export class TimeDelta {
    private _ticks: number;
    constructor(ticks: number) {
        this._ticks = ticks;
    }

    public static days(count: number) {
        return new TimeDelta(count * 86400000);
    }

    public static hours(count: number) {
        return new TimeDelta(count * 3600000);
    }

    public ticks() {
        return this._ticks;
    }
}

export class Timestamp {
    private _datetime: Date;

    constructor(ticks: number) {
        this._datetime = new Date(ticks);
    }

    public static at(year: number, month: number, day: number, hours = 0, minutes = 0, seconds = 0, milliseconds = 0) {
        return Timestamp.fromDate(new Date(year, month - 1, day, hours, minutes, seconds, milliseconds));
    }

    public static fromDate(datetime: Date) {
        return new Timestamp(datetime.getTime());
    }

    public static now() {
        return Timestamp.fromDate(new Date());
    }

    public static fromString(timestampString: string) {
        return Timestamp.fromDate(new Date(timestampString));
    }

    public static middlePoint(ts1: Timestamp, ts2: Timestamp) {
        return Timestamp.fromDate(new Date((ts2._datetime.getTime() + ts1._datetime.getTime()) / 2));
    }

    public year() {
        return this._datetime.getFullYear();
    }

    public month() {
        return this._datetime.getMonth() + 1;
    }

    public day() {
        return this._datetime.getDate();
    }

    public hours() {
        return this._datetime.getHours();
    }

    public minutes() {
        return this._datetime.getMinutes();
    }

    public seconds() {
        return this._datetime.getSeconds();
    }

    public milliseconds() {
        return this._datetime.getMilliseconds();
    }

    public ticks() {
        return this._datetime.getTime();
    }

    public lessEqualThan(anotherTs: Timestamp) {
        return this._datetime < anotherTs._datetime;
    }

    public equalTo(anotherTs: Timestamp) {
        return this._datetime.getTime() == anotherTs._datetime.getTime();
    }

    public toString() {
        return this._datetime.toISOString();
    }

    public toDateString() {
        return this._datetime.toISOString().substring(0, 10);
    }

    public minus(delta: TimeDelta) {
        return new Timestamp(this._datetime.getTime() - delta.ticks());
    }
}
