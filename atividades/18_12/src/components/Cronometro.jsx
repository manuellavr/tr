import Parciais from './Parciais';
import { useState, useEffect } from 'react';

export default function Cronometro() {
    
    const [centiseconds, setCentiseconds] = useState(0)
    const [pause, setPause] = useState(true)
    const [partials, setPartials] = useState([])
  
    useEffect(() => { 
        let interval;

        if(!pause) {
            interval = setInterval(() => {
                        setCentiseconds(centiseconds => centiseconds + 1)
                    }, 10)
        }
        
        return () => { clearInterval(interval) }
    }, [pause, centiseconds])

    const togglePause = () => {
        setPause(pause => !pause);
    }
  
    const reset = () => {
        setCentiseconds(0)
        setPartials([])
    }

    const centisecondsToMinutes = () => {
      return Math.floor(centiseconds/6000);
    }
  
    const centisecondsToSeconds = () => {
      return Math.floor(centiseconds/100 % 60);
    }
  
    const addPartial = () => {
      setPartials(partials => [...partials, `${centisecondsToMinutes()}:${centisecondsToSeconds()},${centiseconds%100}`]);
    } 
    
    return (
        <>
            <div className="stopwatch">
                <h1>Cronômetro</h1>
                <h1>{centisecondsToMinutes()}:{centisecondsToSeconds()},{centiseconds%100}</h1>

                <button onClick={togglePause}>{ pause ? 'Iniciar' : 'Pausar' }</button>
                <button onClick={reset}>Zerar</button>
                <button onClick={addPartial}>Parcial</button>
            </div>

            <Parciais partials={partials} /> 
        </>
    )
}