import Square from './Square'

export default function Board({ board, handleClick }) {
    return (
        <div className='board'>
            {board.map((square, i) => (
                <Square key={i} value={square} position={i} handleClick={handleClick} />
            ))}
        </div>
    )
}