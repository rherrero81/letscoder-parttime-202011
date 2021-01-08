import validator from './validators/index.js'
import ENV from './constants.js'
import exception from './exceptions/Exception.js'
import configWidgetsUser from './configWidgets-user.js'
import retrieveToken from './authenticate-user.js'
import retrieveForexToken from './retrieve-forex-token.js'
export default describe('configWidgetsUser()', () => {

    describe('when no string parameters', () => {
        let a

        beforeEach(() => {
            a = null

        })

        it('should fail some no string parameter', () => {
            expect(() => configWidgetsUser(a, a)).toThrowError(exception.NullObjectError)
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
            expect(() => configWidgetsUser(a, a, b)).toThrowError(exception.NullObjectError)
        })
    })

    describe('when wrong user', () => {
        let a, b, c, config

        beforeEach(() => {
            a = '11631760'
            b = 'Vamosvamos2'
            c = 'demo'
            config = [1, 2, 3, 4]
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
        })

        it('should fail unregistred username or password', async() => {
            var tok = await retrieveForexToken(a, b);
            expect(() => configWidgetsUser(tok, a, config)).toThrowError(exception.InvalidOjectError);

        })
    })



    describe('when valid user  ', () => {
        let a, b, c, config

        beforeEach(() => {
            a = '11631760'
            b = 'Vamosvamos1'
            c = 'demo'
            config = [3, 2, 1, 4]
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000000


        })

        it('should return data registred username or password', async() => {
            var tok = await retrieveToken(a, b);
            var resTokCOnf = await retrieveForexToken(a, b, c);
            var ret = await configWidgetsUser(resTokCOnf.token, config);
            const p1 = JSON.stringify(ret.result);
            const p2 = JSON.stringify(config)
            expect(p1).toBe(p2);

        })
    })

})