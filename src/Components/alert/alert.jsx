
let Alert = ({error})=>{
    let op = error != "" ? <div className="alert alert-danger alert-dismissible fade show" role="alert">
        {error}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> : "";
    return <>{op}</>;
}

export {Alert};