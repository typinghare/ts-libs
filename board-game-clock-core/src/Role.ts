/**
 * Board game role
 * @author James Chan
 */
export class Role {
    private readonly _label: string

    constructor(label: string) {
        this._label = label
    }

    toString(): string {
        return this._label
    }
}