/* globals __DEV__ */
import Phaser from 'phaser'
import Cat from '../sprites/Cat'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    const bannerText = 'Why Don\'t Humans Understand'
    let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    banner.font = 'Bangers'
    banner.padding.set(10, 16)
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.smoothed = false
    banner.anchor.setTo(0.5)

    // Might need this later for crisp pixel rendering
    // this.renderer.renderSession.roundPixels = true
    // Phaser.canvas.setImageRenderingCrisp(this.canvas)

    this.cat = new Cat({
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'cat'
    })

    this.add.existing(this.cat)

    console.log('this is the cat sprite: ', this.cat)
    // this.cat.animations.add('walk', Phaser.Animation.generateFrameNames('cat-walk-', 1, 2), 5, true)
    // this.cat.animations.play('walk', 50, true)
  }

  render () {
    if (__DEV__) {
      // Show spite debugging info
      // this.game.debug.spriteInfo(this.mushroom, 32, 32)
    }
  }
}
