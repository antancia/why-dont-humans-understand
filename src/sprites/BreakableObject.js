import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset, frame }) {
    super(game, x, y, asset, frame)
    this.anchor.setTo(0.5)
    this.smoothed = false
    this.scale.setTo(4, 4)
    this.game.physics.arcade.enable(this)
    this.body.collideWorldBounds = true
    this.body.gravity.y = 1000
    this.body.drag.setTo(500)
    // Prevents cat from jumping on top of objects due to ARCADE physics bug
    this.body.checkCollision.up = false
    // this.body.angularVelocity = 50

    this.animations.add(
      'explode',
      Phaser.Animation.generateFrameNames('explode-', 1, 3, '.png'),
      20,
      false
    )
  }

  update () {

  }
}
