const { random } = Math

describe('calculate()', () => {
    describe('on valid numbers', () => {
        let a, b

        beforeEach(() => {
            a = random()
            b = random()
        })

        it('should succeed return the addition', () => {
            expect(calculate(a, b)).toBe(a + b)
        })
    })

    describe('on invalid numbers', () => {
        describe('when first operand is not a number', () => {
            let a, b

            beforeEach(() => {
                a = [random().toString(), true, {}, function() {}, new Date, []].random()
                b = random()
            })

            it('should fail on invalid first operand', () => {
                expect(() => calculate(a, b)).toThrowError(TypeError, `${a} is not a number`)
            })
        })

        describe('when second operand is not a number', () => {
            let a, b

            beforeEach(() => {
                a = random()
                b = [random().toString(), true, {}, function() {}, new Date, []].random()
            })

            it('should fail on invalid first operand', () => {
                expect(() => calculate(a, b)).toThrowError(TypeError, `${b} is not a number`)
            })
        })
    })
})