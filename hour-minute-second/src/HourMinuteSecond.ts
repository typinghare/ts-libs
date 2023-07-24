export type HourMinuteSecondClass = new(...args: any[]) => HourMinuteSecond;

/**
 * @author James Chan
 */
export abstract class HourMinuteSecond {
    /**
     * The class of creating an instance using HourMinuteSecond.create() and other static methods.
     * @since 1.1.0
     * @private
     */
    private static staticInstantiateClass?: HourMinuteSecondClass = undefined

    // Commonly used constants.
    public static SECOND_IN_MINUTE = 60
    public static MINUTE_IN_HOUR = 60
    public static MILLISECONDS_IN_SECOND = 1000
    public static MILLISECONDS_IN_MINUTE = 60000
    public static MILLISECONDS_IN_HOUR = 3600000

    /**
     * Creates an instance of HourMinuteSecond.
     * @param ms
     */
    public static create(ms: number = 0): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(ms)
    }

    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    public static ofSeconds(seconds: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    public static ofMinutes(minutes: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    public static ofHours(hours: number): HourMinuteSecond {
        return new HourMinuteSecond.staticInstantiateClass!(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Sets the static instantiate class.
     * @param staticInstantiateClass
     */
    public static setStaticInitiateClass(staticInstantiateClass: HourMinuteSecondClass): void {
        HourMinuteSecond.staticInstantiateClass = staticInstantiateClass
    }

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
    abstract consume(hourMinuteSecond: HourMinuteSecond): this
    /**
     * Consumes a time.
     * @param ms time in milliseconds.
     */
    abstract consume(ms: number): this
    /**
     * Consumes a time.
     * @param time hour minute second or time in milliseconds to consume.
     */
    abstract consume(time: number | HourMinuteSecond): this

    /**
     * Extends a time.
     * @param hourMinuteSecond the time to consume.
     */
    abstract extend(hourMinuteSecond: this): this
    /**
     * Extends a time.
     * @param ms time in milliseconds to extend.
     */
    abstract extend(ms: number): this
    /**
     * Extends a time.
     * @param time hour minute second or time in milliseconds to extend.
     */
    abstract extend(time: number | HourMinuteSecond): this

    /**
     * Returns a clone object.
     */
    abstract clone(): HourMinuteSecond;

    /**
     * Consumes time in seconds.
     * @param seconds seconds to consume.
     */
    consumeSecond(seconds: number): this {
        return this.consume(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Consumes time in minutes;
     * @param minutes minutes to consume.
     */
    consumeMinute(minutes: number): this {
        return this.consume(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Consumes time in hours;
     * @param hours hours to consume.
     */
    consumeHour(hours: number): this {
        return this.consume(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Extends time in seconds.
     * @param seconds seconds to extend.
     */
    extendSecond(seconds: number): this {
        return this.extend(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND)
    }

    /**
     * Extends time in minutes;
     * @param minutes minutes to extend.
     */
    extendMinute(minutes: number): this {
        return this.extend(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE)
    }

    /**
     * Extends time in hours;
     * @param hours hours to extend.
     */
    extendHour(hours: number): this {
        return this.extend(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR)
    }

    /**
     * Converts this hour minute second to string.
     * @see moment
     */
    toString(format: string = 'hh:mm:ss'): string {
        const h = this.hour.toString()
        const m = this.minute.toString()
        const s = this.second.toString()
        const hh = h.padStart(2, '0')
        const mm = m.padStart(2, '0')
        const ss = s.padStart(2, '0')

        return format.toLowerCase()
            .replace('hh', hh)
            .replace('mm', mm)
            .replace('ss', ss)
            .replace('h', h)
            .replace('m', m)
            .replace('s', s)
    }
}