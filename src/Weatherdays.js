import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './weatherdays.css'

const Weatherdays = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [day, setDay] = useState(0); // Initialize day with 0 for today

    useEffect(() => {
        // Fetch weather data when the component mounts
        handleWeather();
    }, [day]); // Fetch weather data whenever the day changes

    const handleWeather = async (e) => {
        if (e) e.preventDefault();
        if (!city) {
            setError("Please enter a city");
            return;
        }
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=bd5e378503939ddaee76f12ad7a97608`);
            setWeather(res.data);
            setError(null);
        } catch (err) {
            console.log("Error : ", err);
            setError("City not found");
            setWeather(null);
        }
    };

    const renderWeatherData = () => {
        if (!weather) return null;
        const currentDate = new Date();
        const currentDay = new Date();
        currentDay.setDate(currentDay.getDate() + day); // Adjust the date based on the selected day

        const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        const filteredData = weather.list.filter(item => {
            const itemDate = new Date(item.dt * 1000);
            return itemDate.getDate() === currentDay.getDate(); // Filter data for the selected day
        });

        const formatDate = (dateString) => {
            const date = new Date(dateString);
            const options = { year: 'numeric', day: 'numeric',month: 'long' };
            return date.toLocaleDateString('en-US', options);
        };
        
        const getCurrentTime = () => {
            const date = new Date();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours to 12-hour format
            hours = hours % 12;
            hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Add leading zero to minutes if needed
            minutes = minutes < 10 ? '0' + minutes : minutes;

            return `${hours}:${minutes}${ampm}`;
        };

        function getDirection(degrees) {
            // Convert degrees to radians
            const radians = degrees * Math.PI / 180;
            
            // Define direction based on radians
            if (radians >= -Math.PI / 8 && radians < Math.PI / 8) {
                return "East";
            } else if (radians >= Math.PI / 8 && radians < 3 * Math.PI / 8) {
                return "Northeast";
            } else if (radians >= 3 * Math.PI / 8 && radians < 5 * Math.PI / 8) {
                return "North";
            } else if (radians >= 5 * Math.PI / 8 && radians < 7 * Math.PI / 8) {
                return "Northwest";
            } else if (radians >= 7 * Math.PI / 8 || radians < -7 * Math.PI / 8) {
                return "West";
            } else if (radians >= -7 * Math.PI / 8 && radians < -5 * Math.PI / 8) {
                return "Southwest";
            } else if (radians >= -5 * Math.PI / 8 && radians < -3 * Math.PI / 8) {
                return "South";
            } else if (radians >= -3 * Math.PI / 8 && radians < -Math.PI / 8) {
                return "Southeast";
            } else {
                return "Unknown";
            }
        }

        if(day === 0) {
            return(
                <div className = "res-con">
                <div className='min-stat'>
                <div className='temp-det'>
                    <img src={`https://openweathermap.org/img/wn/${filteredData[0].weather[0].icon}@4x.png`}></img>
                    <p className='temp'>{(Math.round(filteredData[0].main.temp)*10)/10 - 273}°C</p>
                    <p>{filteredData[0].weather[0].description}</p>
                </div>
                <hr></hr>
                <div className='day-det'>
                    <p>{formatDate(filteredData[0].dt_txt.split(" ")[0])}</p>
                    <p>{week[new Date(filteredData[0].dt_txt).getDay()]}, {getCurrentTime()}</p>
                    <h1 className='city'>{weather.city.name}</h1>
                   </div>
                </div>
                <div className='max-stat'>
                    <div className='grid-item'>
                        <p>Wind</p>
                        <h2>{filteredData[0].wind.speed} km/h</h2>
                        <p>{getDirection(filteredData[0].wind.deg)}</p>
                    </div>
                    <div className='grid-item'>
                        <p>Humidity</p>
                        <h2>{filteredData[0].main.humidity} %</h2>
                    </div>
                    <div className='grid-item'>
                        <p>Real Feel</p>
                        <h2>{(Math.round(filteredData[0].main.feels_like)*10)/10 - 273}°C </h2>
                    </div>
                    <div className='grid-item'>
                        <p>Clouds</p>
                        <h2>{filteredData[0].clouds.all} % </h2>
                    </div>
                    <div className='grid-item'>
                        <p>Pressure</p>
                        <h2>{filteredData[0].main.pressure} mb</h2>
                    </div>
                    <div className='grid-item'>
                        <p>Visibility</p>
                        <h2>{filteredData[0].visibility / 1000} km</h2>
                    </div>
                    <div className='grid-item'>
                        <p>Temperature history</p>
                        <h2>{(Math.round(filteredData[0].main.temp_max)*10)/10 - 273}°C <span style={{color: "red"}}>▲</span></h2>
                        <h2>{(Math.round(filteredData[0].main.temp_min)*10)/10 - 273}°C  <span style={{color: "green"}}>▼</span> </h2>
                    </div>
                    <div className='grid-item'>
                        <p>Ground Level pressure</p>
                        <h3>{filteredData[0].main.grnd_level} mb</h3>
                    </div>
                    <div className='grid-item'>
                        <p>Sea Level pressure</p>
                        <h3>{filteredData[0].main.sea_level} mb</h3>
                    </div>
                </div>
                </div>

            )
        }    
        else{
            return(
                <div className = "res-con">
                <div className='min-stat'>    
                <div className='temp-det'>
                    <img src={`https://openweathermap.org/img/wn/${filteredData[1].weather[0].icon}@4x.png`}></img>
                    <p className='temp'>{(Math.round(filteredData[1].main.temp)*10)/10 - 273}°C</p>
                    <p>{filteredData[1].weather[0].description}</p>
                </div>
                <hr></hr>
                <div className='day-det'>
                    <p>{formatDate(filteredData[1].dt_txt.split(" ")[0])}</p>
                    <p>{week[new Date(filteredData[1].dt_txt).getDay()]}</p>
                    <h1>{weather.city.name}</h1>
                   </div>
                </div>
                <div className='max-stat'>
                    <div className='grid-item'>
                        <p>Wind</p>
                        <h2>{filteredData[1].wind.speed} km/h</h2>
                        <p>{getDirection(filteredData[1].wind.deg)}</p>
                    </div>
                    <div className='grid-item'>
                        <p>Humidity</p>
                        <h2>{filteredData[1].main.humidity} %</h2>
                    </div>
                    <div className='grid-item'>
                        <p>Real Feel</p>
                        <h2>{(Math.round(filteredData[1].main.feels_like)*10)/10 - 273}°C </h2>
                    </div>
                    <div className='grid-item'>
                        <p>Clouds</p>
                        <h2>{filteredData[1].clouds.all} % </h2>
                    </div>
                    <div className='grid-item'>
                        <p>Pressure</p>
                        <h2>{filteredData[1].main.pressure} mb</h2>
                    </div>
                    <div className='grid-item'>
                        <p>Visibility</p>
                        <h2>{filteredData[1].visibility / 1000} km</h2>
                    </div>
                    <div className='grid-item'>
                        <p>Temperature history</p>
                        <h2>{(Math.round(filteredData[1].main.temp_max)*10)/10 - 273}°C <span style={{color: "red"}}>▲</span></h2>
                        <h2>{(Math.round(filteredData[1].main.temp_min)*10)/10 - 273}°C  <span style={{color: "green"}}>▼</span> </h2>
                    </div>
                    <div className='grid-item'>
                        <p>Ground Level pressure</p>
                        <h3>{filteredData[1].main.grnd_level} mb</h3>
                    </div>
                    <div className='grid-item'>
                        <p>Sea Level pressure</p>
                        <h3>{filteredData[1].main.sea_level} mb</h3>
                    </div>
                </div>
                </div>
            )
        }
        
    };

    return (
        <div className='container'>
            <div className='header'>
                <form onSubmit={handleWeather}>
                    <input type='text' value={city} placeholder="eg: Chennai" onChange={(e) => setCity(e.target.value)} />
                    <button type='submit'>🔍</button>
                </form>
                <div className='title'>
                <button onClick={() => setDay(0)}>Today</button>
                <button onClick={() => setDay(1)}>Tomorrow</button></div>
            </div>
            {renderWeatherData()}
        </div>
    );
};

export default Weatherdays;