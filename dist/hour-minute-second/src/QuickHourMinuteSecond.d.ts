import { HourMinuteSecond } from './HourMinuteSecond';
/**
 * @author James Chan
 */
export declare class QuickHourMinuteSecond extends HourMinuteSecond {
    /**
     * Creates a quick hour minute second.
     * @param ms time in milliseconds.
     */
    constructor(ms: number);
    /**
     * Creates a quick hour minute second.
     * @param hour hours.
     * @param minute minutes.
     * @param second seconds.
     */
    constructor(hour: number, minute: number, second: number);
    /**
     * Milliseconds.
     * @private
     */
    private _ms;
    get ms(): number;
    /**
     * Seconds.
     * @private
     */
    private _second;
    get second(): number;
    /**
     * Minutes.
     * @private
     */
    private _minute;
    get minute(): number;
    /**
     * Hours.
     * @private
     */
    private _hour;
    get hour(): number;
    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds: number): QuickHourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes: number): QuickHourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours: number): QuickHourMinuteSecond;
    consume(hourMinuteSecond: HourMinuteSecond): this;
    consume(ms: number): this;
    extend(hourMinuteSecond: HourMinuteSecond): this;
    extend(ms: number): this;
    clone(): QuickHourMinuteSecond;
    /**
     * Computes hours, minutes, and seconds.
     * @private
     */
    private compute;
}
