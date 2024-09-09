import './OperatorPanel.css'
import StandardRow from './StandardRow'
import CalcButton from './CalcButton.js'
import { standardCalcSymbols } from './Data.js'
import { useDispatch } from 'react-redux'
import { handleClick } from './calculatorSlice.js'

const OperatorPanel = () => {
    const dispatch = useDispatch()
    const standardRow = standardCalcSymbols.map((symbols, i) => (
        <StandardRow key={'row'+i}>
            <CalcButton style={symbols[0].bgColor} handleClick={() => dispatch(handleClick(symbols[0].value))} >{symbols[0].display}</CalcButton>
            <CalcButton style={symbols[1].bgColor} handleClick={() => dispatch(handleClick(symbols[1].value))}>{symbols[1].display}</CalcButton>
            <CalcButton style={symbols[2].bgColor} handleClick={() => dispatch(handleClick(symbols[2].value))}>{symbols[2].display}</CalcButton>
            <CalcButton style={symbols[3].bgColor} handleClick={() => dispatch(handleClick(symbols[3].value))}>{symbols[3].display}</CalcButton>
        </StandardRow>
    ))
    return (
        <div className='operatorPanel'>
            {standardRow}
        </div>
    )
}

export default OperatorPanel