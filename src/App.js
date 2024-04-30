import Home from "./Home"
import { useState , useEffect } from "react"
import "./App.css"
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Weatherdays from "./Weatherdays"
const App = () => {
  
  useEffect(() =>{
    const current = new Date();
    if(current.getHours() > 6 && current.getHours() <= 18){
      document.body.style.backgroundColor = "#d4d2d2";
      document.body.style.color = "black";
    }else if(current.getHours() < 6 || current.getHours() >= 18){
      document.body.style.backgroundColor = "black";
      document.body.style.color = "white";
    }
},[])

  return (
    <Router>

      <div > 
        
          {/* <img src="https://i.pinimg.com/736x/6e/b0/8b/6eb08b08969a88e2e60a71e62dda2014.jpg" className="titlepic" /> */}
          <p className="title">
            <b>Weather App</b></p>
        
        <nav>
          <ul className="navbar">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/weatherdays">Weather</Link></li>
          </ul>
          <hr className="hr"></hr>
        </nav>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/weatherdays" element={<Weatherdays />}></Route>
        </Routes>
      </div>

    </Router>

  )
}

export default App;




















