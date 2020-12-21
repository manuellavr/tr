export default function Parciais({ partials }) {
    return (
        <>
            <div className="partials_label">
                <h1>Parciais</h1>
            </div>
            <div className="partials_container">
                {partials.map((partial, idx) => <h2 key={idx}> #{ idx + 1 }: &emsp; { partial }</h2>)}
            </div>
        </>
    )
}