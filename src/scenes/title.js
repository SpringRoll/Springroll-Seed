import { GameScene } from './game.js';

export class TitleScene extends PIXI.Container {
  constructor(game) {
    super();
    this.game = game;
  }

  preload() {
    // nothing to load
    return Promise.resolve();
  }

  start() {
    // a clickable label to cause a scene change
    const text = new PIXI.Text('Click me!', {
      fill: 0xffffff
    });
    text.interactive = true;

    text.on('pointerdown', () => {
      // when the label is clicked, preload the game scene and then tell the app to switch scenes
      const nextScene = new GameScene(this.game);
      nextScene.preload().then(() => {
        this.game.app.state.scene.value = nextScene;
      });
    });

    this.addChild(text);
  }

  update(deltaTime) {
    // nothing to do
  }
}
