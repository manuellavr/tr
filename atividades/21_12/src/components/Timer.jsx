import { useState, useEffect, useRef } from 'react'

const Timer = () => {
    const selectHour = useRef(null)
    const selectMinute = useRef(null)
    const selectSeconds = useRef(null)
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(0);
    const [pause, setPause] = useState(true);
    const [currentlyCounting, setCurrentlyCounting] = useState(false);
    
    useEffect(() => {
        let interval;

        if(!pause) {
            interval = setInterval(() => {
                if(timeLeftInSeconds > 0) {
                    setTimeLeftInSeconds(timeLeft => timeLeft - 1)
                }
                else
                    setCurrentlyCounting(false)
            }, 1000)
        }

        return () => { clearInterval(interval) }
    }, [timeLeftInSeconds, pause])

    const startTimer = () => {
        if(!currentlyCounting) {  
            setCurrentlyCounting(true) 
            setTimeLeftInSeconds((Number(selectHour.current.value) * 3600) + (Number(selectMinute.current.value) * 60) + Number(selectSeconds.current.value))
        }
        togglePause()
        limparCampos()
    }

    const togglePause = () => {
        setPause(pause => !pause)
    }

    const formatTime = () => {
        return `${Math.floor(timeLeftInSeconds/3600 % 24)}:${Math.floor(timeLeftInSeconds/60 % 60)}:${timeLeftInSeconds % 60}`;
    }

    const zerar = () => {
        setTimeLeftInSeconds(0)
        setCurrentlyCounting(false)
        setPause(true)
    }

    const limparCampos = () => {
        selectHour.current.value = 0
        selectMinute.current.value = 0
        selectSeconds.current.value = 0
    }

    return (
        <>
        <div className='timer main'>
            <h1 className="timer_label">
                Timer
            </h1>
            <h1 className='timer_label'>
                {formatTime()}
            </h1>
        </div>
        <div className="timerComplement">
            <h1>
                Defina o tempo:
            </h1>
            <div className="timerComplement_select">
                <select 
                    ref={selectHour}
                    name='selectHour' 
                    id='selectHour' 
                >
                { [...Array(24).keys()].map(x => <option key={x} value={x}>{x}</option>) }
                </select>
                <select 
                    ref={selectMinute}
                    name='selectMinute' 
                    id='selectMinute' 
                >
                { [...Array(60).keys()].map(x => <option key={x} value={x}>{x}</option>) }
                </select>
                <select 
                    ref={selectSeconds}
                    name='selectSeconds' 
                    id='selectSeconds' 
                >
                { [...Array(60).keys()].map(x => <option key={x} value={x}>{x}</option>) }
                </select>
            </div>
            <div className="timerComplement_buttons">
                <button onClick={pause ? startTimer : togglePause }>{pause ? 'Iniciar ': 'Pausar' }</button>
                <button onClick={zerar}>Zerar</button>
            </div>
        </div>
        </>
    )
}

export default Timer;