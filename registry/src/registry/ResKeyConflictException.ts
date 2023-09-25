import { ResKey } from '../res/ResKey'

/**
 * Resource key conflict exception.
 */
export class ResKeyConflictException extends Error {
    /**
     * Creates a resource key conflict exception.
     * @param resKey The resource key that conflicts
     */
    public constructor(private resKey: ResKey) {
        super(`Fail to register resource due to key conflict: [ ${resKey.toString()} ].`)
    }

    /**
     * Returns the conflicted resource key.
     */
    public getResKey(): ResKey {
        return this.resKey
    }
}