export type HourMinuteSecondClass = new (...args: any[]) => HourMinuteSecond;
/**
 * @author James Chan
 */
export declare abstract class HourMinuteSecond {
    /**
     * The class of creating an instance using HourMinuteSecond.create() and other static methods.
     * @since 1.1.0
     * @private
     */
    private static staticInstantiateClass?;
    static SECOND_IN_MINUTE: number;
    static MINUTE_IN_HOUR: number;
    static MILLISECONDS_IN_SECOND: number;
    static MILLISECONDS_IN_MINUTE: number;
    static MILLISECONDS_IN_HOUR: number;
    /**
     * Creates an instance of HourMinuteSecond.
     * @param ms
     */
    static create(ms?: number): HourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds: number): HourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes: number): HourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours: number): HourMinuteSecond;
    /**
     * Sets the static instantiate class.
     * @param staticInstantiateClass
     */
    static setStaticInitiateClass(staticInstantiateClass: HourMinuteSecondClass): void;
    /**
     * Returns time in milliseconds.
     */
    abstract get ms(): number;
    /**
     * Returns the hour.
     */
    abstract get hour(): number;
    /**
     * Returns the minute.
     */
    abstract get minute(): number;
    /**
     * Returns the second.
     */
    abstract get second(): number;
    /**
     * Consumes a time.
     * @param hourMinuteSecond the time to consume.
     */
    abstract consume(hourMinuteSecond: HourMinuteSecond): this;
    /**
     * Consumes a time.
     * @param ms time in milliseconds.
     */
    abstract consume(ms: number): this;
    /**
     * Consumes a time.
     * @param time hour minute second or time in milliseconds to consume.
     */
    abstract consume(time: number | HourMinuteSecond): this;
    /**
     * Extends a time.
     * @param hourMinuteSecond the time to consume.
     */
    abstract extend(hourMinuteSecond: this): this;
    /**
     * Extends a time.
     * @param ms time in milliseconds to extend.
     */
    abstract extend(ms: number): this;
    /**
     * Extends a time.
     * @param time hour minute second or time in milliseconds to extend.
     */
    abstract extend(time: number | HourMinuteSecond): this;
    /**
     * Returns a clone object.
     */
    abstract clone(): HourMinuteSecond;
    /**
     * Consumes time in seconds.
     * @param seconds seconds to consume.
     */
    consumeSecond(seconds: number): this;
    /**
     * Consumes time in minutes;
     * @param minutes minutes to consume.
     */
    consumeMinute(minutes: number): this;
    /**
     * Consumes time in hours;
     * @param hours hours to consume.
     */
    consumeHour(hours: number): this;
    /**
     * Extends time in seconds.
     * @param seconds seconds to extend.
     */
    extendSecond(seconds: number): this;
    /**
     * Extends time in minutes;
     * @param minutes minutes to extend.
     */
    extendMinute(minutes: number): this;
    /**
     * Extends time in hours;
     * @param hours hours to extend.
     */
    extendHour(hours: number): this;
    /**
     * Converts this hour minute second to string.
     * @see moment
     */
    toString(format?: string): string;
}
