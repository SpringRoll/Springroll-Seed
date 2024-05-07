import { GAMEPLAY } from './../constants';
import * as PIXI from 'pixi.js';

export class Ball extends PIXI.Sprite
{
    constructor({ x = 0, y = 0 } = {})
    {
        const texture = PIXI.Assets.get('ball');
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);
        this.velocity = new PIXI.Point(0, 0);

        this.hitSound = PIXI.Assets.get('bounce');
    }

    update(ticker)
    {
        
        this.velocity.y += GAMEPLAY.GRAVITY * ticker.deltaTime;
        this.position.y += this.velocity.y * ticker.deltaTime;
        
        if(this.position.y > 680)
        {
            this.position.y = 679;
            this.velocity.y *= -1;

            this.hitSound.play();
        }
    }
}