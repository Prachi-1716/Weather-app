import { getWeatherImage } from "../../Utils/getImage";
import "./HourlyWeatherItem.css";
let style = {
  minHeight: "7rem",
  minWidth: "9rem",
  borderRadius: "10px",
  background: "#fefefe3d",
  //boxShadow: "0 0 1px 1px #5553537c",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
  padding: "5px 15px",
};

let imgStyle = {
  height: "50px",
};

let HourlyWeatherItem = ({ forecast}) => {
  let localDate = forecast.dt_txt.split(" ")[0];
  let [year, month, day] = localDate.split("-");
  localDate = `${day}/${month}/${year}`;
  let imageSrc = getWeatherImage(`${forecast.weather[0].main}.png`);
  if(imageSrc == "") setError("image not found");
  
  return (
    <div className="d-flex flex-column align-items-center gap-2 weather-box" style={style}>
      <div className="date  mt-2">{localDate}</div>
      <div className="d-flex align-items-center gap-4">
        <span className="img">
          <img src={imageSrc} alt="img" style={imgStyle} />
        </span>
        <span className="mt-3">
          <p>{forecast.main.temp_min}</p>
          <p>{forecast.main.temp_max}</p>
        </span>
      </div>
    </div>
  );
};

export { HourlyWeatherItem };
// .toLocaleString().substring(0, 1)
