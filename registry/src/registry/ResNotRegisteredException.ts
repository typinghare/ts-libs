export class ResNotRegisteredException extends Error {
    public constructor(private readonly res: any) {
        super(`Resource not registered: [ ${res.toString()} ].`)
    }

    public getRes(): any {
        return this.res
    }
}