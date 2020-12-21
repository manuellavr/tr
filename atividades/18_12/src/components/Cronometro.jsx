export default function Cronometro({ centiseconds }) {
    return (
        <div>
            <h1>Cronômetro</h1>
            <h1>{Math.floor(centiseconds/6000)}:{Math.floor(centiseconds/100 % 60)},{centiseconds%100}</h1>
        </div>
    )
}