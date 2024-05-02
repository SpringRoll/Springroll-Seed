import { Anchor } from 'springroll';
import { GameScene } from './gameScene';
import * as PIXI from 'pixi.js';
import { Assets } from 'pixi.js';

export class TitleScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        PIXI.Assets.add({alias: 'testBG', src: './assets/BG1320x780-2.png'});

        this.backgroundTexture = await Assets.load('testBG');
    }

    start()
    {
        const scalerBackground = PIXI.Sprite.from(this.backgroundTexture);
        this.addChild(scalerBackground);

        // a clickable label to cause a scene change
        const text = new PIXI.Text({
            text:'Click me!',
            style:{
                fill: 0xffffff
            }
        });
        text.interactive = true;
        text.anchor.set(0.5, 0.5);

        text.on('pointerdown', () =>
        {
            // when the label is clicked, preload the game scene and then tell the app to switch scenes
            const nextScene = new GameScene(this.game);
            this.game.application.state.scene.value = nextScene;
        });

        this.game.scaleManager.addEntity(new Anchor(
        {
            position: { x: 66, y: 25 },
            direction: { x: -1, y: -1 },
            callback: ({x, y}) => text.position.set(x, y)
        }));

        this.addChild(text);
    }

    update()
    {
        // nothing to do
    }
}