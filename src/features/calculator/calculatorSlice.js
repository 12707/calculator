import { createSlice } from "@reduxjs/toolkit"
import { 
    numbers, 
    dot, 
    add,substract,multiply,divide,
    equal,
    percentage, reciprocal, pow2, sqrt2, posOrNeg,
    backspace, clearEntity, clear,
    arithmeticOperators, specialOperators, 
    MAX_INPUT_LENGTH,
    zero,
    exponent
 } from "./Data.js"
 import Big from "big.js"

Big.DP = MAX_INPUT_LENGTH

const initialState = {
    factor1: [],
    operator: '',
    factor2: [],
    display: ''
}

const isOverflow = (display) => {
    return display.length >= MAX_INPUT_LENGTH
}

const isNumeric = (value) => {
    return numbers.includes(value)
}

const isArithmeticOperation = (value) => {
    return arithmeticOperators.includes(value)
}

const isSpecialOperation = (value) => {
    return specialOperators.includes(value)
}

const convertArrayToFloat = (arr) => {
    if (!arr || arr.length === 0) {
        return 0.0
    }
    try {
        return new Big(arr.join(''))
    } catch (err) {
        throw new Error('Error input!')
    }
}

const isEmpty = (arr) => {
    return !arr || arr.length === 0
}

const checkDivideZero = (value) => {
    if (value.eq(new Big(0))) {
        throw new Error('Cannot divide by zero')
    }
}

const calcArithmeticEquation = (factor1, factor2, operator) => {
    const numFactor1 = convertArrayToFloat(factor1)
    const numFactor2 = convertArrayToFloat(factor2)
    let result = 0
    switch(operator) {
        case add: {
            result = numFactor1.add(numFactor2)
            break
        }
        case substract: {
            result = numFactor1.sub(numFactor2)
            break
        }
        case multiply: {
            result = numFactor1.times(numFactor2)
            break
        }
        case divide: {
            checkDivideZero(numFactor2)
            result = numFactor1.div(numFactor2)
            break
        }
        default: {
            throw new Error('Unknown arithmetic operator!')
        }
    }
    return result
}

const calcSpecialOperation = (factor, operator) => {
    const numFactor = convertArrayToFloat(factor)
    let result = 0
    switch(operator) {
        case percentage: {
            result = numFactor.div(100)
            break
        }
        case reciprocal: {
            checkDivideZero(numFactor)
            result = new Big(1).div(numFactor) 
            break
        }
        case pow2: {
            result = numFactor.pow(2)
            break
        }
        case sqrt2: {
            result = numFactor.sqrt()
            break
        }
        case posOrNeg: {
            result = - numFactor
            break
        }
        default: {
            throw new Error('Unknown operation!')
        }
    }
    return result
}

const processArithmetic = (state) => {
    if (!isEmpty(state.factor1) && !isEmpty(state.factor2)) {
        let result
        try {
            result = calcArithmeticEquation(state.factor1, state.factor2, state.operator)
        } catch (err) {
            result = err.message
        }
        state.factor1.length = 0
        state.factor2.length = 0
        state.factor1.push(result)
        state.display = result
        return result
    }
    return ''
}

const ignoreZero = (factor, payload) => {
    if (payload === zero) {
        if (!isEmpty(factor) && factor.length === 1 && factor[0] === payload) {
            return true
        }
    }
    return false
}

const autoAddZero = (factor) => {
    if (isEmpty(factor)) {
        factor.push(zero)
    }
}

const inputNumberHandler = (state, payload) => {
    let result
    if (state.operator) {
        if (!isOverflow(state.factor2) && !ignoreZero(state.factor2, payload)) {
            state.factor2.push(payload)
        }
        state.display = state.factor2.join('')
        result = state.factor2.join('')
    } else {
        if (!isOverflow(state.factor1) && !ignoreZero(state.factor1, payload)) {
            state.factor1.push(payload)
        }
        state.display = state.factor1.join('')
        result = state.factor1.join('')
    }
    return result
}

const inputDotHandler = (state, payload) => {
    let result
    if (state.operator) {
        if (!isOverflow(state.factor2) && !state.factor2.includes(dot)) {
            autoAddZero(state.factor2)
            state.factor2.push(payload)
        } 
        state.display = state.factor2.join('')
        result = state.factor2.join('')
    } else {
        if (!isOverflow(state.factor1) && !state.factor1.includes(dot)) {
            autoAddZero(state.factor1)
            state.factor1.push(payload)
        } 
        state.display = state.factor1.join('')
        result = state.factor1.join('')
    }
    return result
}

const inputArithmeticSignHandler = (state, payload) => {
    let result = ''
    if (state.operator) {
        result = processArithmetic(state)
    }
    state.operator = payload
    return result
}

const inputSpecialSignHandler = (state, payload) => {
    let factor = null
    if (!isEmpty(state.factor2)) {
        factor = state.factor2
    } else {
        factor = state.factor1
    }
    let result
    try {
        result = calcSpecialOperation(factor, payload)
    } catch (err) {
        result = err.message
    }
    factor.length = 0
    factor.push(result)
    state.display = result
    return result
}

const inputBackspaceHandler = (state) => {
    let result
    if (!isEmpty(state.factor2)) {
        state.factor2.pop()
        state.display = state.factor2.join('')
        result = state.factor2.join('')
    } else if (!isEmpty(state.factor1)) {
        state.factor1.pop()
        state.display = state.factor1.join('')
        result = state.factor1.join('')
    }
    return result
}

const inputClearHandler = (state) => {
    state.operator = ''
    state.factor1.length = 0
    state.factor2.length = 0
    state.display = ''
    return ''
}

const inputClearEntityHandler = (state) => {
    if (!isEmpty(state.factor2) || state.operator) {
        state.factor2.length = 0
        state.display = ''
    } else if (!isEmpty(state.factor1)) {
        state.factor1.length = 0
        state.display = ''
    }
    return ''
}

const inputEqualSignHandler = (state) => {
    let result
    if (!isEmpty(state.factor1) && !isEmpty(state.factor2) && state.operator) {
        result = processArithmetic(state)
    } else if (!isEmpty(state.factor1) && state.operator) {
        state.factor2 = [ ...state.factor1 ]
        result = processArithmetic(state)
    } else {
        const result = convertArrayToFloat(state.factor1)
        state.display = result
    }
    return result
}

const assemble = (value) => {
    let result = ''
    if (value.length > 3) {
        result = assemble(value.substring(0, value.length - 3)) + ',' + value.substring(value.length, value.length - 3)
    } else {
        result = value
    }
    return result
}

const trimResult = (value) => {
    if (value.toString().indexOf(exponent) != -1) {
        const scientificNotions = value.toString().split(exponent)
        return scientificNotions[0].substring(0, MAX_INPUT_LENGTH) + exponent + scientificNotions[1]
    } else {
        const tempResult = value.toString().split(dot)
        if (tempResult.length > 1) {
            return tempResult[0] + dot + tempResult[1].substring(0, MAX_INPUT_LENGTH)
        } else {
            return value
        }
    }
}

const autoAddThousandsSeparator = (value) => {
    let result = ''
    if (value) {
        const digits = value.toString().split(dot)
        if (digits.length > 1 && digits[1]) {
            result = assemble(digits[0]) + dot + digits[1]
        } else if (digits.length == 1){
            if (digits[0].indexOf(exponent) === -1) {
                result = assemble(digits[0])
            } else {
                result = value
            }
        } else {
            result = value
        }
    }
    return result
}

export const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        handleClick: (state, action) => {
            const value = action.payload
            let result
            if (isNumeric(value)) {
                result = inputNumberHandler(state, value)
            } else if (dot === value) {
                result = inputDotHandler(state, value)
            } else if (isArithmeticOperation(value)) {
                result = inputArithmeticSignHandler(state, value)
            } else if (isSpecialOperation(value)) {
                result = inputSpecialSignHandler(state, value)
            } else if (value === backspace) {
                result = inputBackspaceHandler(state)
            } else if (value === clear) {
                result = inputClearHandler(state)
            } else if (value === clearEntity) {
                result = inputClearEntityHandler(state)
            } else if (value === equal) {
                result = inputEqualSignHandler(state)
            }
            result = trimResult(result)
            state.display = autoAddThousandsSeparator(result)
        }
    }
})

export const selectDisplayValue = (state) => state.calculator.display

export const selectOperator = (state) => state.calculator.operator

export const selectFactor1 = (state) => convertArrayToFloat(state.calculator.factor1)

export const selectFactor2 = (state) => convertArrayToFloat(state.calculator.factor2)

export const selectHasDot = (state) => state.calculator.display.indexOf(dot) !== -1

export const { handleClick } = calcSlice.actions

export default calcSlice.reducer