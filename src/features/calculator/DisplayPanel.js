import './DisplayPanel.css'
import { useSelector } from 'react-redux'
import { selectDisplayValue, selectHistory } from './calculatorSlice.js'
import { zero } from './Data.js'

const DisplayPanel = () => {
    const value = useSelector(selectDisplayValue)
    const history = useSelector(selectHistory)
    return (
        <div className='displayPanel'>
            <div className='operator'>
                { history }
            </div>
            <div className='display'>
                { value || zero }
            </div>
        </div>
    )
}

export default DisplayPanel