const LETTERS = ["L", "O", "A", "D", "I", "N", "G"];

export function Loader() {
    return (
        <div className="wrapper-grid">
            {LETTERS.map((letter, i) => (
                <div className="cube" key={`${letter}-${i}`}>
                    <div className="face face-front">{letter}</div>
                    <div className="face face-back" />
                    <div className="face face-right" />
                    <div className="face face-left" />
                    <div className="face face-top" />
                    <div className="face face-bottom" />
                </div>
            ))}
        </div>
    );
}

export default Loader;
