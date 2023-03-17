function BoxColor(props) {

    return (
        <button
            className="flex justify-center items-center"
            style={{
                width: '200px',
                height: '160px',
                borderRadius: '20px',
                background: `linear-gradient(135deg, ${props.color.color[0]}, ${props.color.color[1]}`,
            }}
            onClick={() => props.handleClick(props.color)}
        >
            <h2 className="">Theme {props.index + 1}</h2>
        </button>
    );
}

export default BoxColor;
