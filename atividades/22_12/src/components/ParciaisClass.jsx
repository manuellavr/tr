import React from 'react'

export default class Parciais extends React.Component{

    render() {
        return (
            <>
                <div className="partials_label">
                    <h1>Parciais</h1>
                </div>
                <div className="partials_container">
                    {this.props.partials.map((partial, idx) => <h2 key={idx}> #{ idx + 1 }: &emsp; { partial }</h2>)}
                </div>
            </>
        )
    }
}