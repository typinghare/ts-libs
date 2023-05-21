import { Role } from '../Role'

export class RoleNotFoundException extends Error {
    constructor(role: Role) {
        super(`Role not found in the board game: [ ${role.toString()} ].`)
    }
}