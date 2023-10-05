import { Timer } from '../src'

const timer = new Timer(2000, function(): void {
    console.log('Timer stops.')
    console.log()

    console.log('Start timestamp: ' + this.getStopwatch().getStartTimestamp())
    console.log('Stop timestamp: ' + this.getStopwatch().getStopTimestamp())
    console.log('Duration: ' + this.getStopwatch().getDuration())
})

setTimeout((): void => {
    timer.pause()
    console.log('Timer pauses.')
}, 1000)

setTimeout((): void => {
    timer.resume()
    console.log('Timer resumes.')
}, 2000)

timer.start()
console.log('Timer starts.')
