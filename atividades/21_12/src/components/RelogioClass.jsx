import React from 'react';

export default class Relogio extends React.Component {

    constructor() {
        super();
        this.state = {
            clock: ''
        }
        this.interval = null;
    }

    componentDidMount() {
        const moment = require('moment-timezone')

        this.interval = setInterval(() => {
            let localtime = moment().tz("Brazil/East").format('HH:mm:ss').toString()
            this.setState({ clock: localtime })
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() { 
        return (
            <div className="clock">
                <h1 className="clock_label">Relógio</h1>
                <h2 className="clock_time">{ this.state.clock }</h2>
            </div>
        );
    }
}