import { GAMEPLAY } from './../constants';

export class Ball extends PIXI.Sprite
{
    constructor({ x = 0, y = 0 } = {})
    {
        const texture = PIXI.loader.resources['ball'].texture;
        super(texture);

        this.anchor.set(0.5, 0.5);
        this.position.set(x, y);
        this.velocity = new PIXI.Point(0, 0);

        this.hitSound = PIXI.loader.resources['bounce'].sound;
    }

    update(deltaTime)
    {
        this.velocity.y += GAMEPLAY.GRAVITY * deltaTime;
        this.position.y += this.velocity.y * deltaTime;

        const bounds = this.getBounds();      
        if(bounds.bottom >= GAMEPLAY.HEIGHT)
        {
            this.position.y = (GAMEPLAY.HEIGHT - bounds.height / 2) - 1;
            this.velocity.y *= -1;

            this.hitSound.play();
        }
    }
}