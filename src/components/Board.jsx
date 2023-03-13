import { useEffect, useState } from 'react'
import { createBoard } from '../utils/board.js'
import Modal from './Modal.jsx'
import Card from './Card.jsx'
import './Board.css'

const FLIP_TIME = 1000

export default function Board() {
  const [board, setBoard] = useState()
  const [unflipCards, setUnflipCards] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [selectedPair, setSelectedPair] = useState({
    index1: null,
    index2: null,
  })

  // Init new game
  useEffect(() => {
    newGame()
  }, [])

  // Unflip cards. Wait some milliseconds until do it.
  useEffect(() => {
    if (board) {
      if (unflipCards) {
        setTimeout(function () {
          const newBoard = [...board]
          newBoard[selectedPair.index1].flipped = false
          newBoard[selectedPair.index2].flipped = false
          setBoard(newBoard)
          setUnflipCards(false)
        }, FLIP_TIME)
      }
    }
  }, [unflipCards])

  // Creates new initialized board
  function newGame() {
    const boardData = createBoard()
    setBoard(boardData)
  }

  // Creates new initialized board
  function resetGame() {
    // First we unflip all cards before create new board
    const newBoard = [...board]
    newBoard.forEach((card) => {
      card.flipped = false
      card.resolved = false
    })
    setBoard(newBoard)

    // After all cards are unflipped, generate new cards,
    setTimeout(function () {
      const newBoard = createBoard()
      setBoard(newBoard)
    }, FLIP_TIME)
  }

  // Click logic, and check game conditions
  function clickHandler(index) {
    if (!board[index].resolved && !board[index].flipped && !unflipCards) {
      // State for selected cards
      let newPair = { ...selectedPair }

      // If is new pair we reset pair data
      if (newPair.index1 !== null && newPair.index2 !== null) {
        newPair = { index1: null, index2: null }
      }

      // Save clicked card index
      if (newPair.index1 === null) {
        newPair.index1 = index
      } else {
        newPair.index2 = index
      }
      setSelectedPair(newPair)

      const newBoard = [...board]
      newBoard[index].flipped = !newBoard[index].flipped

      // Check for resolved pair
      if (newPair.index1 !== null && newPair.index2 !== null) {
        if (newBoard[newPair.index1].image === newBoard[newPair.index2].image) {
          // PAIR !!! We keep cards facing up
          newBoard[newPair.index1].resolved = true
          newBoard[newPair.index2].resolved = true
        } else {
          // NO PAIR... Unflip cards
          setUnflipCards(true)
        }
      }

      // Update board status
      setBoard(newBoard)

      // Check win condition. If all cards are resolved, shows modal overlay
      // and a button to reset game
      if (!newBoard.some((card) => card.resolved === false)) {
        setTimeout(function () {
          setShowModal(true)
        }, FLIP_TIME)
      }
    }
  }

  // Close button handler. Resets game
  function closeModal() {
    setShowModal(false)
    resetGame()
  }

  // Render board
  return (
    <>
      {showModal && <Modal show={showModal} handleClose={closeModal}></Modal>}
      <div className="board">
        {board &&
          board.map((value, i) => {
            return <Card key={i} card={value} clickHandler={clickHandler} />
          })}
      </div>
    </>
  )
}
