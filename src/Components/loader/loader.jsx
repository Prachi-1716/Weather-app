import "./loader.css";
let Loader = ({loading})=>{
    return <>{loading ? <div className="spinner"></div>: ""}</>
}
export {Loader}
