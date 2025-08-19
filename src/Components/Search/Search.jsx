import "./Search.css";
import { CurrentLocationWeather } from "../CurrentLocation/currentLocationWeather";

let style = {
  minHeight: "7rem",
  backgroundColor: "#ffffff72",
  padding: "1rem",
  minWidth: "100%",
  borderBottom: "1px solid #686767ff",
};
let Search = ({
  input,
  handleChange,
  afterSubmit,
  setCurrentWeather,
  setError,
  setLoading,
  setLat, 
  setLon
}) => {
  return (
    <>
      <div className="row g-0 sticky-top p-3" style={style}>
        <h1>Weather App</h1>
        <form
          className="needs-validation col-8"
          onSubmit={afterSubmit}
          noValidate
        >
          <div className="row g-0">
            <div className="col-8 col-lg-4 col-md-6">
              <input
                id="search"
                className="form-control form-control-sm"
                type="text"
                placeholder="Mumbai, India"
                aria-label="location"
                value={input}
                onChange={handleChange}
                required
              ></input>
              <div className="invalid-feedback ">
                Please Enter valid location
              </div>
            </div>

            <div className="col-4">
              <button type="submit" className="btn btn-dark btn-sm">
                Search
              </button>
            </div>
          </div>
        </form>
        <div className="col-12 col-lg-2 col-md-4 ms-md-auto">
          <CurrentLocationWeather
            setCurrentWeather={setCurrentWeather}
            setError={setError}
            setLoading={setLoading}
            setLat={setLat}
            setLon={setLon}
          ></CurrentLocationWeather>
        </div>
      </div>
    </>
  );
};

export { Search };
