"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HourMinuteSecond = void 0;
/**
 * @author James Chan
 */
class HourMinuteSecond {
    /**
     * Creates an instance of HourMinuteSecond.
     * @param ms
     */
    static create(ms = 0) {
        return new HourMinuteSecond.staticInstantiateClass(ms);
    }
    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds) {
        return new HourMinuteSecond.staticInstantiateClass(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND);
    }
    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes) {
        return new HourMinuteSecond.staticInstantiateClass(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours) {
        return new HourMinuteSecond.staticInstantiateClass(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR);
    }
    /**
     * Sets the static instantiate class.
     * @param staticInstantiateClass
     */
    static setStaticInitiateClass(staticInstantiateClass) {
        HourMinuteSecond.staticInstantiateClass = staticInstantiateClass;
    }
    /**
     * Consumes time in seconds.
     * @param seconds seconds to consume.
     */
    consumeSecond(seconds) {
        return this.consume(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND);
    }
    /**
     * Consumes time in minutes;
     * @param minutes minutes to consume.
     */
    consumeMinute(minutes) {
        return this.consume(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Consumes time in hours;
     * @param hours hours to consume.
     */
    consumeHour(hours) {
        return this.consume(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR);
    }
    /**
     * Extends time in seconds.
     * @param seconds seconds to extend.
     */
    extendSecond(seconds) {
        return this.extend(seconds * HourMinuteSecond.MILLISECONDS_IN_SECOND);
    }
    /**
     * Extends time in minutes;
     * @param minutes minutes to extend.
     */
    extendMinute(minutes) {
        return this.extend(minutes * HourMinuteSecond.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Extends time in hours;
     * @param hours hours to extend.
     */
    extendHour(hours) {
        return this.extend(hours * HourMinuteSecond.MILLISECONDS_IN_HOUR);
    }
    /**
     * Converts this hour minute second to string.
     * @see moment
     */
    toString(format = 'hh:mm:ss') {
        const h = this.hour.toString();
        const m = this.minute.toString();
        const s = this.second.toString();
        const hh = h.padStart(2, '0');
        const mm = m.padStart(2, '0');
        const ss = s.padStart(2, '0');
        return format.toLowerCase()
            .replace('hh', hh)
            .replace('mm', mm)
            .replace('ss', ss)
            .replace('h', h)
            .replace('m', m)
            .replace('s', s);
    }
}
exports.HourMinuteSecond = HourMinuteSecond;
/**
 * The class of creating an instance using HourMinuteSecond.create() and other static methods.
 * @since 1.1.0
 * @private
 */
HourMinuteSecond.staticInstantiateClass = undefined;
// Commonly used constants.
HourMinuteSecond.SECOND_IN_MINUTE = 60;
HourMinuteSecond.MINUTE_IN_HOUR = 60;
HourMinuteSecond.MILLISECONDS_IN_SECOND = 1000;
HourMinuteSecond.MILLISECONDS_IN_MINUTE = 60000;
HourMinuteSecond.MILLISECONDS_IN_HOUR = 3600000;
