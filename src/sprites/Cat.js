import Phaser from 'phaser'

export default class extends Phaser.Sprite {

  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.smoothed = false
    this.scale.setTo(4, 4)
    this.facing = 'right'
    this.jumpTimer = 0

    // Add the animations
    this.animations.add(
      'sit',
      ['cat-sit.png'],
      5,
      true
    )
    this.animations.add(
      'walk',
      Phaser.Animation.generateFrameNames('cat-walk-', 1, 2, '.png'),
      5,
      false
    )
    this.animations.add(
      'jump',
      ['cat-jump-1.png', 'cat-jump-2.png', 'cat-sit.png'],
      5,
      false
    )
    this.animations.add(
      'sleep',
      ['cat-sleep-1.png', 'cat-sleep-2.png', 'cat-sleep-3.png', 'cat-sleep-2.png'],
      3,
      true
    )
    this.animations.add(
      'meow',
      ['cat-meow-1.png', 'cat-meow-2.png', 'cat-meow-1.png'],
      2,
      false
    )
    this.animations.add(
      'attack',
      ['cat-attack-1.png', 'cat-attack-2.png'],
      4,
      false
    )
    this.animations.add(
      'scratch',
      ['cat-scratch-1.png', 'cat-scratch-2.png'],
      4,
      false
    )
    this.animations.add(
      'eat',
      ['cat-eat-1.png', 'cat-sit.png'],
      4,
      false
    )
  }

  update () {

  }
}
