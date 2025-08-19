const weatherImages = import.meta.glob("../assets/*.png", { eager: true });

const getWeatherImage = (imageName) => {
  return weatherImages[`../assets/${imageName}`]?.default || "";
};

export{getWeatherImage};