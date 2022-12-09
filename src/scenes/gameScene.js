import { Ball } from '../gameobjects/ball';
import * as PIXI from 'pixi.js';

export class GameScene extends PIXI.Container
{
    constructor(game)
    {
        super();
        this.game = game;
    }

    async preload()
    {
        // add assets, and load them. Resolve a promise when it's all done
        // PIXI.Loader.shared.add('ball', './assets/ball.png');
        // PIXI.Loader.shared.add('bounce', './assets/bounce.{ogg, mp3}');
        PIXI.Assets.add('ball', './assets/ball.png');
        PIXI.Assets.add('bounce', './assets/bounce.mp3');

        // const loadComplete = new Promise((resolve) =>
        // {
        //     PIXI.Loader.shared.load(resolve);
        // });

        // return loadComplete;

        await PIXI.Assets.load(['ball', 'bounce']);
    }

    start()
    {
        const texture = PIXI.Assets.get('testBG');
        const scalerBackground = new PIXI.Sprite(texture);
        this.addChild(scalerBackground);

        // add some items to this scene
        this.ball = new Ball({ x: (this.game.width / 2) + 100, y: this.game.height / 2 });
        this.addChild(this.ball);

        this.ball2 = new Ball({ x: this.game.width / 2 - 100, y: 100 });
        this.addChild(this.ball2);
    }

    update(deltaTime)
    {
        // bounce the balls
        this.ball.update(deltaTime);
        this.ball2.update(deltaTime);
    }
}