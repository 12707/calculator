import './DisplayPanel.css'
import { useSelector } from 'react-redux'
import { selectDisplayValue, selectOperator, selectFactor1, selectFactor2 } from './calculatorSlice.js'
import { zero } from './Data.js'

const DisplayPanel = () => {
    const value = useSelector(selectDisplayValue)
    const operator = useSelector(selectOperator)
    const factor1 = useSelector(selectFactor1)
    const factor2 = useSelector(selectFactor2)
    return (
        <div className='displayPanel'>
            <div className='operator'>
                {factor1?.toString()} { operator } {factor2?.toString()}
            </div>
            <div className='display'>
                { value || zero }
            </div>
        </div>
    )
}

export default DisplayPanel