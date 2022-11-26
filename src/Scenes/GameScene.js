import 'phaser';
var keys, particles_A, score = 0 , keyPressed = false;

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init () {
    this.readyCount = 0;
  }

  preload() {
    // load images
    this.load.bitmapFont('letters',  'assets/fonts/Free_Pick_Screen-export.png', 'assets/fonts/Free_Pick_Screen-export.fnt');
    this.load.bitmapFont('letters2', 'assets/fonts/Normal_Value.png', 'assets/fonts/Normal_Value.fnt');
    this.load.bitmapFont('letters3', 'assets/fonts/Normal_Value.png', 'assets/fonts/Normal_Value_1.fnt');
    this.load.bitmapFont('letters4', 'assets/fonts/Normal_Value.png', 'assets/fonts/Normal_Value_2.fnt');
    this.load.bitmapFont('letters4', 'assets/fonts/Normal_Value.png', 'assets/fonts/Normal_Value_3.fnt');
    this.load.bitmapFont('letters4', 'assets/fonts/Normal_Value.png', 'assets/fonts/Normal_Value_4.fnt');

  }

  create() {
    score = 0;
    this.model = this.sys.game.globals.model;
    this.cameras.main.setBackgroundColor("#00008b");
    let emitZone = new Phaser.Geom.Rectangle(100, -200, 400, 400);
    this.scoreText = this.add.bitmapText(70, 320, 'letters', "Type The Falling Letters \tGold Alphabet Award \t2X Winning", 10);
    // Create the particle emitter with the previous created objects
    this.ready();
    this.createParticles_gold(this, "letters", emitZone, 4000, 0.5);
    this.createParticles_normal(this, "letters2", emitZone, 500, "particles_P", 1);
    this.createParticles_normal(this, "letters3", emitZone, 1500, "particles_O", 1);
    this.createParticles_normal(this, "letters4", emitZone, 3000, "particles_L", 1);
    keys = this.input.keyboard.addKeys('A,P,O,L');
    this.timedEvent = this.time.delayedCall(20000, this.ready, [], this);

  }

  createParticles_gold(scene, atlas, source, delay, scale) {
    return particles_A = scene.add.particles(atlas).createEmitter({
      alpha: {
        start: 0,
        end: 1,
        ease: 'Expo.easeOut'
      },
      speedY: {
        start: 10,
        end: 300,
      },
      angle: 0,
      emitZone: {
        source: source
      },
      frequency: 7000,
      delay: delay,
      lifespan: 5000,
      quantity: 0.2,
      scale: scale,
      gravityY: 60
    });
  }

  createParticles_normal(scene, atlas, source, delay, particleName, scale) {
    return particleName = scene.add.particles(atlas).createEmitter({
      speedY: {
        start: 500,
        end: 1000,
      },
      delay: delay,
      alpha: {
        start: 0,
        end: 0.7,
        ease: 'Expo.easeOut'
      },
      speedY: {
        start: 100,
        end: 1000,
      },
      angle: 0,
      emitZone: {
        source: source
      },
      frequency: 5000,
      lifespan: 6000,
      quantity: 1,
      scale: scale,
      gravityY: 70
    });
  }

  updateScore(isgoldSymbol) {
    if(keyPressed) {
    if(isgoldSymbol){
      score += 20;
      keyPressed = false; 
    } else { score += 10;
      keyPressed = false; 
    }
    this.model.score = score;

  }
    console.log("Score", score);
  }

  keyPressed(isgoldSymbol , pressedKey) {
    if(pressedKey.isDown){
    keyPressed = true; 
    pressedKey.isDown = false;
    this.updateScore(isgoldSymbol);
    }
  }

  update() {
      particles_A && (keys.A.isDown) ? this.keyPressed(true , keys.A) : particles_A.setScale(0.2);
      this.children.list && (keys.P.isDown) ? this.keyPressed(false , keys.P) : this.children.list[1].setScale(0.7);
      this.children.list && (keys.O.isDown) ? this.keyPressed(false , keys.O) : this.children.list[2].setScale(0.7);
      this.children.list && (keys.L.isDown) ? this.keyPressed(false , keys.L) : this.children.list[3].setScale(0.7);
  }

  ready () {
    this.readyCount++;
    if (this.readyCount === 2) {
      this.scene.start('Credits');
    }
  }
};
