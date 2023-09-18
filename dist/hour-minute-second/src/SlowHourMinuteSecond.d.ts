import { HourMinuteSecond } from './HourMinuteSecond';
/**
 * @author James Chan
 */
export declare class SlowHourMinuteSecond extends HourMinuteSecond {
    /**
     * Creates a slow hour minute second.
     * @param ms time in milliseconds.
     */
    constructor(ms: number);
    /**
     * Milliseconds.
     * @private
     */
    private _ms;
    get ms(): number;
    get hour(): number;
    get minute(): number;
    get second(): number;
    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds: number): SlowHourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes: number): SlowHourMinuteSecond;
    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours: number): SlowHourMinuteSecond;
    consume(hourMinuteSecond: HourMinuteSecond): this;
    consume(ms: number): this;
    extend(hourMinuteSecond: HourMinuteSecond): this;
    extend(ms: number): this;
    clone(): SlowHourMinuteSecond;
}
