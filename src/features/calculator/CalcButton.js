import './CalcButton.css'
const CalcButton = ({ handleClick, style, children }) => {
    return (
        <button className="button" style={{'background-color': style}} onClick={ handleClick }>
            {children}
        </button>
    )
}

export default CalcButton