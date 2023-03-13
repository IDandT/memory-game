import './Card.css'

export default function Card({ card, clickHandler }) {
  // Set image corresponding to "numCard"
  const imgStyle = {
    backgroundImage: `url(${`./${card.image}.png`}`,
  }

  return (
    <div className={card.flipped ? 'card is-flipped' : 'card'}>
      <div
        className="card-face card-face-front"
        onClick={() => clickHandler(card.index)}
      ></div>
      <div className="card-face card-face-back" style={imgStyle}></div>
    </div>
  )
}
