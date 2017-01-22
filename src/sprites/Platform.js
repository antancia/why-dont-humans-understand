import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.smooth = false
    this.scale.setTo(4, 4)
    game.physics.arcade.enable(this)
    this.body.allowGravity = false
    this.body.immovable = true
    this.playerLocked = false
    // Allow one way platforms
    this.body.checkCollision.down = false
  }

  update () {

  }
}
