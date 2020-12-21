export default function Partial({ partials }) {
    return (
        <>
            <div className="partials_label">
                <h1>Parciais</h1>
            </div>
            <div className="partials_container">
                {partials && partials.map((part, idx) => <h3 key={idx}> #0{ idx }: { part }</h3>)}
            </div>
        </>
    )
}