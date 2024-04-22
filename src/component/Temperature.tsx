"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";

interface WeatherData {
  main: {
    temp: number;
  };
  name: string;
}

const Temperature: React.FC<{ city: string }> = ({ city }) => {
  const [temperature, setTemperature] = useState<number | null>(null); // To store current temperature in Celsius

  const fetchTemperature = async () => {
    try {
      const response = await axios.get<WeatherData>(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f1b1deb02078091be15a42fdab5a6ee8&units=metric`
      );
      setTemperature(response.data.main.temp);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTemperature();
  }, []);

  return <div>{temperature !== null && <p>{temperature.toFixed(2)}°C</p>}</div>;
};

export default Temperature;
