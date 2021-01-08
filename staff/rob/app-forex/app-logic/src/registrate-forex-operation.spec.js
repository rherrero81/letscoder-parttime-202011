import validator from './validators/index.js'
import ENV from './constants.js'
import exception from './exceptions/Exception.js'
import retrieveForexToken from './retrieve-forex-token.js'
import registrateForexOperation from './registrate-forex-operation.js'
import OpModel from './models/Forex/Operation.js'
import User from './models/Authentication/User.js'
/* import { registrateForexOperation, retrieveForexToken } from './index.js' */

export default describe('registrateForexOperation()', () => {

    describe('when no string parameters', () => {
        let a

        beforeEach(() => {
            a = true

        })

        it('should fail some no string parameter', () => {
            expect(() => registrateForexOperation(a)).toThrowError(exception.InvalidOjectError)
        })
    })

    describe('when null  parameters', () => {
        let a, b, c

        beforeEach(() => {
            a = null,
                b = null,
                c = null
        })

        it('should fail on some null parameter', () => {
            expect(() => registrateForexOperation(a, b, c)).toThrowError(exception.NullObjectError)
        })
    })




    describe('when wrong user  ', () => {
        let a, b, c, operation

        beforeEach(() => {
            a = ENV.FOREX_API_LOGIN
            b = ENV.FOREX_API_PASSWORD + '2'
            c = 'demo'
            operation = new OpModel({
                symbol: "BITCOIN2",
                cmd: 0,
                offset: 0,
                sl: 10679,
                tp: 10938,
                price: 10579,
                type: 1,
                volume: 0.1,
                order: -1
            })
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
        })

        it('should fail unregistred username or password', async() => {
            var tok = await retrieveForexToken(a, b, c);
            try {
                await registrateForexOperation(tok.token, operation)
            } catch (error) {
                console.log(error.message);
                expect(error).toBeInstanceOf(exception.BadRequest)
            }

        })

    })

    describe('when valid user no limits ', () => {
        let a, b, c, operation

        beforeEach(() => {
            a = ENV.FOREX_API_LOGIN
            b = ENV.FOREX_API_PASSWORD
            c = 'demo'

            operation = new OpModel({
                symbol: "BITCOINCASH",
                cmd: 0,
                offset: 0,
                sl: 0,
                tp: 0,
                price: 1,
                type: 1,
                volume: 0.1,
                order: -1
            })
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

        })

        it('should return data registred username or password', async() => {
            var tok = await retrieveForexToken(a, b, c);
            var ret = await registrateForexOperation(tok.token, operation);
            expect(ret.order).not.toBeNull();

        })
    })

    describe('when valid user with limits ', () => {
        let a, b, c, operation

        beforeEach(() => {
            a = ENV.FOREX_API_LOGIN
            b = ENV.FOREX_API_PASSWORD
            c = 'demo'
            operation = new OpModel({
                    symbol: "BITCOINCASH",
                    cmd: 0,
                    offset: 0,
                    sl: 315,
                    tp: 350,
                    price: 10,
                    type: 0,
                    volume: 0.1,
                    order: 0
                })
                //symbol, cmd, offset, price, sl, tp, type, volume, order) 
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000

        })

        it('should return data registred username or password', async() => {
            var tok = await retrieveForexToken(a, b, c);
            var ret = await registrateForexOperation(tok.token, operation);
            expect(ret.order).not.toBeNull();

        })
    })

})