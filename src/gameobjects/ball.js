import { GAMEPLAY } from './../constants';
import { GameCache } from '../cache';
import createjs from 'createjs';

export class Ball extends createjs.Bitmap
{
    constructor({ x = 0, y = 0, game } = {})
    {
        super(GameCache.images['ball']);

        // Set objects origin point to the middle;
        // -- getBounds() will fail if you're not using a cached image, as it won't be loaded yet.
        // -- ex: super('./assets/ball.png');
        this.regX = this.getBounds().width / 2;
        this.regY = this.getBounds().height / 2;

        this.x = x;
        this.y = y;

        this.velY = 0;
        this.velX = 0;

        this.game = game;
    }

    update()
    {
        this.velY += GAMEPLAY.GRAVITY;
        this.y += this.velY;

        const bounds = this.getBounds();  
        const bottom = GAMEPLAY.MAX_HEIGHT - (GAMEPLAY.MAX_HEIGHT - GAMEPLAY.SAFE_HEIGHT) / 2;
        
        if((bounds.height / 2) + this.y >= bottom)
        {
            this.y = (bottom - bounds.height / 2) - 1;
            this.velY *= -1;

            if(!this.hitSound)
            {
                // get sound instance
                this.hitSound = createjs.Sound.play('bounce');
                this.hitSound.volume = this.game.sfxVolume; // <-- apply current SFX volume;
            }
            else
            {
                this.hitSound.volume = this.game.sfxVolume;
                this.hitSound.play();
            }
        }
        
    }
}