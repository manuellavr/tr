import React from 'react'
import Parciais from './ParciaisClass'

export default class Cronometro extends React.Component {

    constructor() {
        super();
        this.state = {
            centiseconds: parseInt(sessionStorage.getItem('time') || 0),
            pause: true,
            partials: sessionStorage.getItem('partials') ? JSON.parse(sessionStorage.getItem('partials')) : []
        }

        this.togglePause = this.togglePause.bind(this)
        this.reset = this.reset.bind(this)
        this.addPartial = this.addPartial.bind(this)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    centisecondsToMinutes() {
        return Math.floor(this.state.centiseconds / 6000);
    }

    centisecondsToSeconds() {
        return Math.floor(this.state.centiseconds / 100 % 60);
    }

    startOrPauseStopwatch() {
        if (this.state.pause)
            clearInterval(this.interval)
        else {
            this.interval = setInterval(() => {
                this.setState(prev => ({
                    centiseconds: prev.centiseconds + 1
                }), () => { sessionStorage.setItem('time', this.state.centiseconds) });
            }, 10)
        }
    }

    togglePause() {
        this.setState(prev => ({ pause: !prev.pause }), () => {this.startOrPauseStopwatch()})
    }

    reset() {
        this.setState({ centiseconds: 0, partials: [] })
    }

    addPartial() {
        this.setState(prev => ({ partials: [...prev.partials, `${this.centisecondsToMinutes()}:${this.centisecondsToSeconds()},${this.state.centiseconds % 100}`] }), () => { sessionStorage.setItem('partials', JSON.stringify(this.state.partials))})
    }

    render() {
        return (
            <>
                <div className="stopwatch main">
                    <h1>Cronômetro</h1>
                    <h1>{this.centisecondsToMinutes()}:{this.centisecondsToSeconds()},{this.state.centiseconds % 100}</h1>

                    <button onClick={this.togglePause}>{this.state.pause ? 'Iniciar' : 'Pausar'}</button>
                    <button onClick={this.reset}>Zerar</button>
                    <button onClick={this.addPartial}>Parcial</button>
                </div>

                <Parciais partials={this.state.partials} />
            </>
        );
    }
}