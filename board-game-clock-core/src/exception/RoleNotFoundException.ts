import { Role } from '../types'

export class RoleNotFoundException extends Error {
    constructor(role: Role) {
        super(`Role does not exist in the board game: [ ${role.toString()} ].`)
    }
}