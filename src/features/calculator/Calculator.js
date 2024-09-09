import './Calculator.css'
import DisplayPanel from './DisplayPanel'
import OperatorPanel from './OperatorPanel'

export const Calculator = () => {
    return (
        <div className='calculator'>
            <p className='header'>
                Calculator
            </p>
            <DisplayPanel />
            <OperatorPanel />
        </div>
    )
}