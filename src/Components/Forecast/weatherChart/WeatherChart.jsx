import {
  AreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from "recharts";
import { getWeatherImage } from "../../Utils/getImage";
import { useState, useEffect } from "react";
import "./WeatherChart.css";


let containerStyle = {
  border: "1px solid #fefefe17",
};

function filterData(date, forecast) {
  let filtered = forecast.filter((item) => {
    let forecastDate = new Date(item.dt * 1000).toLocaleDateString("en-GB");
    return forecastDate === date;
  });

  let data = [];

  for (let item of filtered) {

    let fullTime = item.dt_txt.split(" ")[1];
    let [hour, minute] = fullTime.split(":");
    hour = parseInt(hour);
    let period = hour >= 12 ? "PM" : "AM";
    hour = hour % 12 || 12;
    let formattedTime = `${hour}:${minute} ${period}`;

    let main = item.weather[0].main.trim();
    let url = getWeatherImage(`${main}.png`);
    if(url == "") setError("image not found");
    //console.log("item" , item);
    data.push({
      time: formattedTime,
      temp: item.main.temp,
      icon: url,
      rain: item.rain ? Object.values(item.rain)[0] : 0,
    });
  }
  return data;
}

let WeatherChart = ({ wholeForecast, date }) => {
  
  let data = filterData(date, wholeForecast);

  const [width, setWidth] = useState(window.innerWidth);
  const [xAxisInterval, setXAxisInterval] = useState(0); // default: show all

  useEffect(() => {
    const handleResize = async () => {
      setWidth((prevWidth) => {
        const newWidth = window.innerWidth;
        if (prevWidth !== newWidth) {
          return newWidth;
        }
      });
    };

    // Attach event listener
    window.addEventListener("resize", handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    setXAxisInterval(() => {
      if (width < 478) return 1;
      else return 0;
    });
  }, [width]);

  const CustomXAxisTick = ({ x, y, payload }) => {
    const value = payload.value;
    const matched = data.find((d) => d.time === value);
    const rain = matched?.rain ?? 0;
    const img = matched?.icon ?? "";
    const temp = matched?.temp ?? 35;

    return (
      <g transform={`translate(${x},${y})`}>
        {/* Time label (top) */}
        <text
          x={0}
          y={-355} // Negative y = above the axis
          dy={0}
          textAnchor="middle"
          fill="#0a0909"
          fontSize={12}
          angle={-45}
        >
          {value}
        </text>
        {/* show image */}
        {img && (
          <image
            href={img}
            x={-10} // to center the image
            y={-355} // place above the text
            width={20}
            height={20}
          />
        )}

        {/* show temp */}
        <text
          x={0}
          y={-335}
          dy={10}
          textAnchor="middle"
          fill="#0a0909"
          fontSize={12}
        >
          {temp}°
        </text>

        {/* Rain % label (bottom) */}
        <text
          x={0}
          y={12}
          dy={10}
          textAnchor="end"
          fill="#fdfeffff"
          fontSize={10}
        >
          💧{rain}%
        </text>
      </g>
    );
  };

  return (
    <div className="row">
      <div
        className="col-12 col-md-10 col-lg-8 col-xxl-6 p-md-2 ms-auto me-auto chart-container"
      >
        <h6>{date}</h6>
        <ResponsiveContainer
          width="100%"
          height="93%"
          className="p-2 mt-3"
          style={containerStyle}
        >
          <AreaChart data={data} margin={{ right: 30, top: 50 }}>
            <XAxis
              dataKey="time"
              tick={<CustomXAxisTick />}
              interval={xAxisInterval}
              height={60}
            />
            <YAxis
              tick={{ fill: "#0a0909ff", fontSize: 12 }}
              ticks={[0, 10, 20, 30, 40, 50, 60]}
              domain={[0, 60]}
              tickFormatter={(value) => `${value}°`}
            />
            <CartesianGrid stroke="#ffffff3b" strokeDasharray="2 2" />
            <Legend />
            <Tooltip
              contentStyle={{
                width: 60,
                backgroundColor: "#1b1b1b91",
                border: "none",
                fontSize: 9,
                color: "white",
              }}
            />

            <defs>
              <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#faaa15d1" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#faaa15d1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area
              type="monotone"
              dataKey="temp"
              fill="url(#tempGradient)"
              stroke="#eeaa2bd1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { WeatherChart };
