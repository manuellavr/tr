import { useState, useEffect, useRef } from 'react'
import Select from './Select'

const Timer = () => {
    const selectHour = useRef(null)
    const selectMinute = useRef(null)
    const selectSeconds = useRef(null)
    const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(() => { 
        return localStorage.getItem('timeLeft') || 0
    });
    const [pause, setPause] = useState(true);
    const [currentlyCounting, setCurrentlyCounting] = useState(() => localStorage.getItem('isCounting') || false);

    useEffect(() => {
        let interval;

        if (!pause) {
            interval = setInterval(() => {
                if (timeLeftInSeconds > 0) {
                    setTimeLeftInSeconds(timeLeft => timeLeft - 1)
                    localStorage.setItem('timeLeft', timeLeftInSeconds - 1)
                }
                else {
                    setCurrentlyCounting(false)
                    localStorage.setItem('isCounting', false)
                    setPause(true)
                }
            }, 1000)
        }

        return () => { clearInterval(interval) }
    }, [timeLeftInSeconds, pause])

    const startTimer = () => {
        if (!currentlyCounting) {
            setCurrentlyCounting(true)
            localStorage.setItem('isCounting', true)
            setTimeLeftInSeconds((Number(selectHour.current.value) * 3600) + (Number(selectMinute.current.value) * 60) + Number(selectSeconds.current.value))
        }
        togglePause()
        limparCampos()
    }

    const togglePause = () => {
        setPause(pause => !pause)
    }

    const formatTime = () => {
        return `${Math.floor(timeLeftInSeconds / 3600 % 24)}:${Math.floor(timeLeftInSeconds / 60 % 60)}:${timeLeftInSeconds % 60}`;
    }

    const zerar = () => {
        setTimeLeftInSeconds(0)
        setCurrentlyCounting(false)
        setPause(true)
        localStorage.setItem('timeLeft', 0)
        localStorage.setItem('isCounting', false)
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
                    <Select reference={selectHour}
                        name='selectHour'
                        id='selectHour'
                        count={24} 
                    />
                    <Select reference={selectMinute}
                        name='selectMinute'
                        id='selectMinute'
                        count={60} 
                    />
                    <Select reference={selectSeconds}
                        name='selectSeconds'
                        id='selectSeconds'
                        count={60} 
                    />
                </div>
                <div className="timerComplement_buttons">
                    <button onClick={pause ? startTimer : togglePause}>{pause ? 'Iniciar ' : 'Pausar'}</button>
                    <button onClick={zerar}>Zerar</button>
                </div>
            </div>
        </>
    )
}

export default Timer;