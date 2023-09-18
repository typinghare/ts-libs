"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SlowHourMinuteSecond = void 0;
const HourMinuteSecond_1 = require("./HourMinuteSecond");
/**
 * @author James Chan
 */
class SlowHourMinuteSecond extends HourMinuteSecond_1.HourMinuteSecond {
    /**
     * Creates a slow hour minute second.
     * @param ms time in milliseconds.
     */
    constructor(ms) {
        super();
        this._ms = ms;
    }
    get ms() {
        return this._ms;
    }
    get hour() {
        return Math.floor(this._ms / HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_HOUR);
    }
    get minute() {
        return Math.floor(this._ms / HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_MINUTE) % HourMinuteSecond_1.HourMinuteSecond.MINUTE_IN_HOUR;
    }
    get second() {
        return Math.floor(this._ms / HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_SECOND) % HourMinuteSecond_1.HourMinuteSecond.SECOND_IN_MINUTE;
    }
    /**
     * Creates an hour-minute-second instance of specified seconds.
     * @param seconds
     */
    static ofSeconds(seconds) {
        return new SlowHourMinuteSecond(seconds * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_SECOND);
    }
    /**
     * Creates an hour-minute-second instance of specified minutes.
     * @param minutes
     */
    static ofMinutes(minutes) {
        return new SlowHourMinuteSecond(minutes * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_MINUTE);
    }
    /**
     * Creates an hour-minute-second instance of specified hours.
     * @param hours
     */
    static ofHours(hours) {
        return new SlowHourMinuteSecond(hours * HourMinuteSecond_1.HourMinuteSecond.MILLISECONDS_IN_HOUR);
    }
    consume(time) {
        const ms = typeof time == 'number' ? time : time.ms;
        this._ms -= ms;
        return this;
    }
    extend(time) {
        const ms = typeof time == 'number' ? time : time.ms;
        this._ms += ms;
        return this;
    }
    clone() {
        return new SlowHourMinuteSecond(this._ms);
    }
}
exports.SlowHourMinuteSecond = SlowHourMinuteSecond;
