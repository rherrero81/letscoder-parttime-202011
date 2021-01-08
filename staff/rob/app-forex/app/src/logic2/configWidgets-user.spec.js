import validator from './validators/index.js'
import ENV from './constants.js'
import exception from './exceptions/Exception.js'
import logic from './configWidgets-user.js'
import ath from './authenticate-user.js'
describe('configWidgetsUser()', () => {

    describe('when no string parameters', () => {
        let a

        beforeEach(() => {
            a = [true, {}, function() {}, new Date(), []].random()

        })

        it('should fail some no string parameter', () => {
            expect(() => logic.configWidgetsUser(a, a)).toThrowError(exception.InvalidOjectError)
        })
    })

    describe('when null  parameters', () => {
        let a, b, c

        beforeEach(() => {
            a = null
            b = null
            c = null
        })

        it('should fail on some null parameter', () => {
            expect(() => logic.configWidgetsUser(a, b)).toThrowError(exception.NullObjectError)
        })
    })

    describe('when wrong user', () => {
        let a, b, c,config

        beforeEach(() => {
            a = '11544433'
            b = 'Vamosvamos2'
            c = 'demo'
            config = [1, 2, 3, 4]
            jest.setTimeout(10000)
        })

        it('should fail unregistred username or password', async() => {
            var tok = await ath.retrieveForexToken(a, b, c);
            //var ret = await registrateForexOperation(tok, operation);
            // expect(ret).toBeUndefined();
            expect(() => logic.configWidgetsUser(tok, config)).toThrowError(exception.BadOperation);

        })
    })

    describe('when valid user no limits', () => {
        let a, b, c,config

        beforeEach(() => {
            a = '11544433'
            b = 'Vamosvamos1'
            c = 'demo'
            config = [1, 2, 3, 4]
            jest.setTimeout(10000)

        })

        it('should return data registred username or password', async() => {
            var tok = await ath.retrieveForexToken(a, b, c);
            var ret = await logic.registrateForexOperation(tok, config);
            expect(ret.order).not.toBeNull();

        })
    })

    describe('when valid user with limits', () => {
        let a, b, c,config

        beforeEach(() => {
            a = '11544433'
            b = 'Vamosvamos1'
            c = 'demo'
            config = [1, 2, 3, 4]
            jest.setTimeout(10000)

        })

        it('should return data registred username or password', async() => {
            var tok = await ath.retrieveForexToken(a, b, c);
            var ret = await logic.configWidgetsUser(tok, config);
            expect(ret.order).not.toBeNull();

        })
    })

})