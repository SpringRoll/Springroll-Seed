import { Anchor } from 'springroll';
import { GameScene } from './gameScene';
import * as PIXI from 'pixi.js';

export class TitleScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    preload()
    {
        PIXI.Loader.shared.add('testBG', './assets/BG1320x780-2.png');

        const loadComplete = new Promise((resolve, reject) =>
        {
            PIXI.Loader.shared.load(resolve);
        });

        return loadComplete;
    }

    start()
    {

        const texture = PIXI.Loader.shared.resources['testBG'].texture;
        const scalerBackground = new PIXI.Sprite(texture);
        this.addChild(scalerBackground);

        //* a clickable label to cause a scene change
        const text = new PIXI.Text('Click me!',
        {
            fill: 0xffffff
        });
        text.interactive = true;
        text.anchor.set(0.5, 0.5);

        text.on('pointerdown', () =>
        {
            // when the label is clicked, preload the game scene and then tell the app to switch scenes
            const nextScene = new GameScene(this.game);
            this.game.app.state.scene.value = nextScene;

        });

        this.game.scaleManager.addEntity(new Anchor(
        {
            position: { x: 66, y: 25 },
            direction: { x: -1, y: -1 },
            callback: ({x, y}) => text.position.set(x, y)
        }));

        this.addChild(text);
        //*/
    }

    update(deltaTime)
    {
        // nothing to do
    }
}