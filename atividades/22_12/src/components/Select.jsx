const Select = ({ reference, name, id, count }) => {
    return (
        <select
            ref={reference}
            name={name}
            id={id}
        >
            {[...Array(count).keys()].map(x => <option key={x} value={x}>{x}</option>)}
        </select>
    )
}

export default Select