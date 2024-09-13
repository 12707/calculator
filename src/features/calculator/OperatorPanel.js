import './OperatorPanel.css'
import StandardRow from './StandardRow'
import CalcButton from './CalcButton.js'
import { standardCalcSymbols } from './Data.js'
import { useDispatch, useSelector } from 'react-redux'
import { selectDisabled } from './calculatorSlice.js'

const OperatorPanel = () => {
    const dispatch = useDispatch()
    const disabled = useSelector(selectDisabled)
    const standardRow = standardCalcSymbols.map((symbols, i) => (
        <StandardRow key={'row'+i}>
            <CalcButton style={symbols[0].bgColor} handleClick={() => dispatch(symbols[0].handler()(symbols[0].value))} disabled={symbols[0]?.control?disabled:false}>{symbols[0].display}</CalcButton>
            <CalcButton style={symbols[1].bgColor} handleClick={() => dispatch(symbols[1].handler()(symbols[1].value))} disabled={symbols[1]?.control?disabled:false}>{symbols[1].display}</CalcButton>
            <CalcButton style={symbols[2].bgColor} handleClick={() => dispatch(symbols[2].handler()(symbols[2].value))} disabled={symbols[2]?.control?disabled:false}>{symbols[2].display}</CalcButton>
            <CalcButton style={symbols[3].bgColor} handleClick={() => dispatch(symbols[3].handler()(symbols[3].value))} disabled={symbols[3]?.control?disabled:false}>{symbols[3].display}</CalcButton>
        </StandardRow>
    ))
    return (
        <div className='operatorPanel'>
            {standardRow}
        </div>
    )
}

export default OperatorPanel