import { FinishingLathe, PreLathe } from '../src'
import { LatheUtil } from '../src/LatheUtil'

describe('Test Lathe class.', (): void => {
    it('Arithmetic lathe.', (): void => {
        class ArithmeticLathe extends FinishingLathe<number> {
        }

        const arithmeticLathe = new ArithmeticLathe()
        arithmeticLathe.append(num => num * 3 + 1)
        arithmeticLathe.append(num => num / 2)

        const result = arithmeticLathe.process(5)
        expect(result).toEqual(8)
    })

    it('Convert objects.', (): void => {
        class User {
            public constructor(
                public username: string,
                public sex: string,
                public age: number,
            ) {
            }
        }

        interface UserObject {
            username: string
            sex: string
            age: number
        }

        class UserObjectLathe extends PreLathe<User, UserObject> {
        }

        const userObjectLathe = new UserObjectLathe(LatheUtil.emptyObjectProvider<UserObject>())
        userObjectLathe.append((object, user): void => {
            object.username = user.username
        })
        userObjectLathe.append((object, user): void => {
            object.sex = user.sex
        })
        userObjectLathe.append((object, user): void => {
            object.age = user.age
        })
        const userObject = userObjectLathe.process(new User('James', 'male', 24))

        expect(userObject).toEqual({
            username: 'James',
            sex: 'male',
            age: 24,
        })
    })
})