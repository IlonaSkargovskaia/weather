import React, { useEffect, useState } from "react";
import "./WeatherApp.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";
import humidity_icon from "../assets/humidity.png";

const WeatherApp = () => {
    const [cityInput, setCityInput] = useState("Tel Aviv");
    const [location, setLocation] = useState("");
    const [humidity, setHumidity] = useState(0);
    const [wind, setWind] = useState(0);
    const [temp, setTemp] = useState(0);
    const [icon, setIcon] = useState(cloud_icon);
    const [err, setErr] = useState('');

    let api_key = "68452ea67cc4dfd6e0b4a50c4a8515c5";

    useEffect(() => {
        search();
    }, []);

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    const search = async () => {
        if (cityInput === "") {
            setErr('Please, enter a city')
            return;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${api_key}`;

        try {
            const resp = await fetch(url);
            const data = await resp.json();

            let celsius = Math.floor(data.main.temp - 273.15);

            setLocation(data.name);
            setHumidity(data.main.humidity);
            setWind(data.wind.speed);
            setTemp(celsius);
            setErr(''); 
            
            if (
                data.weather[0].icon === "01d" ||
                data.weather[0].icon === "01n"
            ) {
                setIcon(clear_icon);
            } else if (
                data.weather[0].icon === "02d" ||
                data.weather[0].icon === "02n"
            ) {
                setIcon(cloud_icon);
            } else if (
                data.weather[0].icon === "03d" ||
                data.weather[0].icon === "03n"
            ) {
                setIcon(drizzle_icon);
            } else if (
                data.weather[0].icon === "04d" ||
                data.weather[0].icon === "04n"
            ) {
                setIcon(drizzle_icon);
            } else if (
                data.weather[0].icon === "09d" ||
                data.weather[0].icon === "09n"
            ) {
                setIcon(rain_icon);
            } else if (
                data.weather[0].icon === "10d" ||
                data.weather[0].icon === "10n"
            ) {
                setIcon(rain_icon);
            } else if (
                data.weather[0].icon === "13d" ||
                data.weather[0].icon === "13n"
            ) {
                setIcon(snow_icon);
            } else {
                setIcon(clear_icon);
            }
        } catch (error) {
            setErr('Location is not defined, try again')
            console.log(error, "Error fetching Data");
        }
    };
    return (
        <div className="container">
            <div className="top-bar">
                <input
                    type="text"
                    className="cityInput"
                    placeholder="Search"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <div className="search-icon" onClick={() => search()}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            {err && <div className="error-msg">{err}</div>}
            <div className="weather-image">
                <img src={icon} alt="" />
            </div>
            <div className="weather-temp">{temp}°C</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">{wind} km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherApp;
