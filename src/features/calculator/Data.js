import { 
    clickPercentage,
    clickClearEntity,
    clickClear,
    clickBackspace,
    clickReciprocal,
    clickPow2,
    clickSqrt,
    clickArithmeticSign,
    clickNumber,
    clickEqualSign,
    clickDot,
    clickNegativeOrPositiveSign
 } from './calculatorSlice.js'

export const dot = '.'
export const dotDisplay = '•'
export const zero = '0'
export const one = '1'
export const two = '2'
export const three = '3'
export const four = '4'
export const five = '5'
export const six = '6'
export const seven = '7'
export const eight = '8'
export const nine = '9'
export const percentage = '%'
export const backspace = '←'
export const add = '＋'
export const substract = '－'
export const multiply = '×'
export const divide = '÷'
export const equal = '＝'
export const posOrNeg = '+/-'
export const clear = 'C'
export const clearEntity = 'CE'
export const pow2 = 'x²'
export const sqrt2 = '²√x'
export const reciprocal = '1/x'
export const exponent = 'e'
export const whitespace = ' '

export const standardCalcSymbols = [
    [ { value: percentage, display: percentage, handler: () => clickPercentage, control: true }, { value: clearEntity, display: clearEntity, handler: () => clickClearEntity }, { value: clear, display: clear, handler: () => clickClear }, { value: backspace, display: backspace, handler: () => clickBackspace } ],
    [ { value: reciprocal, display: reciprocal, handler: () => clickReciprocal, control: true }, { value: pow2, display: pow2, handler: () => clickPow2, control: true }, { value: sqrt2, display: sqrt2, handler: () => clickSqrt, control: true }, { value: divide, display: divide, handler: () => clickArithmeticSign, control: true } ],
    [ { value: seven, display: seven, handler: () => clickNumber }, { value: eight, display: eight, handler: () => clickNumber }, { value: nine, display: nine, handler: () => clickNumber }, { value: multiply, display: multiply, handler: () => clickArithmeticSign, control: true } ],
    [ { value: four, display: four, handler: () => clickNumber }, { value: five, display: five, handler: () => clickNumber }, { value: six, display: six, handler: () => clickNumber }, { value: substract, display: substract, handler: () => clickArithmeticSign, control: true } ],
    [ { value: one, display: one, handler: () => clickNumber }, { value: two, display: two, handler: () => clickNumber }, { value: three, display: three, handler: () => clickNumber }, { value: add, display: add, handler: () => clickArithmeticSign, control: true } ],
    [ { value: posOrNeg, display: posOrNeg, handler: () => clickNegativeOrPositiveSign, control: true }, { value: zero, display: zero, handler: () => clickNumber }, { value: dot, display: dotDisplay, handler: () => clickDot, control: true }, { value: equal, display: equal, bgColor: 'lightblue', handler: () => clickEqualSign } ]
]

export const arithmeticOperators = [
    add, substract, multiply, divide
]

export const specialOperators = [
    percentage, reciprocal, pow2, sqrt2, posOrNeg
]

export const numbers = [
    zero, one, two, three, four, five, six, seven, eight, nine
]

export const MAX_INPUT_LENGTH = 16
export const DEGREE_OF_ACCURACY = 16