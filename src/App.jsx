import React, { useEffect, useState } from "react";
import "./App.css";
import InputForm from "./InputForm";
import WeatherCard from "./WeatherCard";
import axios from "axios";

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    const storedWeatherData = sessionStorage.getItem("weatherData");

    if (storedWeatherData) {
      setData(JSON.parse(storedWeatherData));
    }
  }, []);

  const searchedCityName = async (cityName) => {
    try {
      const res = await axios.request({
        method: "GET",
        url: `${import.meta.env.VITE_API_URL}/${cityName}`,
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
          "X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
        },
      });
      sessionStorage.setItem("weatherData", JSON.stringify(res.data));
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ backgroundColor: " #1B262C", height: "1148px" }}
      className="weatherApp"
    >
      <h1
        style={{
          color: "#fff",
          fontSize: "40px",
          fontWeight: 600,
          textAlign: "center",
          lineHeight: 4,
        }}
      >
        Dark Weather
      </h1>
      <h2
        style={{
          color: "#fff",
          fontSize: "40px",
          fontWeight: 500,
          width: "778px",
          marginLeft: "22rem",
          textAlign: "center",
        }}
      >
        Seeing the weather of the whole world with&nbsp;
        <span className="gradient">Dark Weather!</span>
      </h2>

      <InputForm searchedCityName={searchedCityName} data={data} />

      <WeatherCard data={data} />
    </div>
  );
}

export default App;
