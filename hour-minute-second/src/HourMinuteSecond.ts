/**
 * @author James Chan
 */
export abstract class HourMinuteSecond {
    public static SECOND_IN_MINUTE: number = 60
    public static MINUTE_IN_HOUR: number = 60
    public static MILLISECONDS_IN_SECOND: number = 1000
    public static MILLISECONDS_IN_MINUTE: number = 60000
    public static MILLISECONDS_IN_HOUR: number = 3600000

    /**
     * Returns time in milliseconds.
     */
    abstract get ms(): number

    /**
     * Returns the hour.
     */
    abstract get hour(): number

    /**
     * Returns the minute.
     */
    abstract get minute(): number

    /**
     * Returns the second.
     */
    abstract get second(): number

    /**
     * Consumes a time.
     * @param hourMinuteSecond the time to consume.
     */
    abstract consume(hourMinuteSecond: HourMinuteSecond): void
    /**
     * Consumes a time.
     * @param ms time in milliseconds.
     */
    abstract consume(ms: number): void
    /**
     * Consumes a time.
     * @param time hour minute second or time in milliseconds to consume.
     */
    abstract consume(time: number | HourMinuteSecond): void

    /**
     * Extends a time.
     * @param hourMinuteSecond the time to consume.
     */
    abstract extend(hourMinuteSecond: HourMinuteSecond): void
    /**
     * Extends a time.
     * @param ms time in milliseconds to extend.
     */
    abstract extend(ms: number): void
    /**
     * Extends a time.
     * @param time hour minute second or time in milliseconds to extend.
     */
    abstract extend(time: number | HourMinuteSecond): void

    /**
     * Returns a clone object.
     */
    abstract clone(): HourMinuteSecond;

    /**
     * Consumes time in seconds.
     * @param seconds seconds to consume.
     */
    consumeSecond(seconds: number): void {
        this.consume(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Consumes time in minutes;
     * @param minutes minutes to consume.
     */
    consumeMinute(minutes: number): void {
        this.consume(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Consumes time in hours;
     * @param hours hours to consume.
     */
    consumeHour(hours: number): void {
        this.consume(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Extends time in seconds.
     * @param seconds seconds to extend.
     */
    extendSecond(seconds: number): void {
        this.extend(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Extends time in minutes;
     * @param minutes minutes to extend.
     */
    extendMinute(minutes: number): void {
        this.extend(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Extends time in hours;
     * @param hours hours to extend.
     */
    extendHour(hours: number): void {
        this.extend(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Converts this hour minute second to string.
     */
    toString(): string {
        return `${this.hour}:${this.minute}:${this.second}`
    }
}