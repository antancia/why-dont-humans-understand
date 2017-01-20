import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {

  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)

    // loading sprite assets
    this.load.atlas('cat',
      'assets/images/cat-sprite-sheet.png',
      'assets/atlases/cat-sprite-sheet.json')

    // loading audio assets
    this.meowSound = this.load.audio('meow', 'assets/audio/soundEffects/meow.wav')
    this.jumpSound = this.load.audio('jump', 'assets/audio/soundEffects/jump.wav')
    this.scratchSound = this.load.audio('scratch', 'assets/audio/soundEffects/scratch.wav')
    this.explodeSound = this.load.audio('explode', 'assets/audio/soundEffects/explosion2.wav')
    // this.game.sound.setDecodedCallback(
    //   [ this.meow, this.jump, this.scratch, this.explode ],
    //   this.start,
    //   this
    // )

  }

  create () {
    this.state.start('Game')
  }

}
