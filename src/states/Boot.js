import Phaser from 'phaser'
import WebFont from 'webfontloader'

export default class extends Phaser.State {

  init () {
    this.stage.backgroundColor = '#f5f2dd'
    this.fontsReady = false
    this.fontsLoaded = this.fontsLoaded.bind(this)
  }

  preload () {
    WebFont.load({
      google: {
        families: ['VT323']
      },
      active: this.fontsLoaded
    })

    this.game.load.bitmapFont('coders-crux', 'assets/fonts/coders_crux.png', 'assets/fonts/coders_crux.xml')

    let text = this.add.text(this.world.centerX, this.world.centerY, 'loading fonts', { font: '16px Arial', fill: '#dddddd', align: 'center' })
    text.anchor.setTo(0.5, 0.5)

    this.load.image('loaderBg', './assets/images/loader-bg.png')
    this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    if (this.fontsReady) {
      this.state.start('Splash')
    }
  }

  fontsLoaded () {
    this.fontsReady = true
  }

}
