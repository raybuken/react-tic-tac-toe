import { useState } from 'react'
import './App.css'
import Board from './components/Board'
import { COMBOS, PLAYERS } from './utils/constants'
import confetti from 'canvas-confetti'

function App() {
  const [board, setBoard] = useState([...new Array(9).fill(null)])
  const [turn, setTurn] = useState(PLAYERS.x)
  const [status, setStatus] = useState('playing')

  const updateBoard = (position) => {
    let newBoard = [...board]

    if(!newBoard[position]){
      const nextTurn = turn === PLAYERS.x ? PLAYERS.o : PLAYERS.x
      newBoard[position] = turn
      const hasWinner = checkWinner(turn, newBoard)

      if(hasWinner){
        setStatus('GANADOR: ' + turn)
        confetti()
      } else if(newBoard.every(square => square)){
        //Mostrar modal con el empate
        setStatus('Juego empatado')
      }

      setBoard(newBoard)
      setTurn(nextTurn)
    }
  }

  const newGame = () => {
    setBoard([...new Array(9).fill(null)])
    setTurn(PLAYERS.x)
    setStatus('playing')
  }

  const checkWinner = (currentPlayer, currentBoard) => {
    const hasCombo = COMBOS.some(combo => 
      currentBoard[combo[0]] === currentPlayer && 
      currentBoard[combo[1]] === currentPlayer && 
      currentBoard[combo[2]] === currentPlayer
    )

    return hasCombo
  }

  return (
    <>
      <span className='turn'>Turno: {turn}</span>
      <Board board={board} handleClick={updateBoard} />
      {
        <div className="playing-now">
          <span className={`player${turn === PLAYERS.x && ' active'}`}>{PLAYERS.x}</span>
          <span className={`player${turn === PLAYERS.o && ' active'}`}>{PLAYERS.o}</span>
        </div>
      }

        {
          status !== 'playing' && (
            <div className="game-modal">
              <div className='container'>
                <h2>Juego terminado</h2>
                <span>{status}</span>

                <button className="new-game" onClick={newGame}>Jugar de nuevo</button>
              </div>
            </div>
          )
        }
    </>
  )
}

export default App
