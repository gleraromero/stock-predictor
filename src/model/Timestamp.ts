export class Timestamp {
    private _datetime: Date;

    constructor(datetime: Date) {
        this._datetime = datetime;
    }

    public static now() {
        return new Timestamp(new Date());
    }

    public static fromString(timestampString: string) {
        return new Timestamp(new Date(timestampString));
    }

    public static middlePoint(ts1: Timestamp, ts2: Timestamp) {
        return new Timestamp(new Date((ts2._datetime.getTime() + ts1._datetime.getTime()) / 2));
    }

    public lessEqualThan(anotherTs: Timestamp) {
        return this._datetime < anotherTs._datetime;
    }

    public toString() {
        return this._datetime.toISOString();
    }
}
