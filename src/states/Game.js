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
    switch (action) {
      case 'meow':
        this.game.score += 0.001
        break
      case 'destroy':
        this.game.score += 15
        break
    }
    if (this.game.score >= 100) {
      this.state.start('GameOver')
    }
    this.game.scoreDisplay.setText(`Human Understanding Level: ${this.game.score.toFixed(2)} %`)
  }

  create () {
    this.game.add.sprite(0, 0, 'background')
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
    this.keyInput.cKey = this.game.input.keyboard.addKey(Phaser.Keyboard.C)
    this.keyInput.eKey = this.game.input.keyboard.addKey(Phaser.Keyboard.E)

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
      y: 240,
      asset: 'objects',
      frame: 'vase.png'
    })

    this.cactus = new BreakableObject({
      game: this.game,
      x: 650,
      y: 318,
      asset: 'objects',
      frame: 'cactus.png'
    })

    this.clock = new BreakableObject({
      game: this.game,
      x: 170,
      y: 145,
      asset: 'objects',
      frame: 'clock.png'
    })

    this.globe = new BreakableObject({
      game: this.game,
      x: 225,
      y: 145,
      asset: 'objects',
      frame: 'globe.png'
    })

    this.lamp = new BreakableObject({
      game: this.game,
      x: 530,
      y: 395,
      asset: 'objects',
      frame: 'lamp.png'
    })

    this.glass1 = new BreakableObject({
      game: this.game,
      x: 480,
      y: 410,
      asset: 'objects',
      frame: 'glass.png'
    })

    this.glass2 = new BreakableObject({
      game: this.game,
      x: 780,
      y: 335,
      asset: 'objects',
      frame: 'glass.png'
    })

    this.glass3 = new BreakableObject({
      game: this.game,
      x: 910,
      y: 335,
      asset: 'objects',
      frame: 'glass.png'
    })

    this.smallPlatform1 = new Platform({
      game: this.game,
      x: 650,
      y: 350,
      asset: 'platform-small-pink'
    })

    this.smallPlatform2 = new Platform({
      game: this.game,
      x: 780,
      y: 350,
      asset: 'platform-small-pink'
    })

    this.smallPlatform3 = new Platform({
      game: this.game,
      x: 910,
      y: 350,
      asset: 'platform-small-pink'
    })

    this.smallPlatform4 = new Platform({
      game: this.game,
      x: 370,
      y: 170,
      asset: 'platform-small-pink'
    })

    this.smallPlatform5 = new Platform({
      game: this.game,
      x: 220,
      y: 170,
      asset: 'platform-small-pink'
    })

    this.smallPlatform6 = new Platform({
      game: this.game,
      x: 170,
      y: 170,
      asset: 'platform-small-pink'
    })

    this.largePlatform1 = new Platform({
      game: this.game,
      x: this.world.centerX,
      y: 425,
      asset: 'platform-large-blue'
    })

    this.largePlatform2 = new Platform({
      game: this.game,
      x: this.world.centerX,
      y: 260,
      asset: 'platform-large-blue'
    })

    // Add the objects
    this.game.add.existing(this.vase)
    this.objects.add(this.vase)
    this.game.add.existing(this.cactus)
    this.objects.add(this.cactus)
    this.game.add.existing(this.clock)
    this.objects.add(this.clock)
    this.game.add.existing(this.globe)
    this.objects.add(this.globe)
    this.game.add.existing(this.lamp)
    this.objects.add(this.lamp)
    this.game.add.existing(this.glass1)
    this.objects.add(this.glass1)
    this.game.add.existing(this.glass2)
    this.objects.add(this.glass2)
    this.game.add.existing(this.glass3)
    this.objects.add(this.glass3)

    // Add the cat
    this.game.add.existing(this.cat)

    // Add the platforms
    this.game.add.existing(this.largePlatform1)
    this.platforms.add(this.largePlatform1)
    this.game.add.existing(this.largePlatform2)
    this.platforms.add(this.largePlatform2)
    this.game.add.existing(this.smallPlatform1)
    this.platforms.add(this.smallPlatform1)
    this.game.add.existing(this.smallPlatform2)
    this.platforms.add(this.smallPlatform2)
    this.game.add.existing(this.smallPlatform3)
    this.platforms.add(this.smallPlatform3)
    this.game.add.existing(this.smallPlatform4)
    this.platforms.add(this.smallPlatform4)
    this.game.add.existing(this.smallPlatform5)
    this.platforms.add(this.smallPlatform5)
    this.game.add.existing(this.smallPlatform6)
    this.platforms.add(this.smallPlatform6)

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
      } else if (this.keyInput.eKey.isDown) {
        this.cat.animations.play('eat')
      } else if (this.keyInput.cKey.isDown) {
        this.cat.animations.play('scratch')
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
