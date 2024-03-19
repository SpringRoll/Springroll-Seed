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
        PIXI.Assets.add('ball', './assets/Ball.png');
        PIXI.Assets.add('bounce', './assets/bounce.mp3');

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