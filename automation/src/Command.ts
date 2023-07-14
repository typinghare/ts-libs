export class Command {
    constructor(private name: string) {
    }

    public getName(): string {
        return this.name
    }
}