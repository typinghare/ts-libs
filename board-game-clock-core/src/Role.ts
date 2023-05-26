/**
 * Board game role
 * @author James Chan
 */
export class Role {
    private readonly _label: string

    constructor(label: string) {
        this._label = label
    }

    equalsTo(role: Role): boolean {
        return this._label == role._label
    }

    toString(): string {
        return this._label
    }
}