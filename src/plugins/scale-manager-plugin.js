import Phaser from 'phaser';
import { EventEmitter } from 'eventemitter3'

import { ScaleManager } from 'springroll';
import { GAMEPLAY } from '../constants';

// The ScaleManagerPlugin is just a wrapper for Springroll's
// ScaleManager with the Phaser dependent resize implemented. 
export class ScaleManagerPlugin extends Phaser.Plugins.BasePlugin
{
    constructor(pluginManager)
    {
        super(pluginManager);
        this.onResize = this.onResize.bind(this);
        this.events = new EventEmitter();

        this.gameContainer = document.getElementById("gameContent");
    }

    init({ width, height, safeWidth, safeHeight })
    {
        this.scaleManager = new ScaleManager({ width, height, safeWidth, safeHeight });
    }

    start()
    {
        this.scaleManager.enable(this.onResize);
    }

    stop()
    {
        this.scaleManager.disable();
    }

    onResize({ width, height, scale })
    {
        const game = this.game;

        game.renderer.resize(GAMEPLAY.WIDTH / scale.x, GAMEPLAY.HEIGHT / scale.y)

        game.canvas.style.width = `${width}px`;
        game.canvas.style.height = `${height}px`;

        game.canvas.style.position = 'absolute'
        game.canvas.style.left = '0px';
        game.canvas.style.top = '0px';

        const { x, y } = this.scaleManager.calcOffset(scale);


        // this event is listened to by each scene 
        // to update each camera's viewport as needed.
        this.events.emit('resize', { x: -x, y: -y, width: this.scaleManager.gameWidth, height: this.scaleManager.gameHeight });
        this.lastResize = { width, height, scale };
    }

    addAnchor(anchor)
    {
        this.scaleManager.addAnchor(anchor);
    }

    removeAnchor(anchor)
    {
        this.scaleManager.removeAnchor(anchor);
    }

    forceRecheck()
    {
        window.dispatchEvent(new Event('resize'));
    }
}