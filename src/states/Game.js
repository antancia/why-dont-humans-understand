/* globals __DEV__ */
import Phaser from 'phaser'
import Cat from '../sprites/Cat'

export default class extends Phaser.State {

  init () {}
  preload () {}

  create () {
    // const bannerText = 'Why Don\'t Humans Understand'
    // let banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText)
    // banner.font = 'Bangers'
    // banner.padding.set(10, 16)
    // banner.fontSize = 40
    // banner.fill = '#77BFA3'
    // banner.smoothed = false
    // banner.anchor.setTo(0.5)

    // Enable physics & gravity
    this.time.desiredFps = 30
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    // this.game.physics.arcade.gravity.y = 100
    // this.game.physics.p2.restitution = 0.8

    // Get keyboard inputs
    this.keyInput = this.game.input.keyboard.createCursorKeys()
    this.keyInput.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X)
    this.keyInput.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)

    // Create new cat sprite
    this.cat = new Cat({
      game: this.game,
      x: this.world.centerX,
      y: this.world.centerY,
      asset: 'cat'
    })

    // Add the cat into the game state and add physics
    this.game.add.existing(this.cat)
    this.cat.frame = 10
    this.game.physics.arcade.enable(this.cat)
  }

  update () {
    if (this.keyInput.right.isDown) {
      if (this.cat.facing !== 'right') {
        this.cat.facing = 'right'
        this.cat.scale.x = 4
      }
      this.cat.animations.play('walk')
      this.cat.body.velocity.x = 150
    } else if (this.keyInput.left.isDown) {
      if (this.cat.facing !== 'left') {
        this.cat.facing = 'left'
        this.cat.scale.x = -4
      }
      this.cat.animations.play('walk')
      this.cat.body.velocity.x = -150
    } else {
      if (this.cat.facing !== 'idle') {
        this.cat.animations.stop()
        this.cat.facing = 'idle'
        this.cat.frame = 10
      }
    }


    //TODO: this code is breaking stuff
    // if (this.keyInput.up.isDown && this.cat.body.onFloor() && this.game.time.now > this.catjumpTimer) {
    //   this.cat.animations.play('jump')
    //   this.cat.body.moveUp(1000)
    // }

    if (this.keyInput.xKey.isDown) {
      this.cat.animations.play('attack')
    }

    if (this.keyInput.zKey.isDown) {
      this.cat.animations.play('scratch')
    }
  }

  render () {
    if (__DEV__) {
      // Show sprite debugging info and collisio box
      this.game.debug.spriteInfo(this.cat, 32, 32)
      this.game.debug.body(this.cat)
    }
  }
}
