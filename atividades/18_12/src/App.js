import './App.css';
import Parciais from './components/Parciais';
import Button from './components/Button';
import Cronometro from './components/Cronometro';
import Partial from './components/Partial';
import Relogio from './components/Relogio';
import { useState, useEffect } from 'react';

function App() {

  const [centiseconds, setCentiseconds] = useState(0)
  const [pause, setPause] = useState(false)
  const [partials, setPartials] = useState([])
  
  useEffect(() => {

    let interval;

    if (!pause) {
      interval = setInterval(() => {
        setCentiseconds(centiseconds => centiseconds + 1)
      }, 10)
    }

    return () => { clearInterval(interval) }

  }, [centiseconds, pause])

  const zerar = () => {
    setCentiseconds(0)
    setPartials([])
  }

  const pausar = () => {
    setPause(pause => !pause);
  }

  const parcial = () => {
    setPartials(partials => [...partials, `${Math.floor(centiseconds/6000)}:
      ${Math.floor(centiseconds/100 % 60)},
      ${centiseconds%100}`]);
  } 

  return (
    <div className="App">

      <Relogio />

      <div className="stopwatch">
        <Cronometro
          centiseconds={centiseconds}
        />

        <Button onclick={pausar} text={ pause ? 'Play' : 'Pause' } />
        <Button onclick={zerar} text={ 'Zerar' } />
        <Button onclick={parcial} text={ 'Parcial' } />
      </div>

      <Parciais partials={partials} /> 

    </div>
  );
}

export default App;
