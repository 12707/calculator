import './CalcButton.css'
const CalcButton = ({ handleClick, style, disabled, children }) => {
    return (
        <button className="button" style={{'background-color': style}} onClick={ handleClick } disabled={disabled}>
            {children}
        </button>
    )
}

export default CalcButton