# Hour Minute Second

This library provides a flexible and efficient solution for handling time durations based on 
hours, minutes, and seconds. It offers two implementations, `SlowHourMinuteSecond` and `QuickHourMinuteSecond`, 
catering to different use cases. Whether you need real-time updates or fast calculations, this library empowers 
you with essential features and a clean API.

There are two implementations of the HourMinuteSecond abstract class:
`SlowHourMinuteSecond` and `QuickHourMinuteSecond`. These implementations represent
time in hours, minutes, and seconds. The main difference between them lies in
how they handle time calculations and updates.

The `SlowHourMinuteSecond` class computes the hours, minutes, and seconds dynamically when they are accessed.
This means that whenever you retrieve the hour, minute, or second value, it performs the calculation based on
the total time stored in milliseconds. This approach is suitable when you have a fixed time value and need to access
the components multiple times without frequent updates.

The `QuickHourMinuteSecond` class takes a different approach by computing the hour, minute, and second values only
when the time is updated. It stores the time in milliseconds and updates the components accordingly. This
implementation is suitable when you frequently update the time value and need fast access to the individual
components.

**Despite their different implementations, both the SlowHourMinuteSecond and QuickHourMinuteSecond classes are created,
updated, and accessed using the same approach.** Therefore, this documentation only takes`SlowHourMinuteSecond` as
an example.

## Create Time

~~~typescript
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

// Create a SlowHourMinuteSecond instance with 4532500 milliseconds
new SlowHourMinuteSecond(4532500)

// By default, the time is set to 0 milliseconds
new SlowHourMinuteSecond()

// Create a SlowHourMinuteSecond instance with 100 seconds
SlowHourMinuteSecond.ofSeconds(100)

// Create a SlowHourMinuteSecond instance with 50 minutes
SlowHourMinuteSecond.ofMinutes(50)

// Create a SlowHourMinuteSecond instance with 10 hours
SlowHourMinuteSecond.ofHours(10)
~~~

### Since v1.1.0

~~~typescript
import { HourMinuteSecond, QuickHourMinuteSecond } from '@typinghare/hour-minute-second'

// Create a SlowHourMinuteSecond (default) by using `HourMinuteSecond.create` method
const slowTime = HourMinuteSecond.create(1000)

// Custom the static initiatiate class
HourMinuteSecond.setStaticInitiateClass(QuickHourMinuteSecond)

// Then the instance created is an instance of QuickHourMinuteSecond
const quickTime = HourMinuteSecond.create(1000)

// ofSeconds, ofMinutes, and ofHours
HourMinuteSecond.ofSeconds(32)
HourMinuteSecond.ofMinutes(15)
HourMinuteSecond.ofHours(1)
~~~

## Access Time

~~~typescript
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

// This time represents 1:15:32
const time = new SlowHourMinuteSecond(4532500)

console.log(time.ms)        // >> 4532500
console.log(time.hour)      // >> 1
console.log(time.minute)    // >> 15
console.log(time.second)    // >> 32
~~~

## Extend Time

~~~typescript
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

const time = new SlowHourMinuteSecond()

// Extend 500 milliseconds
time.extend(500)

// Extend 1 hour
time.extendHour(1)

// Extend 5 minutes
time.extendMinute(5)

// Extend 20 seconds
time.extendSecond(20)

// Chain programming is supported
time.extendHour(1)
    .extendMinute(5)
    .extendSecond(20)
~~~

## Consume Time

~~~typescript
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

const time = new SlowHourMinuteSecond(10000000)

// Consume 500 milliseconds
time.consume(500)

// Consume 1 hour
time.consumeHour(1)

// Consume 5 minutes
time.consumeMinute(5)

// Consume 20 seconds
time.consumeSecond(20)

// Chain programming is supported
time.consumeHour(1)
    .consumeMinute(5)
    .consumeSecond(20)
~~~

## Clone Time

~~~typescript
const time = new SlowHourMinuteSecond(500)
const cloneTime = time.clone(500)

time.extend(500)

console.log(cloneTime.ms === 500)  // >> true
~~~

## toString

~~~typescript
import { SlowHourMinuteSecond } from '@typinghare/hour-minute-second'

// This time represents 1:15:32
const time = new SlowHourMinuteSecond(4532500)

// The toString() method is overried
console.log(time)    // >> 1:15:32

// You can specify the format of the string
console.log(time.toString('hh-mm-ss'))  // >> 1-15-32
~~~
