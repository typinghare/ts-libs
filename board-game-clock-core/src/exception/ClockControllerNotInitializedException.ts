export class ClockControllerNotInitializedException extends Error {
    constructor() {
        super('The clock controller has not been initialized.')
    }
}