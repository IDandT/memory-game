import './Modal.css'

export default function Modal({ handleClose }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h1>YOU WIN !!!</h1>
        <button type="button" onClick={handleClose}>
          New Game
        </button>
      </div>
    </div>
  )
}
