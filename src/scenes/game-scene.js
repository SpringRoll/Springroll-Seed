import { GAMEPLAY } from '../constants';
import { Scene } from 'phaser';

export class GameScene extends Scene
{
    preload()
    {
        // load assets
        this.load.image('ball', './assets/Ball.png')
        this.load.audio('bounce', ['./assets/bounce.mp3', './assets/bounce.ogg']);
    }

    create()
    {
        this.add.image(GAMEPLAY.WIDTH / 2, GAMEPLAY.HEIGHT / 2, 'background');

        // this.add.ball() is added to phaser in the factory-plugin.
        // it's not a necessity, but it is a convenient way of
        // adding custom gameobjects.
        this.add.ball(GAMEPLAY.WIDTH / 2 - 100, (GAMEPLAY.HEIGHT / 2));
        this.add.ball(GAMEPLAY.WIDTH / 2 + 100, (GAMEPLAY.HEIGHT / 4));
    }
}
