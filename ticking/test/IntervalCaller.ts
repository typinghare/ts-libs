import { IntervalCaller } from '../src'

let i = 0
const intervalCaller = new IntervalCaller(1000, function(): void {
    console.log(`interval(${i++})`)
}, {
    checkInterval: 50
})

setTimeout((): void => {
    intervalCaller.getStopwatch().pause()
}, 2100)

setTimeout((): void => {
    intervalCaller.getStopwatch().resume()
}, 4000)

setTimeout((): void => {
    intervalCaller.getStopwatch().stop()
}, 10000)

intervalCaller.getStopwatch().start()
console.log('Stopwatch starts.')