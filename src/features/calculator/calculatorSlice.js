import { createSlice } from "@reduxjs/toolkit"
import {
    one,
    zero,
    dot, 
    equal,
    add,substract,multiply,divide,
    MAX_INPUT_LENGTH,
    DEGREE_OF_ACCURACY,
    exponent,
    whitespace
 } from "./Data.js"
 import Big from "big.js"
 import _ from "lodash"

Big.DP = DEGREE_OF_ACCURACY

const errorMessageDivideByZero = 'Cannot divide by zero'
const errorMessagePow2 = 'Error in pow2 calc'
const errorMessageSqrt = 'Error in sqrt calc'
const errorMessageScienceCount = 'Error in assembling numbers!'
const errorMessageReciprocal = 'Error in reciprocal calc'

const defaultInput = { value: '', calculated: false }
const defaultResult = { value: '' }

const initialState = {
    operator: '',
    input1: { ...defaultInput },
    input2: { ...defaultInput },
    result: { ...defaultResult },
    display: '',
    disabled: false,
    history: ''
}

const isOverflow = (display) => {
    return display.length >= MAX_INPUT_LENGTH
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

const autoAddThousandsSeparator = (value) => {
    let result = value
    if (value && value.length > MAX_INPUT_LENGTH && Number.isFinite(+value)) {
        try {
            if (value.indexOf(exponent) !== -1) {
                const eDigits = value.split(exponent)
                result = new Big(eDigits[0]).toFixed(DEGREE_OF_ACCURACY - 1).toString() + exponent + eDigits[1]
            } else if (value.indexOf(dot) !== -1) {
                const dDigits = value.split(dot)
                if ((dDigits[0].length + dDigits[1].length) > DEGREE_OF_ACCURACY) {
                    result = new Big(new Big(value).toFixed(DEGREE_OF_ACCURACY - dDigits[0].length).toString()).toString()
                } else {
                    result = new Big(value).toString()
                }
                result = assemble(dDigits[0]) + dot + result.substring(result.indexOf(dot) + 1)
            } else {
                result = assemble(value)
            }
        } catch (err) {
            result = errorMessageScienceCount
        }
    }
    return result
}

const clearAll = (state) => {
    state.input1 = { ...defaultInput }
    state.input2 = { ...defaultInput }
    state.operator= ''
    state.result= { ...defaultResult }
    state.display= ''
    state.disabled = false
    state.history = ''
}

const isCalculated = (state) => {
    return !_.isEmpty(state.result.value)
}

const isOnSecondInput = (state) => {
    return !_.isEmpty(state.input2.value) && !_.isEmpty(state.input1.value) && !_.isEmpty(state.operator) && _.isEmpty(state.result.value)
}

const isOnFirstInput = (state) => {
    return !_.isEmpty(state.input1.value) && _.isEmpty(state.input2.value) && _.isEmpty(state.operator) && _.isEmpty(state.result.value)
}

const isOnOperator = (state) => {
    return !_.isEmpty(state.input1.value) && _.isEmpty(state.input2.value) && !_.isEmpty(state.operator) && _.isEmpty(state.result.value)
}

const isZero = (value) => {
    return value === 0 || value === zero
}

const isIncludeDot = (value) => {
    return value?.indexOf(dot) !== -1
}

const calculate = (factor1, operator, factor2) => {
    let result
    if (operator === add) {
        result = new Big(factor1).add(factor2).toString()
    } else if (operator === substract) {
        result = new Big(factor1).sub(factor2).toString()
    } else if (operator === multiply) {
        result = new Big(factor1).mul(factor2).toString()
    } else if (operator === divide) {
        if (isZero(factor2)) {
            throw new Error(errorMessageDivideByZero)
        } else {
            result = new Big(factor1).div(factor2).toString()
        }
    }
    return result
}

export const calcSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        clickPercentage: (state) => {
            const percentage = 100
            if (isCalculated(state)) {
                state.result.value = new Big(state.result.value).div(percentage).toString()
                state.display = autoAddThousandsSeparator(state.result.value)
            } else if (isOnSecondInput(state)) {
                if ([ add, substract ].includes(state.operator)) {
                    state.input2.value = new Big(state.input1.value).mul(state.input2.value).div(percentage).toString()
                    state.input2.calculated = true
                    state.display = autoAddThousandsSeparator(state.input2.value)
                } else if ([ divide, multiply ].includes(state.operator)) {
                    state.input2.value = new Big(state.input2.value).div(percentage).toString()
                    state.input2.calculated = true
                    state.display = autoAddThousandsSeparator(state.input2.value)
                } 
            } else if (isOnFirstInput(state)) {
                state.input2.value = zero
                state.display = state.input2.value
                state.display = autoAddThousandsSeparator(state.input2.value)
            } else if (isOnOperator(state)) {
                if ([ add, substract ].includes(state.operator)) {
                    state.input2.value = new Big(state.input1.value).mul(state.input1.value).div(percentage).toString()
                    state.input2.calculated = true
                    state.display = autoAddThousandsSeparator(state.input2.value)
                } else if ([ divide, multiply ].includes(state.operator)) {
                    state.input2.value = new Big(state.input1.value).div(percentage).toString()
                    state.input2.calculated = true
                    state.display = autoAddThousandsSeparator(state.input2.value)
                } 
            }
            state.history = state.display
        },
        clickClearEntity: (state) =>  {
            if (isCalculated(state)) {
                clearAll(state)
            } else if (isOnSecondInput(state)) {
                state.input2 = { ...defaultInput }
            } else if (isOnFirstInput(state)) {
                state.input1 = { ...defaultInput }
            } else if (isOnOperator(state)) {
                state.input2 = { ...defaultInput }
            }
            state.display = ''
            state.disabled = false
        },
        clickClear: (state) => {
            clearAll(state)
        },
        clickBackspace: (state) => {
            if (isCalculated(state)) {
                state.input1 = { ...defaultInput }
                state.input2 = { ...defaultInput }
                state.operator = ''
            } else if (isOnSecondInput(state)) {
                if (!state.input2.calculated) {
                    state.input2.value = state.input2.value.substring(0, state.input2.value.length - 1)
                    state.display = autoAddThousandsSeparator(state.input2.value)
                }
            } else if (isOnFirstInput(state)) {
                if (!state.input1.calculated) {
                    state.input1.value = state.input1.value.substring(0, state.input1.value.length - 1)
                    state.display = autoAddThousandsSeparator(state.input1.value)
                }
            }
            state.disabled = false
        },
        clickReciprocal: (state) => {
            let targetObj
            if (isCalculated(state)) {
                targetObj = state.result
                state.history = `1/(${targetObj.value})`
            } else if (isOnSecondInput(state)) {
                targetObj = state.input2
                state.input2.calculated = true
                state.history += `1/(${targetObj.value})`
            } else if (isOnOperator(state)) {
                state.input2.value = state.input1.value
                state.input2.calculated = true
                targetObj = state.input2
                state.history += `1/(${targetObj.value})`
            } else if (isOnFirstInput(state)) {
                targetObj = state.input1
                state.input1.calculated = true
                state.history += `1/(${targetObj.value})`
            }
            if (isZero(targetObj?.value)) {
                state.display = errorMessageDivideByZero
            } else {
                try {
                    targetObj.value = new Big(one).div(targetObj.value).toString()
                    state.display = autoAddThousandsSeparator(targetObj?.value)
                } catch(err) {
                    clearAll(state)
                    state.display = errorMessageReciprocal
                    state.disabled = true
                }
            }
        },
        clickPow2: (state) => {
            const pow2Index = 2
            let targetObj
            if (isCalculated(state)) {
                targetObj = state.result
                state.history = `sqr(${targetObj.value})`
            } else if (isOnSecondInput(state)) {
                targetObj = state.input2
                state.input2.calculated = true
                state.history += `sqr(${targetObj.value})`
            } else if (isOnOperator(state)) {
                state.input2.value = state.input1.value
                targetObj = state.input2
                state.input2.calculated = true
                state.history += `sqr(${targetObj.value})`
            } else if (isOnFirstInput(state)) {
                targetObj = state.input1
                state.input1.calculated = true
                state.history += `sqr(${targetObj.value})`
            } else {
                state.input1.value = zero
                targetObj = state.input1
                state.history += `sqr(${targetObj.value})`
            }
            try {
                targetObj.value = new Big(targetObj.value).pow(pow2Index).toString()
                state.display = autoAddThousandsSeparator(targetObj?.value)
            } catch(err) {
                clearAll(state)
                state.display = errorMessagePow2
                state.disabled = true
            }
        },
        clickSqrt: (state) => {
            let targetObj
            if (isCalculated(state)) {
                targetObj = state.result
                state.history = `√(${targetObj.value})`
            } else if (isOnSecondInput(state)) {
                targetObj = state.input2
                state.input2.calculated = true
                state.history += `√(${targetObj.value})`
            } else if (isOnOperator(state)) {
                state.input2.value = state.input1.value
                targetObj = state.input2
                state.input2.calculated = true
                state.history += `√(${targetObj.value})`
            } else if (isOnFirstInput(state)) {
                targetObj = state.input1
                state.input1.calculated = true
                state.history += `√(${targetObj.value})`
            } else {
                state.input1.value = zero
                targetObj = state.input1
                state.history += `√(${targetObj.value})`
            }
            try {
                targetObj.value = new Big(targetObj.value).sqrt().toString()
                state.display = autoAddThousandsSeparator(targetObj?.value)
            } catch(err) {
                clearAll(state)
                state.display = errorMessageSqrt
                state.disabled = true
            }
        },
        clickArithmeticSign: (state, action) => {
            if (isCalculated(state)) {
                state.input1.value = state.result.value
                state.input2 = { ...defaultInput }
                state.result = { ...defaultResult }
                state.operator = action.payload
                state.history = state.input1.value + whitespace + state.operator + whitespace
            } else if (isOnSecondInput(state)) {
                try {
                    state.input1.value = calculate(state.input1.value, state.operator, state.input2.value)
                    state.input1.calculated = true
                    state.input2 = { ...defaultInput }
                    state.display = autoAddThousandsSeparator(state.input1.value)
                    state.history = state.input1.value + whitespace + state.operator + whitespace
                } catch(err) {
                    clearAll(state)
                    state.display = err.message
                    state.disabled = true
                }
            } else if (isOnOperator(state) || isOnFirstInput(state)) {
                state.operator = action.payload
                state.history = (state.history ? state.history : state.input1.value) + whitespace + state.operator + whitespace
            }
        },
        clickNumber: (state, action) => {
            if (isCalculated(state)) {
                clearAll(state)
                state.input1.value = action.payload
                state.display = autoAddThousandsSeparator(state.input1.value)
            } else if (isOnSecondInput(state)) {
                if (!isOverflow(state.input2.value)) {
                    state.input2.value = state.input2.value + action.payload
                    state.display = autoAddThousandsSeparator(state.input2.value)
                }
            } else if (isOnOperator(state)) {
                state.input2.value = action.payload
                state.display = autoAddThousandsSeparator(state.input2.value)
            } else if (isOnFirstInput(state)) {
                if (!isOverflow(state.input1.value)) {
                    state.input1.value = state.input1.value + action.payload
                    state.display = autoAddThousandsSeparator(state.input1.value)
                }
            } else if (!isZero(action.payload)){
                state.input1.value = action.payload
                state.display = autoAddThousandsSeparator(state.input1.value)
            }
            state.disabled = false
        },
        clickEqualSign: (state, action) => {
            if (state.disabled) {
                clearAll(state)
            } else {
                try {
                    if (isCalculated(state)) {
                        state.input1.value = state.result.value
                        state.result.value = ''
                        state.operator = action.payload
                    } else if (isOnSecondInput(state)) {
                        state.result.value = calculate(state.input1.value, state.operator, state.input2.value)
                    } else if (isOnOperator(state)) {
                        state.input2.value = state.input1.value
                        state.result.value = calculate(state.input1.value, state.operator, state.input1.value)
                    } else if (isOnFirstInput(state)) {
                        state.operator = action.payload
                        state.result.value = state.input1.value
                    } else {
                        state.operator = action.payload
                        state.result.value = 0
                    }
                    state.display = autoAddThousandsSeparator(state.result.value)
                    state.history = state.history + state.input2.value + whitespace + equal + whitespace
                } catch(err) {
                    clearAll(state)
                    state.display = err.message
                    state.disabled = true
                }
            }
        },
        clickDot: (state, action) => {
            let targetObj
            if (isCalculated(state)) {
                clearAll(state)
                state.input1.value = zero
                targetObj = state.input1
            } else if (isOnSecondInput(state)) {
                targetObj = state.input2
            } else if (isOnOperator(state)) {
                state.input2.value = zero
                targetObj = state.input2
            } else if (isOnFirstInput(state)) {
                targetObj = state.input1
            } else {
                state.input1.value = zero
                targetObj = state.input1
            }
            if (!isOverflow(targetObj.value) && !isIncludeDot(targetObj.value)) {
                targetObj.value = targetObj.value + action.payload
                state.display = autoAddThousandsSeparator(targetObj.value)
            }
        },
        clickNegativeOrPositiveSign: (state) => {
            const minusOne = -1
            let targetObj
            if (isCalculated(state)) {
                const temp = state.result.value
                clearAll(state)
                state.input1.value = temp
                state.input1.calculated = true
                targetObj = state.input1
            } else if (isOnSecondInput(state)) {
                targetObj = state.input2
            } else if (isOnOperator(state)) {
                state.input2.value = state.input1.value
                state.input2.calculated = true
                targetObj = state.input2
            } else if (isOnFirstInput(state)) {
                targetObj = state.input1
            }
            state.history = `negate(${targetObj?.value})`
            targetObj.value = new Big(targetObj?.value).mul(minusOne).toString()
            state.display = autoAddThousandsSeparator(targetObj.value)
            
        }
    }
})

export const selectDisplayValue = (state) => state.calculator.display

export const selectOperator = (state) => state.calculator.operator

export const selectHistory = (state) => state.calculator.history

export const selectDisabled = (state) => state.calculator.disabled

export const {
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
 } = calcSlice.actions

export default calcSlice.reducer