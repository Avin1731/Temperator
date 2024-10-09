// src/App.js
import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';
import './App.css';

function App() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [reamur, setReamur] = useState('');
  const [kelvin, setKelvin] = useState('');
  const [howToCalculate, setHowToCalculate] = useState('');
  const [inputType, setInputType] = useState('Celsius'); 
  const [outputType, setOutputType] = useState('Fahrenheit');

  const handleCelsiusChange = (e) => {
    const value = e.target.value;
    setCelsius(value);
    if (value !== '') {
      calculateFromCelsius(value);
    } else {
      resetOutputs();
    }
  };

  const handleFahrenheitChange = (e) => {
    const value = e.target.value;
    setFahrenheit(value);
    if (value !== '') {
      calculateFromFahrenheit(value);
    } else {
      resetOutputs();
    }
  };

  const handleReamurChange = (e) => {
    const value = e.target.value;
    setReamur(value);
    if (value !== '') {
      calculateFromReamur(value);
    } else {
      resetOutputs();
    }
  };

  const handleKelvinChange = (e) => {
    const value = e.target.value;
    setKelvin(value);
    if (value !== '') {
      calculateFromKelvin(value);
    } else {
      resetOutputs();
    }
  };

  const calculateFromCelsius = (value) => {
    setFahrenheit(((parseFloat(value) * 9 / 5) + 32).toFixed(2));
    setReamur((value * 4 / 5).toFixed(2));
    setKelvin((parseFloat(value) + 273.15).toFixed(2));
    if (outputType === 'Fahrenheit') {
      setHowToCalculate(`${value} °C * (9/5) + 32 = ${((parseFloat(value) * 9 / 5) + 32).toFixed(2)} °F`);
    } else if (outputType === 'Reamur') {
      setHowToCalculate(`${value} °C * (4/5) = ${(value * 4 / 5).toFixed(2)} °R`);
    } else {
      setHowToCalculate(`${value} °C + 273.15 = ${((parseFloat(value) + 273.15)).toFixed(2)} K`);
    }
  };

  const calculateFromFahrenheit = (value) => {
    setCelsius((((parseFloat(value) - 32) * 5 / 9)).toFixed(2));
    setReamur((((parseFloat(value) - 32) * 4 / 9)).toFixed(2));
    setKelvin((((parseFloat(value) - 32) * 5 / 9) + 273.15).toFixed(2));

    if (outputType === 'Celsius') {
        setHowToCalculate(`${value} °F - 32 * (5/9) = ${((parseFloat(value) - 32) * 5 / 9).toFixed(2)} °C`);
    } else if (outputType === 'Reamur') {
        setHowToCalculate(`${value} °F - 32 * (4/9) = ${((parseFloat(value) - 32) * 4 / 9).toFixed(2)} °R`);
    } else {
        setHowToCalculate(`${value} °F - 32 * (5/9) + 273.15 = ${(((parseFloat(value) - 32) * 5 / 9) + 273.15).toFixed(2)} K`);
    }
  };

  const calculateFromReamur = (value) => {
    const celsiusValue = value * 5 / 4;
    setCelsius(celsiusValue.toFixed(2));
    setFahrenheit(((celsiusValue * 9 / 5) + 32).toFixed(2));
    setKelvin((celsiusValue + 273.15).toFixed(2));

    if (outputType === 'Celsius') {
       setHowToCalculate(`${value} °R * (5/4) = ${celsiusValue.toFixed(2)} °C`);
    } else if (outputType === 'Fahrenheit') {
       setHowToCalculate(`${value} °R * (5/4) * (9/5) + 32 = ${((celsiusValue * 9 / 5) + 32).toFixed(2)} °F`);
    } else {
       setHowToCalculate(`${value} °R * (5/4) + 273.15 = ${((celsiusValue + 273.15).toFixed(2))} K`);
    }
  };

  const calculateFromKelvin = (value) => {
    const celsiusValue = value - 273.15;
    setCelsius(celsiusValue.toFixed(2));
    setFahrenheit((((celsiusValue * 9) / 5) + 32).toFixed(2));
    setReamur((celsiusValue * 4 / 5).toFixed(2));
    if (outputType === 'Celsius') {
      setHowToCalculate(`${value} K - 273.15 = ${celsiusValue.toFixed(2)} °C`);
    } else if (outputType === 'Fahrenheit') {
      setHowToCalculate(`${value} K - 273.15 * (9/5) + 32 = ${(((((celsiusValue * 9) / 5) + 32).toFixed(2)))} °F`);
    } else {
      setHowToCalculate(`${value} K - 273.15 * (4/5) = ${((celsiusValue * 4 / 5).toFixed(2))} °R`);
    }
  };

  const resetOutputs = () => {
    setFahrenheit('');
    setReamur('');
    setKelvin('');
    setHowToCalculate('');
  };

  const handleReset = () => {
    setCelsius('');
    setFahrenheit('');
    setReamur('');
    setKelvin('');
    setHowToCalculate('');
  };

  const handleReverse = () => {
    const tempInputValue = inputType === 'Celsius' ? celsius :
                           inputType === 'Fahrenheit' ? fahrenheit :
                           inputType === 'Reamur' ? reamur :
                           kelvin;

    if (inputType === 'Celsius') {
      setFahrenheit(tempInputValue);
      setCelsius('');
      setInputType('Fahrenheit');
      setOutputType('Celsius');
    } else if (inputType === 'Fahrenheit') {
      setCelsius(tempInputValue);
      setFahrenheit('');
      setInputType('Celsius');
      setOutputType('Fahrenheit');
    } else if (inputType === 'Reamur') {
      setKelvin(tempInputValue);
      setReamur('');
      setInputType('Kelvin');
      setOutputType('Reamur');
    } else if (inputType === 'Kelvin') {
      setReamur(tempInputValue);
      setKelvin('');
      setInputType('Reamur');
      setOutputType('Kelvin');
    }

    setHowToCalculate('');
  };

  const handleConvert = () => {
    switch (inputType) {
      case 'Celsius':
        calculateFromCelsius(celsius);
        break;
      case 'Fahrenheit':
        calculateFromFahrenheit(fahrenheit);
        break;
      case 'Reamur':
        calculateFromReamur(reamur);
        break;
      case 'Kelvin':
        calculateFromKelvin(kelvin);
        break;
      default:
        break;
    }
  };

  return (
    <div className="App">
      <div className="converter">
        <h1>
          <Thermometer className="icon" />
          Temperator
        </h1>

        <div className="input-group">
          <label>
            Select Input Type:
            <select onChange={(e) => setInputType(e.target.value)} value={inputType}>
              <option value="Celsius">Celsius (°C)</option>
              <option value="Fahrenheit">Fahrenheit (°F)</option>
              <option value="Reamur">Reamur (°R)</option>
              <option value="Kelvin">Kelvin (K)</option>
            </select>
          </label>
        </div>

        {inputType === 'Celsius' && (
          <div className="input-group">
            <label>
              Celsius (°C)
              <input
                type="number"
                value={celsius}
                onChange={handleCelsiusChange}
                placeholder="Enter temperature in Celsius"
              />
            </label>
          </div>
        )}

        {inputType === 'Fahrenheit' && (
          <div className="input-group">
            <label>
              Fahrenheit (°F)
              <input
                type="number"
                value={fahrenheit}
                onChange={handleFahrenheitChange}
                placeholder="Enter temperature in Fahrenheit"
              />
            </label>
          </div>
        )}

        {inputType === 'Reamur' && (
          <div className="input-group">
            <label>
              Reamur (°R)
              <input
                type="number"
                value={reamur}
                onChange={handleReamurChange}
                placeholder="Enter temperature in Reamur"
              />
            </label>
          </div>
        )}

        {inputType === 'Kelvin' && (
          <div className="input-group">
            <label>
              Kelvin (K)
              <input
                type="number"
                value={kelvin}
                onChange={handleKelvinChange}
                placeholder="Enter temperature in Kelvin"
              />
            </label>
          </div>
        )}

        <div className="button-group">
          <button className="convert-button" onClick={handleConvert}>
            Convert
          </button>
          <button className="convert-button" onClick={handleReset}>
            Reset
          </button>
          <button className="convert-button" onClick={handleReverse}>
            Reverse
          </button>
        </div>

        <div className="output-group pad">
          <label>
            Select Output Type:
            <select 
              onChange={(e) => setOutputType(e.target.value)} 
              value={outputType}
            >
              <option value="Celsius" disabled={inputType === 'Celsius'}>Celsius (°C)</option>
              <option value="Fahrenheit" disabled={inputType === 'Fahrenheit'}>Fahrenheit (°F)</option>
              <option value="Reamur" disabled={inputType === 'Reamur'}>Reamur (°R)</option>
              <option value="Kelvin" disabled={inputType === 'Kelvin'}>Kelvin (K)</option>
            </select>
          </label>
        </div>

        <div className="output-group">
          <label>
            {outputType} ({outputType === 'Celsius' ? '°C' : outputType === 'Fahrenheit' ? '°F' : outputType === 'Reamur' ? '°R' : 'K'})
            <input
              type="number"
              value={outputType === 'Celsius' ? celsius : outputType === 'Fahrenheit' ? fahrenheit : outputType === 'Reamur' ? reamur : kelvin }
              placeholder={`Output temperature in ${outputType}`}
              readOnly
            />
          </label>
        </div>

        <div className="how-to-calculate">
          <h2>How to Calculate</h2>
          <textarea
            value={howToCalculate}
            placeholder="Calculation process will be displayed here..."
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default App;