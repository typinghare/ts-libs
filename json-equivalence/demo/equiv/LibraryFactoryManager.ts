import { FactoryManager } from '../../src/FactoryManager'
import { BookJsonFactory } from './BookJsonFactory'
import { UserJsonFactory } from './UserJsonFactory'

export class LibraryFactoryManager extends FactoryManager {
    constructor() {
        super()

        // Register JSON factories here.
        this.register(UserJsonFactory)
        this.register(BookJsonFactory)
    }
}