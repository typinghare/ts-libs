import { FactoryManager } from '../../src/FactoryManager'
import { JsonFactories } from '../../src/decorator/JsonFactories'
import { BookJsonFactory } from './BookJsonFactory'
import { UserJsonFactory } from './UserJsonFactory'

@JsonFactories([
    BookJsonFactory,
    UserJsonFactory,
])
// @ts-ignore
export class DecoratedLibraryFactoryManager extends FactoryManager {
}