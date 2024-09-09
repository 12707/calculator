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

export const standardCalcSymbols = [
    [ { value: percentage, display: percentage }, { value: clearEntity, display: clearEntity }, { value: clear, display: clear }, { value: backspace, display: backspace } ],
    [ { value: reciprocal, display: reciprocal }, { value: pow2, display: pow2 }, { value: sqrt2, display: sqrt2 }, { value: divide, display: divide } ],
    [ { value: seven, display: seven }, { value: eight, display: eight }, { value: nine, display: nine }, { value: multiply, display: multiply } ],
    [ { value: four, display: four }, { value: five, display: five }, { value: six, display: six }, { value: substract, display: substract } ],
    [ { value: one, display: one }, { value: two, display: two }, { value: three, display: three }, { value: add, display: add } ],
    [ { value: posOrNeg, display: posOrNeg }, { value: zero, display: zero }, { value: dot, display: dotDisplay }, { value: equal, display: equal, bgColor: 'lightblue' } ]
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