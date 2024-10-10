import React, { useState } from 'react';
import { Thermometer } from 'lucide-react';
import './App.css';

// Fungsi untuk mengatur elemen di <head>
function setHeadElement() {
  document.title = "My Application Title"; // Set title
  const metaDescription = document.createElement('meta');
  metaDescription.name = "description";
  metaDescription.content = "This is a description of my application.";
  document.head.appendChild(metaDescription);
}

// Komponen Header
function Header() {
  return (
    <section>
      <header className='jumbotron'>
      <h1 className='h1-font'><Thermometer className="icon" />
       Temperator
      </h1>
          <nav className='nav'>
              <ul className='ul'>
                  <li className='li'><a href="#home">Home</a></li>
                  <li className='li'><a href="#about">About</a></li>
                  <li className='li'><a href="#contact">Contact</a></li>
              </ul>
          </nav>
      </header>
    </section>
  );
}

// Komponen Footer
function Footer() {
  return (
      <footer className='footer'>
          <p>&copy; 2024 Shiny1412. Temperator. All rights reserved.</p>
      </footer>
  );
}

function App() {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [reamur, setReamur] = useState('');
  const [kelvin, setKelvin] = useState('');
  const [howToCalculate, setHowToCalculate] = useState('');
  const [howCalculate, setHowCalculate] = useState('');
  const [inputType, setInputType] = useState('Celsius'); 
  const [outputType, setOutputType] = useState('Fahrenheit');

  {
  // Menggunakan useEffect untuk memanggil setHeadElement saat komponen dimount
    React.useEffect(() => {
        setHeadElement();
    }, []);

  // Change handlers
  const handleCelsiusChange = (e) => setCelsius(e.target.value);
  const handleFahrenheitChange = (e) => setFahrenheit(e.target.value);
  const handleReamurChange = (e) => setReamur(e.target.value);
  const handleKelvinChange = (e) => setKelvin(e.target.value);

  const calculateFromCelsius = (value) => {
    const f = ((parseFloat(value) * 9 / 5) + 32).toFixed(2);
    const r = (value * 4 / 5).toFixed(2);
    const k = (parseFloat(value) + 273.15).toFixed(2);
    
    setFahrenheit(f);
    setReamur(r);
    setKelvin(k);
    
    if (outputType === 'Fahrenheit') {
      setHowToCalculate(`${value} °C * (9/5) + 32 = ${f} °F`);
    } else if (outputType === 'Reamur') {
      setHowToCalculate(`${value} °C * (4/5) = ${r} °R`);
    } else {
      setHowToCalculate(`${value} °C + 273.15 = ${k} K`);
    }
  };

  const calculateFromFahrenheit = (value) => {
    const c = (((parseFloat(value) - 32) * 5 / 9)).toFixed(2);
    const r = ((((parseFloat(value) - 32) * 4 / 9))).toFixed(2);
    const k = ((((parseFloat(value) - 32) * 5 / 9) + 273.15)).toFixed(2);
    
    setCelsius(c);
    setReamur(r);
    setKelvin(k);

    if (outputType === 'Celsius') {
      setHowToCalculate(`${value} °F - 32 * (5/9) = ${c} °C`);
    } else if (outputType === 'Reamur') {
      setHowToCalculate(`${value} °F - 32 * (4/9) = ${r} °R`);
    } else {
      setHowToCalculate(`${value} °F - 32 * (5/9) + 273.15 = ${k} K`);
    }
  };

  const calculateFromReamur = (value) => {
    const celsiusValue = (value * 5 / 4).toFixed(2);
    const f = ((celsiusValue * 9 / 5) + 32).toFixed(2);
    const k = (parseFloat(celsiusValue) + 273.15).toFixed(2);
    
    setCelsius(celsiusValue);
    setFahrenheit(f);
    setKelvin(k);

    if (outputType === 'Celsius') {
       setHowToCalculate(`${value} °R * (5/4) = ${celsiusValue} °C`);
    } else if (outputType === 'Fahrenheit') {
       setHowToCalculate(`${value} °R * (5/4) * (9/5) + 32 = ${f} °F`);
    } else {
       setHowToCalculate(`${value} °R * (5/4) + 273.15 = ${k} K`);
    }
  };

  const calculateFromKelvin = (value) => {
    const celsiusValue = (value - 273.15).toFixed(2);
    const f = (((parseFloat(celsiusValue) * 9) / 5) + 32).toFixed(2);
    const r = (celsiusValue * 4 / 5).toFixed(2);
    
    setCelsius(celsiusValue);
    setFahrenheit(f);
    setReamur(r);

    if (outputType === 'Celsius') {
      setHowToCalculate(`${value} K - 273.15 = ${celsiusValue} °C`);
    } else if (outputType === 'Fahrenheit') {
      setHowToCalculate(`${value} K - 273.15 * (9/5) + 32 = ${f} °F`);
    } else {
      setHowToCalculate(`${value} K - 273.15 * (4/5) = ${r} °R`);
    }
  };

  // Reset Outputs
  const handleReset = () => {
    setCelsius('');
    setFahrenheit('');
    setReamur('');
    setKelvin('');
    setHowToCalculate('');
  };

  // Reverse input and output types
  const handleReverse = () => {
    // Logic to handle reversing the input and output types
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
        if (outputType === 'Fahrenheit') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Celsius (°C) to Fahrenheit (°F)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Fahrenheit (°F)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°F)</sub> = (<span className="suhu-style">S</span><sub>(°C)</sub> x 9/5) + 32
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°F)</sub> = (<span className="suhu-style">S</span><sub>(°C)</sub> x 1.8) + 32
              </p>
            </article>
          </section>);
        } else if (outputType === 'Reamur') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Celsius (°C) to Reamur (°R)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Reamur (°R)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°R)</sub> = (<span className="suhu-style">S</span><sub>(°C)</sub> x 4/5)
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°R)</sub> = (<span className="suhu-style">S</span><sub>(°C)</sub> x 0.8)
              </p>
            </article>
          </section>);
        } else if (outputType === 'Kelvin') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Celsius (°C) to Kelvin (K)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Kelvin (K)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(K)</sub> = (<span className="suhu-style">S</span><sub>(°C)</sub> + 273.15
              </p>
            </article>
          </section>);
        }
        break;

      case 'Fahrenheit':
        calculateFromFahrenheit(fahrenheit);
        if (outputType === 'Celsius') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Fahrenheit (°F) to celsius (°C)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Celsius (°C)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°C)</sub> = (<span className="suhu-style">S</span><sub>(°F)</sub> -32) x 5/9
              </p>
            </article>
          </section>);
          
        } else if (outputType === 'Reamur') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Fahrenheit (°F) to Reamur (°R)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Reamur (°R)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°R)</sub> = (<span className="suhu-style">S</span><sub>(°F)</sub> -32) x 4/9
              </p>
            </article>
          </section>);

        } else if (outputType === 'Kelvin') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Fahrenheit (°F) to Kelvin (K)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Kelvin (K)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(K)</sub> = (<span className="suhu-style">S</span><sub>(°F)</sub> -32) x 5/9 + 273.15
              </p>
            </article>
          </section>);
        }
        break;

      case 'Reamur':
        calculateFromReamur(reamur);
        if (outputType === 'Celsius') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Reamur (°R) to celsius (°C)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Celsius (°C)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°C)</sub> = (<span className="suhu-style">S</span><sub>(°R)</sub> 5/4)
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°C)</sub> = (<span className="suhu-style">S</span><sub>(°R)</sub> x 1.25)
              </p>
            </article>
          </section>);
        } else if (outputType === 'Fahrenheit') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Reamur (°R) to Fahrenheit (°F)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Fahrenheit (°F)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°F)</sub> = (<span className="suhu-style">S</span><sub>(°R)</sub> 9/4) + 32
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°F)</sub> = (<span className="suhu-style">S</span><sub>(°R)</sub> x 2.25) + 32
              </p>
            </article>
          </section>);
        } else if (outputType === 'Kelvin') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Reamur (°R) to Kelvin (K)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Kelvin (K)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(K)</sub> = (<span className="suhu-style">S</span><sub>(°R)</sub> 5/4) + 273.15
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(K)</sub> = (<span className="suhu-style">S</span><sub>(°R)</sub> x 1.25) + 273.15
              </p>
            </article>
          </section>);
        }
        break;
      case 'Kelvin':
        calculateFromKelvin(kelvin);
        if (outputType === 'Celsius') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Kelvin (K) to Celsius (°C)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Celsius (°C)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°C)</sub> = (<span className="suhu-style">S</span><sub>(K)</sub> - 273.15)
              </p>
            </article>
          </section>);
        } else if (outputType === 'Fahrenheit') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Kelvin (K) to Fahrenheit (°F)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Fahrenheit (°F)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°F)</sub> = (<span className="suhu-style">S</span><sub>(K)</sub> - 273.15) x 9/5 + 32
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°F)</sub> = (<span className="suhu-style">S</span><sub>(K)</sub> - 273.15) x 1.8 + 32
              </p>
            </article>
          </section>);
        } else if (outputType === 'Reamur') {
          setHowCalculate(<section>
            <header>
              <h3>How to Calculate Kelvin (K) to Reamur (°R)</h3>
            </header>
  
            <article className="card padleft.p1">
              <p className='p'>
                Suhu  
                <span className="suhu-style">S</span> dalam derajat Reamur (°R)
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°R)</sub> = (<span className="suhu-style">S</span><sub>(K)</sub> - 273.15) x 4/5
              </p>
              <p className='p padleft'>
                atau
              </p>
              <p className='p padleft'>
                <span className="suhu-style">S</span><sub>(°R)</sub> = (<span className="suhu-style">S</span><sub>(K)</sub> - 273.15) x 0.8
              </p>
            </article>
          </section>);
        }
        break;
      default:
        break;
    }
  };

  return (
    <body className="App">
      <Header/>
      <main className="converter">

        <section className="input-group">
          <select onChange={(e) => setInputType(e.target.value)} value={inputType}>
            <option value="Celsius">Celsius (°C)</option>
            <option value="Fahrenheit">Fahrenheit (°F)</option>
            <option value="Reamur">Reamur (°R)</option>
            <option value="Kelvin">Kelvin (K)</option>
          </select>
        </section>

        {inputType === 'Celsius' && (
          <section className="input-group">
            <label>
              Celsius (°C)
              <input className='marleft'
                type="number"
                value={celsius}
                onChange={handleCelsiusChange}
                placeholder="Enter temperature in Celsius"
              />
            </label>
          </section>
        )}

        {inputType === 'Fahrenheit' && (
          <section className="input-group">
            <label>
              Fahrenheit (°F)
              <input className='marleft'
                type="number"
                value={fahrenheit}
                onChange={handleFahrenheitChange}
                placeholder="Enter temperature in Fahrenheit"
              />
            </label>
          </section>
        )}

        {inputType === 'Reamur' && (
          <section className="input-group">
            <label>
              Reamur (°R)
              <input className='marleft'
                type="number"
                value={reamur}
                onChange={handleReamurChange}
                placeholder="Enter temperature in Reamur"
              />
            </label>
          </section>
        )}

        {inputType === 'Kelvin' && (
          <section className="input-group">
            <label>
              Kelvin (K)
              <input className='marleft'
                type="number"
                value={kelvin}
                onChange={handleKelvinChange}
                placeholder="Enter temperature in Kelvin"
              />
            </label>
          </section>
        )}

        <section className="button-group padleft">
          <button className="convert-button button button-convert" onClick={handleConvert}>
            Convert
          </button>
          <button className="convert-button button button-reset" onClick={handleReset}>
            Reset
          </button>
          <button className="convert-button button button-reverse" onClick={handleReverse}>
            Reverse
          </button>
        </section>

        <section className="output-group pad">
          <select onChange={(e) => setOutputType(e.target.value)} value={outputType}>
            <option value="Celsius" disabled={inputType === 'Celsius'}>Celsius (°C)</option>
            <option value="Fahrenheit" disabled={inputType === 'Fahrenheit'}>Fahrenheit (°F)</option>
            <option value="Reamur" disabled={inputType === 'Reamur'}>Reamur (°R)</option>
            <option value="Kelvin" disabled={inputType === 'Kelvin'}>Kelvin (K)</option>
          </select>
        </section>

        <section className="output-group">
          <label>
            {outputType} ({outputType === 'Celsius' ? '°C' : outputType === 'Fahrenheit' ? '°F' : outputType === 'Reamur' ? '°R' : 'K'})
            <input className='marleft'
              type="number"
              value={outputType === 'Celsius' ? celsius : outputType === 'Fahrenheit' ? fahrenheit : outputType === 'Reamur' ? reamur : kelvin }
              placeholder={`Output temperature in ${outputType}`}
              readOnly
            />
          </label>
        </section>

        <section className="how-to-calculate">
          <h2>How to Calculate</h2>
          <input className='marleft'
            value={howToCalculate}
            placeholder={`Calculation process will be displayed here...`}
            readOnly
          />
        </section>

        <section className="how-calculate">
          <p>{howCalculate}</p>
        </section>
      </main>
      <Footer/>
    </body>
  );
}}
export default App;