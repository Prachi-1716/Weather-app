'use client'
import { HourlyWeatherItem } from "./HourlyWeatherItem";

let HourlyWeatherForecast = ({ dailyForecast, wholeForecast, handleDate }) => {
  
  return (
    <div className="row">
      <div className="col-12 col-lg-9 mt-3 m-auto">
        <h5 className="mb-3">Hourly</h5>
      </div>
      <div className="col col-lg-9 m-auto d-flex flex-wrap gap-2 gap-lg-4">
        {dailyForecast.map((forecast, index) => (
          <div onClick={handleDate} key={index}>
            <HourlyWeatherItem forecast={forecast}  wholeForecast={wholeForecast}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export { HourlyWeatherForecast };
