import * as Springroll from 'springroll';
import { Ball } from './gameobjects/ball';

export class Game
{
    constructor(width, height)
    {
        this.width = width;
        this.height = height;
        this.app = new Springroll.Application(
        {
            features:
            {
                sfx: true
            }
        });

        this.pixi = new PIXI.Application({ width, height });
        document.getElementById('content').appendChild(this.pixi.view);

        // Subscribe to required springroll States.
        this.app.state.pause.subscribe((value) =>
        {
            this.isPaused = value;
        });

        this.app.state.soundVolume.subscribe((value) =>
        {
            PIXI.sound.volumeAll = value;
        });

        this.app.state.sfxVolume.subscribe((value) =>
        {
            // this will break if done before sounds are loaded.
            // in a full game this should be handled gracefully.
            PIXI.loader.resources['bounce'].sound.volume = value;
        }); 
    }

    run()
    {
        this.preload().then(() =>
        {
            console.log("preload complete");
            this.start();
            this.pixi.ticker.add(this.update.bind(this));
        });
    }

    preload()
    {
        // Load assets
        PIXI.loader.add('ball', './assets/ball.png');
        PIXI.loader.add('bounce', './assets/bounce.{ogg, mp3}');

        const loadComplete = new Promise((resolve, reject) =>
        {
            PIXI.loader.load(() =>
            {
                resolve();
            });
        });
        return loadComplete;
    }

    start()
    {
        this.ball = new Ball({ x: (this.width / 4) * 3 , y: this.height / 2});
        this.pixi.stage.addChild(this.ball);

        this.ball2 = new Ball({ x: this.width / 4 });
        this.pixi.stage.addChild(this.ball2);
    }

    update(deltaTime)
    {
        if (this.isPaused)
        {
            return;
        }

        this.ball.update(deltaTime);
        this.ball2.update(deltaTime);
    }
}