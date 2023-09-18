import { LatheManager, LatheUtil, PreLathe } from '../src'

describe('Test Lathe Manager.', (): void => {
    class User {
        public username: string = ''
        public sex: string = ''
        public age: number = 0
    }

    interface UserObject {
        username: string
        sex: string
        age: number
    }

    class UserLathe extends PreLathe<UserObject, User> {
    }

    const latheManger = new LatheManager({
        userLathe: new UserLathe(LatheUtil.objectProvider(new User())),
    })

    latheManger.getLathe('userLathe').append((user, userObject): void => {
        user.username = userObject.username
    })
    latheManger.getLathe('userLathe').append((user, userObject): void => {
        user.sex = userObject.sex
    })
    latheManger.getLathe('userLathe').append((user, userObject): void => {
        user.age = userObject.age
    })

    it('Test getLathe.', (): void => {
        const result = latheManger.getLathe('userLathe').process({
            username: 'James',
            sex: 'male',
            age: 24,
        })

        expect(result).toBeInstanceOf(User)
        expect(result).toEqual({
            username: 'James',
            sex: 'male',
            age: 24,
        })
    })
})