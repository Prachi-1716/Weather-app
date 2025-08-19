
let style = {
    margin:"0",
    padding: "0.5rem",
    fontSize: "12px",
    minWidth: "4rem"
}
let Data = ({property,  value, unit})=>{
    
    return (
        <span style={style} className="d-flex flex-column me-3">
            <span>{property} <i className="fa-solid fa-circle-exclamation opacity-25" style={{fontSize: "8px", color:"#080707ff"}}></i></span>
            <span>{value} {unit}</span>
        </span>
    )
}

export {Data};