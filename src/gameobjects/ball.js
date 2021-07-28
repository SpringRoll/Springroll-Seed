import { GAMEPLAY } from './../constants';
import * as PIXI from 'pixi.js';

export class Ball extends PIXI.Sprite
{
    constructor({ x = 0, y = 0 } = {})
    {
        const texture = PIXI.Loader.shared.resources['ball'].texture;
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);
        this.velocity = new PIXI.Point(0, 0);

        this.hitSound = PIXI.Loader.shared.resources['bounce'].sound;
    }

    update(deltaTime)
    {
        this.velocity.y += GAMEPLAY.GRAVITY * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        if(this.position.y > 680)
        {
            this.position.y = 679;
            this.velocity.y *= -1;

            this.hitSound.play();
        }
    }
}