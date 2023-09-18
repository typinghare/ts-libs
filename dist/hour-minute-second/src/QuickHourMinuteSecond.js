"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickHourMinuteSecond = void 0;
const HourMinuteSecond_1 = require("./HourMinuteSecond");
/**
 * @author James Chan
 */
class QuickHourMinuteSecond extends HourMinuteSecond_1.HourMinuteSecond {
    constructor(hour, minute, seconds) {
        super();
        /**
         * Seconds.
         * @private
         */
        this._second = 0;
        /**
         * Minutes.
         * @private
         */
        this._minute = 0;
        /**
         * Hours.
         * @private
         */
        this._hour = 0;
        if (minute === undefined || seconds === undefined) {
            this._ms = hour;
            this.compute();
        }
        else {
            this._hour = hour;
            this._minute = minute;
            this._second = seconds;
            this._ms = this._hour * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_HOUR +
                this._minute * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_MINUTE +
                this.second * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_SECOND;
        }
    }
    get ms() {
        return this._ms;
    }
    get second() {
        return this._second;
    }
    get minute() {
        return this._minute;
    }
    get hour() {
        return this._hour;
    }
    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds) {
        return new QuickHourMinuteSecond(seconds * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_SECOND);
    }
    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes) {
        return new QuickHourMinuteSecond(minutes * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours) {
        return new QuickHourMinuteSecond(hours * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_HOUR);
    }
    consume(time) {
        const ms = typeof time == 'number' ? time : time.ms;
        this._ms = Math.max(this._ms - ms, 0);
        this.compute();
        return this;
    }
    extend(time) {
        const ms = typeof time == 'number' ? time : time.ms;
        this._ms += ms;
        this.compute();
        return this;
    }
    clone() {
        return new QuickHourMinuteSecond(this._ms);
    }
    /**
     * Computes hours, minutes, and seconds.
     * @private
     */
    compute() {
        this._hour = Math.floor(this._ms / HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_HOUR);
        this._minute = Math.floor(this._ms / HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_MINUTE) % HourMinuteSecond_1.HourMinuteSecond.MINUTE_IN_HOUR;
        this._second = Math.floor(this._ms / HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_SECOND) % HourMinuteSecond_1.HourMinuteSecond.SECOND_IN_MINUTE;
    }
}
exports.QuickHourMinuteSecond = QuickHourMinuteSecond;
