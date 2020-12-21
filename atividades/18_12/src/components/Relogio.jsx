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
            <h1>Relógio</h1>
            <h2>{ clock }</h2>
        </div>
    )
}