import { useEffect, useState } from 'react';

export default function Relogio() {

    const [clock, setClock] = useState('')

    useEffect(() => {
        const moment = require('moment-timezone')

        let interval = setInterval(() => {
            let localtime = moment().tz("Brazil/East").format('HH:mm:ss').toString()
            setClock(localtime)
        }, 1000)
        
        return () => { clearInterval(interval) }
    }, [clock])

    return (
        <div className="clock">
            <h1 className="clock_label">Relógio</h1>
            <h2 className="clock_time">{ clock }</h2>
        </div>
    )
}