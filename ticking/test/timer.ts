import { Timer } from '../src'

const timer = new Timer(2000, function(): void {
    console.log('Timer stops.')
})

setTimeout(() => {
    timer.getStopwatch().pause()
}, 1000)

setTimeout(() => {
    timer.getStopwatch().resume()
}, 2000)

timer.getStopwatch().start()
console.log('Stopwatch starts.')