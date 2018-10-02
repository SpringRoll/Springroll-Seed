import { Ball } from '../gameobjects/ball';

export class GameScene extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;
  }

  preload() {
    // add assets, and load them. Resolve a promise when it's all done
    PIXI.loader.add('ball', './assets/ball.png');
    PIXI.loader.add('bounce', './assets/bounce.{ogg, mp3}');

    const loadComplete = new Promise((resolve, reject) => {
      PIXI.loader.load(resolve);
    });

    return loadComplete;
  }

  start() {
    // add some items to this scene
    this.ball = new Ball({ x: (this.width / 4) * 3 , y: this.height / 2});
    this.addChild(this.ball);

    this.ball2 = new Ball({ x: this.width / 4 });
    this.addChild(this.ball2);
  }

  update(deltaTime) {
    // bounce the balls
    this.ball.update(deltaTime);
    this.ball2.update(deltaTime);
  }
}
