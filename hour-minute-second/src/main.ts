import { HourMinuteSecond } from './HourMinuteSecond'
import { SlowHourMinuteSecond } from './SlowHourMinuteSecond'

export * from './HourMinuteSecond'
export * from './QuickHourMinuteSecond'
export * from './SlowHourMinuteSecond'

HourMinuteSecond.setStaticInitiateClass(SlowHourMinuteSecond)