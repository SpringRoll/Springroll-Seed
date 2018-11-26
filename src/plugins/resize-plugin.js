import Phaser from 'phaser';
import { ScaleManager } from 'springroll';
import { GAMEPLAY } from '../constants';

export class ResizePlugin extends Phaser.Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);
        this.onResize = this.onResize.bind(this);
        this.scaleManager = new ScaleManager();

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.ratio = 1;

        this.gameContainer = document.getElementById("gameContent");
    }

    start()
    {
        this.scaleManager.enable(this.onResize);
    }

    stop()
    {
        this.scaleManager.disable();
    }

    onResize({width, height})
    {
        const game = this.game;
        const scale = Math.min(width / GAMEPLAY.WIDTH, height / GAMEPLAY.HEIGHT);
        game.canvas.setAttribute('style',
            ` -ms-transform: scale(${scale}); -webkit-transform: scale3d(${scale}, 1);
            -moz-transform: scale(${scale}); -o-transform: scale(${scale});
            transform: scale(${scale}); transform-origin: top left;`
        );

        const w = width / scale;
        const h = height / scale;
        game.resize(width, height);

        this.gameContainer.style.width = `${width}rem`;
        this.gameContainer.style.height = `${height}rem` ;

        game.scene.scenes.forEach(function(scene)
        {
            scene.cameras.resize(w, h);
        });
    }
}