/* globals __DEV__ */
import Phaser from 'phaser'
import Cat from '../sprites/Cat'
import BreakableObject from '../sprites/BreakableObject'
import Platform from '../sprites/Platform'

export default class extends Phaser.State {

  constructor () {
    super()
    this.updateScore = this.updateScore.bind(this)
  }

  init () {}
  preload () {
  }

  updateScore (action) {
    if (action === 'meow') {
      this.game.score += 0.001
    } else if (action === 'destroy') {
      this.game.score += 10
    }
    this.game.scoreDisplay.setText(`Human Understanding Level: ${this.game.score.toFixed(2)} %`)
  }

  create () {
    this.game.score = 0
    this.game.scoreText = `Human Understanding Level: ${this.game.score.toFixed(2)} %`
    this.game.scoreDisplay = this.game.add.bitmapText(20, 20, 'coders-crux', this.game.scoreText, 40)
    this.game.scoreDisplay.tint = '#444c4d'
    this.game.scoreDisplay.smooth = false

    // Enable physics & gravity
    this.time.desiredFps = 60
    this.game.physics.startSystem(Phaser.Physics.ARCADE)
    this.game.physics.arcade.gravity.y = 300

    // Get keyboard inputs
    this.keyInput = this.game.input.keyboard.createCursorKeys()
    this.keyInput.xKey = this.game.input.keyboard.addKey(Phaser.Keyboard.X)
    this.keyInput.zKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z)

    // Action variables for scoring functionality
    this.meowAction = 'meow'
    this.destroyAction = 'destroy'

    // Add audio
    this.explodeSound = this.add.audio('explode')
    this.meowSound = this.add.audio('meow')
    this.jumpSound = this.add.audio('jump')

    // Create groups
    this.platforms = this.game.add.group()
    this.objects = this.game.add.group()

    // Create new cat sprite
    this.cat = new Cat({
      game: this.game,
      x: 16,
      y: 476,
      asset: 'cat'
    })

    this.vase = new BreakableObject({
      game: this.game,
      x: 500,
      y: 401,
      asset: 'objects',
      frame: 'vase.png'
    })

    this.smallPlatform = new Platform({
      game: this.game,
      x: 650,
      y: 350,
      asset: 'platform-small-pink'
    })

    this.largePlatform = new Platform({
      game: this.game,
      x: this.world.centerX,
      y: 425,
      asset: 'platform-large-blue'
    })

    // Add the vase
    this.game.add.existing(this.vase)
    this.objects.add(this.vase)

    // Add the cat
    this.game.add.existing(this.cat)

    // Add the platforms
    this.game.add.existing(this.largePlatform)
    this.platforms.add(this.largePlatform)
    this.game.add.existing(this.smallPlatform)
    this.platforms.add(this.smallPlatform)
  }

  update () {
    this.cat.body.velocity.x = 0
    this.game.physics.arcade.collide(this.cat, this.platforms)
    this.game.physics.arcade.collide(this.objects, this.platforms)
    this.game.physics.arcade.collide(this.cat, this.objects)

    this.keyInput.zKey.onDown.addOnce(() => {
      this.updateScore(this.meowAction)
    })

    // Check if objects are hitting the ground
    this.objects.forEach(object => {
      if (object.body.onFloor()) {
        this.explodeSound.play()
        object.animations.play('explode')
        // TODO: this is not getting the right 'this' context to update the score
        // this.game.score += 10
        object.events.onAnimationComplete.add(() => {
          object.destroy()
          this.updateScore(this.destroyAction)
        })
      }
    })

    // Add basic walking functionality and animations
    if (this.keyInput.right.isDown) {
      this.cat.walkDirection('right')
      if (this.cat.body.onFloor() || this.cat.body.touching.down) {
        this.cat.animations.play('walk')
      }
    } else if (this.keyInput.left.isDown) {
      this.cat.walkDirection('left')
      if (this.cat.body.onFloor() || this.cat.body.touching.down) {
        this.cat.animations.play('walk')
      }
    } else if (this.cat.body.onFloor() || this.cat.body.touching.down &&
        Phaser.Point.equals(this.cat.body.velocity, new Phaser.Point(0, 0))) {
      if (this.keyInput.xKey.isDown) {
        this.cat.animations.play('attack')
      } else if (this.keyInput.zKey.isDown) {
        this.cat.animations.play('meow')
        this.score += 1
        this.meowSound.play()
      } else {
        this.cat.animations.stop()
        this.cat.facing = 'idle'
        this.cat.frameName = 'cat-sit.png'
      }
    }

    // Jump logic
    if ((this.cat.body.onFloor() || this.cat.body.touching.down) && this.keyInput.up.isDown) {
      this.cat.animations.play('jump')
      this.jumpSound.play()
      this.cat.body.velocity.y = -500
    }
  }

  render () {
    if (__DEV__) {
      // Show sprite debugging info and collision box
      // this.game.debug.spriteInfo(this.cat, 32, 32)
      // this.game.debug.body(this.cat)
      // this.game.debug.body(this.vase)
      // this.game.debug.body(this.smallPlatform)
    }
  }
}
