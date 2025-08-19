let mapInstance = null;

function waitForMapElement(callback, setError) {
  const checkExist = setInterval(() => {
    const mapDiv = document.querySelector("#map");
    if (mapDiv) {
      clearInterval(checkExist);
      try {
        callback(mapDiv);
      } catch (err) {
        setError(err.message || "Some unknown error occurred");
      }
    }
  }, 50);
}

window.createMap = (lat, lon, city) => {
  waitForMapElement((div) => {
    if (!mapInstance) {
      mapInstance = L.map(div).setView([lat, lon], 4);

      // Base map
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
      }).addTo(mapInstance);

      const apiKey = "156ef37ef51ac4281095600d40c6cb81";

      // Overlays
      const tempLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        { opacity: 0.5 }
      );
      const cloudsLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        { opacity: 0.5 }
      );
      const rainLayer = L.tileLayer(
        `https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`,
        { opacity: 0.5 }
      );

      L.control.layers(
        { Temperature: tempLayer, Clouds: cloudsLayer, Rain: rainLayer },
        null
      ).addTo(mapInstance);

      tempLayer.addTo(mapInstance);
      L.marker([lat, lon]).addTo(mapInstance).bindPopup(city);

    } else {
      mapInstance.setView([lat, lon], 4);
      L.marker([lat, lon]).addTo(mapInstance).bindPopup(city);
    }

    document.querySelector(".leaflet-control-attribution").style.display = "none";
  });
};
