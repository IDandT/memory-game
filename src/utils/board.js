export const CARD_COUNT = 16 // 4x4 board

export function createBoard() {
  // Generate board array
  const boardData = []

  // Insert two identical cards for every image number
  let numImage = 1
  for (let i = 0; i < CARD_COUNT; i += 2) {
    const card1 = {
      image: numImage,
      resolved: false,
      flipped: false,
    }
    const card2 = { ...card1 }
    boardData.push(card1)
    boardData.push(card2)
    numImage += 1
  }

  // Random shuffle board
  boardData.sort((a, b) => 0.5 - Math.random())

  // Create consecutive index for every card
  boardData.forEach((card, i) => {
    card.index = i
  })

  return boardData
}
