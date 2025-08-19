
let setBg = (main = "")=>{
    let name = "";
    if(main == "Thunderstorm") name = "Thunderstorm";
    else if(main == "Rain" || main == "Drizzle" ) name = "Rain";
    else if(main == "Mist" || main == "Smoke" || main == "Haze" || main == "Dust" || main == "Fog" || main == "Sand") name = "Mist";
    else if(main == "Clear" || main == "Sunny") name = "Sunny";
    else if (main == "Tornado") name = "Tornado";
    else if(main== "Clouds" ) name = "Clouds";

    let body = document.querySelector("body");
    body.style.backgroundImage = `url('../bgs/bg${name}.jpg')`;
}

export {setBg}