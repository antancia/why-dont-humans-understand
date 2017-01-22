import Phaser from 'phaser'

export default class extends Phaser.State {

  init () {}

  preload () {

  }

  create () {
    this.game.gameOverText = `
                            YOU WIN!
    The humans finally understand and have provided the food.`
    this.game.gameOverTextDisplay = this.game.add.bitmapText(
      20,
      (this.game.height / 2) - 50,
      'coders-crux',
      this.game.gameOverText,
      40
    )
    this.game.gameOverTextDisplay.tint = '#444c4d'
    this.game.gameOverTextDisplay.smooth = false
  }

}
